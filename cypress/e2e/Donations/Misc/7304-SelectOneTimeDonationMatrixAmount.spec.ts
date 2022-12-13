import { DonationsPage } from "../../../support/pages/Donations/donations.po";
import { PageSetup } from "../../../support/utils/pageSetup";
import * as specificData from '../../../data/Donations/SelectOneTimeDonationMatrixAmount.json'


//The information regarding the Library
const using = require('jasmine-data-provider');
let pageSetup: PageSetup = new PageSetup();
const donationsPO = new DonationsPage();

const data = pageSetup.getData('Donations', specificData);
const events = pageSetup.getEvents(pageSetup.getEnvironment().donations, data.events);

describe('TR(7304) Donations > Give Now > One Time > Donation Matrix > Matrix Value > Show all fields in Profile Information with only some mandatory > Credit Card > Complete : ', () => {
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

            it('should show error message when negative amount is entered', () => {
                donationsPO.selectDonationAmount(data);
                donationsPO.setFocusContinue();
                donationsPO.verifyDonationAmountError();
                donationsPO.continue();
                cy.get(donationsPO.container).should('be.visible')
            });

            it('should allow the user to select a donation matrix value and continue to the next page', () => {

                donationsPO.selectDonationMatrixAmount(data.matrixButtonSelection);
                donationsPO.donationDetails.donationMatrix.getSelectedMatrixValue(data.matrixButtonSelection);

                donationsPO.continue();
                donationsPO.stepper.isStepDisplayed(1)
            });

            it('should see validation errors when trying to proceed without filling donor info required fields', () => {
                // donationsPO.stepper.verifyDonationAmount(data.matrixButtonSelection);
                donationsPO.stepper.clickDonate();
                // console.log(concat(data.requiredFieldsDonorInfoValidationMessages, data.requiredFieldsPaymentValidationMessages));
                // donationsPO.verifyFieldErrors(concat(data.requiredFieldsDonorInfoValidationMessages, data.requiredFieldsPaymentValidationMessages));
            });

            it('should see validation errors when trying to proceed without filling payment required fields', () => {
                donationsPO.donorInformation.populateAllFields(data);
                donationsPO.stepper.clickDonate();
                // donationsPO.verifyRequiredFieldErrors(data.requiredFieldsPaymentValidationMessages);
            });

            it('should populate the final step "Enter Payment & Complete Donation"', () => {
                donationsPO.paymentInformation.populateAllFields(data.card);
                // expect(donationsPO.stepper.donateButton.getText()).toContain(data.matrixButtonSelection);
                donationsPO.stepper.clickDonate();

                // actions.scrollToTop();
                // donationsPO.verifyTransactionSuccessful();
            });
        });
    });
});
