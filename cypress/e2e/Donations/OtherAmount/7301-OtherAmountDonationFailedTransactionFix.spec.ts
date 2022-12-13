import { PageSetup } from "../../../support/utils/pageSetup";
import { DonationsPage } from "../../../support/pages/Donations/donations.po";
import * as specificData from '../../../data/Donations/OtherAmountDonationFailedTransactionFix.json'

//The information regarding the Library
const using = require('jasmine-data-provider');
const pageSetup: PageSetup = new PageSetup();
const donationsPO = new DonationsPage();

const data = pageSetup.getData('Donations', specificData);
const events = pageSetup.getEvents(pageSetup.getEnvironment().donations, data.events);

describe('TR(7301) Donations > Give Now > One Time > Custom Amount > Show all fields in Profile Information with only some mandatory > Credit Card > Failed Transaction > Fix & Complete : ', () => {
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

                // key TAB twice to go to close the fund dropdown
                donationsPO.tabOutOfCurrentField();
                donationsPO.pressEscKey();
                donationsPO.verifyDonationAmountError();
            });

            it('should not allow the user to go to next step if custom amount selected but no amount is entered', () => {
                cy.get(donationsPO.container).should('be.visible')
                donationsPO.clearOtherAmount();
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
                donationsPO.donorInformation.populateAllFields(data);
                donationsPO.stepper.clickDonate();

                donationsPO.stepper.verifyDonationAmount(data.donationAmount);
            });

            it('should see validation errors when trying to proceed without filling payment required fields', () => {
                donationsPO.donorInformation.populateAllFields(data);
                donationsPO.stepper.clickDonate();
                donationsPO.verifyRequiredFieldErrors(data.requiredFieldsPaymentValidationMessages);
            });

            it('should populate the final step "Enter Payment & Complete Donation" with wrong card info', () => {
                donationsPO.paymentInformation.populateAllFields(data.failedCard);
                donationsPO.stepper.clickDonate();

                donationsPO.verifyTransactionFailed(data.transactionFailedMessage);
            });

            it('should populate the final step "Enter Payment & Complete Donation" with correct payment info', () => {
                donationsPO.paymentInformation.populateAllFields(data.card);
                donationsPO.stepper.clickDonate();
                donationsPO.verifyTransactionSuccessful();
            });
        });
    });
});
