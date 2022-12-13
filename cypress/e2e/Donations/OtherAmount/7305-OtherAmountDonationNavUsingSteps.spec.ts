import { PageSetup } from "../../../support/utils/pageSetup";
import { DonationsPage } from "../../../support/pages/Donations/donations.po";
import { scrollToElement } from "../../../support/utils/actions";
import * as specificData from '../../../data/Donations/OtherAmountDonation.json'

//The information regarding the Library
const using = require('jasmine-data-provider');
const pageSetup: PageSetup = new PageSetup();
const donationsPO = new DonationsPage();

const data = pageSetup.getData('Donations', specificData);
const events = pageSetup.getEvents(pageSetup.getEnvironment().donations, data.events);

describe('TR(7305) - Should not display step headers for unreached steps : ', () => {
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

            it("module should be loaded", (done) => {
                donationsPO.waitForDonationsContainerToBeLoaded().then(() => done());
            });

            it('should show error message when negative amount is entered', () => {
                donationsPO.donationDetails.donationMatrix.setOtherAmountManually('-1');
                donationsPO.continue();
                donationsPO.verifyDonationAmountError();
            });

            it('should not allow the user to go to next step if custom amount selected but no amount is entered', () => {
                cy.get(donationsPO.container).should('be.visible')
                donationsPO.clearOtherAmount();
                donationsPO.continue();
                donationsPO.verifyDonationAmountError();
                cy.get(donationsPO.donationDetails.donationMatrix.container).should('be.visible')
            });

            it('should populate the first step "Choose Your Donation" with a custom amount and go to next step', () => {
                donationsPO.donationDetails.enterOtherAmount(data);
                scrollToElement(donationsPO.stepper.continueButton);
                donationsPO.continue();
                donationsPO.stepper.isStepDisplayed(1)
                cy.get(donationsPO.donorInformation.profileContainer).should('be.visible')
            });
        });
    });
});
