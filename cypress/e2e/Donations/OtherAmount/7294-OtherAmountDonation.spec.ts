import { PageSetup } from "../../../support/utils/pageSetup";
import { DonationsPage } from "../../../support/pages/Donations/donations.po";
import { concat } from "lodash";
import * as specificData from '../../../data/Donations/OtherAmountDonation.json'

//The information regarding the Library
const using = require('jasmine-data-provider');
const pageSetup: PageSetup = new PageSetup();
const donationsPO = new DonationsPage();

const data = pageSetup.getData('Donations', specificData);
const events = pageSetup.getEvents(pageSetup.getEnvironment().donations, data.events);

describe('TR(7294) Donations > Give Now > One Time > Custom Amount > Show all fields in Profile Information with only some mandatory > Credit Card > Complete : ', () => {
    using(events, event => {
        describe(`${event}`, () => {
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
            })

            it('should show error message when negative amount is entered', () => {
                donationsPO.donationDetails.donationMatrix.setOtherAmountManually('-1')
                donationsPO.continue();
            });

            it('should not allow the user to go to next step if validation errors are present', () => {
                cy.get(donationsPO.container).should('be.visible')
                //donationsPO.selectDonationAmount(data)
                donationsPO.donationDetails.clearCustomAmount()
                donationsPO.continue();
                cy.get(donationsPO.donationDetails.donationMatrix.container).should('be.visible')
            });

            it('should populate the first step "Choose Your Donation" with a custom amount and go to next step', () => {
                donationsPO.donationDetails.enterOtherAmount(data);
                donationsPO.continue();
                donationsPO.isStepDisplayed(1)
            });

            it('should see validation errors when trying to proceed without filling donor info required fields', () => {
                donationsPO.stepper.verifyDonationAmount(data.donationAmount);
                donationsPO.stepper.clickDonate();
                donationsPO.verifyRequiredFieldErrors(concat(data.requiredFieldsDonorInfoValidationMessages, data.requiredFieldsPaymentValidationMessages));
            });

            it('should see validation errors when trying to proceed without filling payment required fields', () => {
                donationsPO.donorInformation.populateAllFields(data);
                donationsPO.stepper.clickDonate();
                // donationsPO.verifyRequiredFieldErrors(data.requiredFieldsPaymentValidationMessages);
            });

            it('should populate the final step "Enter Payment & Complete Donation"', () => {
                donationsPO.paymentInformation.populateAllFields(data.card);
                donationsPO.stepper.clickDonate();
                donationsPO.verifyTransactionSuccessful();
            });
        });
    });
});
