import { PageSetup } from "../../../support/utils/pageSetup";
import { DonationsPage } from "../../../support/pages/Donations/donations.po";
import * as specificData from '../../../data/Donations/OtherAmountDonationAllFieldsProfileInfo.json'
import { concat } from "lodash";

//The information regarding the Library
const using = require('jasmine-data-provider');
const pageSetup: PageSetup = new PageSetup();
const donationsPO = new DonationsPage();

const data = pageSetup.getData('Donations', specificData);
const events = pageSetup.getEvents(pageSetup.getEnvironment().donations, data.events);

describe('TR(7296) Donations > Give Now > One Time > Custom Amount > All fields mandatory in Profile Information > Credit Card > Complete : ', () => {
    using(events, event => {
        describe(`${event}`, () => {
            before(() => {
                pageSetup.goToEvent(`${event}/${data.URL}`);
                pageSetup.waitForPageLoad()               

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
                donationsPO.donationDetails.clearCustomAmount()
                donationsPO.continue();
                donationsPO.verifyDonationAmountError();
                // expect(donationsPO.donationDetails.donationMatrix.container.isDisplayed()).toBeTruthy();
            });

            it('should populate the first step "Choose Your Donation" with a custom amount and go to next step', () => {
                donationsPO.donationDetails.enterOtherAmount(data);

                donationsPO.continue();
                // expect(donationsPO.isStepDisplayed(1)).toBeTruthy();
            });

            it('should see validation errors when trying to proceed without filling donor info required fields', () => {
                donationsPO.stepper.verifyDonationAmount(data.donationAmount);
                donationsPO.stepper.clickDonate();
                cy.wait(1000)
                donationsPO.verifyRequiredFieldErrors(concat(data.requiredFieldsDonorInfoValidationMessages, data.requiredFieldsPaymentValidationMessages));
            });

            it('should see validation errors when trying to proceed without filling payment required fields', () => {
                donationsPO.donorInformation.populateAllFields(data);
                donationsPO.stepper.clickDonate();
                // donationsPO.verifyRequiredFieldErrors(data.requiredFieldsPaymentValidationMessages);
            });

            it('should populate the CC details', () => {
                donationsPO.paymentInformation.populateAllFields(data.card);
            });

            it('should be on the success page', () => {
                donationsPO.stepper.clickDonate();
                donationsPO.verifyTransactionSuccessful();
            });
        });
    });
});
