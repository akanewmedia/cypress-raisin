import { PageSetup } from "../../../support/utils/pageSetup";
import { DonationsPage } from "../../../support/pages/Donations/donations.po";
import { FundListComponent } from "../../../support/components/fundList.co";
import using from "jasmine-data-provider";
import * as specificData from '../../../data/Donations/VerifyFundSelection.json'


//The information regarding the Library
let pageSetup: PageSetup = new PageSetup();
const donationsPO = new DonationsPage();
const fundListCO = new FundListComponent();

const data = pageSetup.getData('Donations', specificData);
const events = pageSetup.getEvents(pageSetup.getEnvironment().donations, data.events);

describe('Verify Fund Selection : ', () => {
    using(events, (event) => {
        describe(`${event}`, function () {
            before(() => {
                pageSetup.goToEvent(`${event}/${data.URL}`);
                pageSetup.waitForPageLoad()
            });

            after(() => {
                pageSetup.goToEvent(event);
                pageSetup.cleanupPage();
            });

            it("donations start page should be loaded", () => {
                donationsPO.waitForDonationsContainerToBeLoaded()
            });

            it('should show default value automatically selected', () => {
                donationsPO.selectDonationMatrixAmount(data.matrixButtonSelection);
                fundListCO.getFundValue(data.funds.default);
            });

            it('should show a divider between shortlist and other funds', () => {
                fundListCO.openFund();
                cy.get(fundListCO.divider).should('exist')
                fundListCO.closeFund();
            });

            it('Should show an error and not allow the user to proceed if no fund is selected', () => {
                fundListCO.clearSelection();
                donationsPO.continue()
                cy.get(fundListCO.error).should('contain.text', data.fundErrors.requiredFund)                
            });

            it('Should show an error and not allow the user to proceed if non existant fund is selected', () => {
                fundListCO.search(data.funds.nonExistant);
                fundListCO.closeFund();
                cy.get(fundListCO.error).should('contain.text', data.fundErrors.invalidFund)
            });

            it('Should show an error and not allow the user to proceed if otherfund is selected and fund name is not added', () => {
                fundListCO.search(data.funds.otherFunds);
                fundListCO.closeFund();
                donationsPO.continue();
                cy.get(fundListCO.otherFundNameError).should('have.text', data.fundErrors.requiredFundName)
            });

            it('should allow the user to continue to the next page if a otherfund is selected and fundname added', () => {
                fundListCO.selectFund(data.funds.otherFunds);
                fundListCO.enterOtherFundName('Other fund name');
                donationsPO.continue();
                donationsPO.stepper.isStepDisplayed(1)
            });
        });
    });
});
