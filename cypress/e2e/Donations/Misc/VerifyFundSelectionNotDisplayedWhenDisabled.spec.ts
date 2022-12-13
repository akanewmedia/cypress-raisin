import { PageSetup } from "../../../support/utils/pageSetup";
import { DonationsPage } from "../../../support/pages/Donations/donations.po";
import { FundListComponent } from "../../../support/components/fundList.co";
import using from "jasmine-data-provider";
import * as specificData from '../../../data/Donations/VerifyFundSelectionNotDisplayedWhenDisabled.json'


//The information regarding the Library
let pageSetup: PageSetup = new PageSetup();
const donationsPO = new DonationsPage();
const fundListCO = new FundListComponent();

const data = pageSetup.getData('Donations', specificData);
const events = pageSetup.getEvents(pageSetup.getEnvironment().donations, data.events);

describe('Verify Fund Selection not displayed when disabled : ', () => {
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

            it('should not show fund selection', () => {
                cy.get(fundListCO.fundInput).should('not.exist')
            });
        });
    });
});
