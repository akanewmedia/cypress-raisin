import { PageSetup } from "../../../support/utils/pageSetup";
import { DonationsPage } from "../../../support/pages/Donations/donations.po";
import { concat } from "lodash";
import * as specificData from '../../../data/Donations/OtherAmountDonationMinFieldsProfileInfo.json'

//The information regarding the Library
const using = require('jasmine-data-provider');
const pageSetup: PageSetup = new PageSetup();
const donationsPO = new DonationsPage();

const data = pageSetup.getData('Donations', specificData);
const events = pageSetup.getEvents(pageSetup.getEnvironment().donations, data.events);

describe('TR(7295) Donations > Give Now > One Time > Custom Amount > Minimun fields in Profile Information > Credit Card > Complete : ', () => {
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
                //donationsPO.clickOtherAmount();
                donationsPO.continue();
                donationsPO.verifyDonationAmountError();
                cy.get(donationsPO.donationDetails.donationMatrix.container).should('be.visible')
            });

            it('should populate the first step "Choose Your Donation" with a custom amount and go to next step', () => {
                donationsPO.donationDetails.enterOtherAmount(data);
                cy.wait(500);
                donationsPO.continue();

                donationsPO.stepper.verifyDonationAmount(data.donationAmount);
                //te expect(donationsPO.isStepDisplayed(1)).toBeTruthy();
            });

            it('should see validation errors when trying to proceed without filling donor info required fields', () => {
                donationsPO.stepper.clickDonate();
                donationsPO.verifyRequiredFieldErrors(concat(data.requiredFieldsDonorInfoValidationMessages, data.requiredFieldsPaymentValidationMessages));
            });

            it('should see validation errors when trying to proceed without filling payment required fields', () => {
                donationsPO.donorInformation.populateMinimumFields(data);
                cy.wait(500);
                donationsPO.stepper.clickDonate();
                donationsPO.verifyRequiredFieldErrors(data.requiredFieldsPaymentValidationMessages);
            });

            it('should populate the final step "Enter Payment & Complete Donation"', () => {
                donationsPO.paymentInformation.populateAllFields(data.card);
                cy.wait(500);
                donationsPO.stepper.clickDonate();
                donationsPO.verifyTransactionSuccessful();
            });
        });
    });
});
