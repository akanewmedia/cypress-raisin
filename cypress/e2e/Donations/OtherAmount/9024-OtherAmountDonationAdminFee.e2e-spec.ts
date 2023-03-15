import { PageSetup } from "../../../support/utils/pageSetup";
import { DonationsPage } from "../../../support/pages/Donations/donations.po";
import * as specificData from '../../../data/Donations/OtherAmountDonationAdminFee.json'

//The information regarding the Library
const using = require('jasmine-data-provider');
const pageSetup: PageSetup = new PageSetup();
const donationsPO = new DonationsPage();

const data = pageSetup.getData('Donations', specificData);
const events = pageSetup.getEvents(pageSetup.getEnvironment().donations, data.events);

describe('TR(9024) Donations > Give Now > One Time > Custom Amount > Admin Fee > All fields mandatory in Profile Information > Credit Card > Complete : ', () => {
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
            });

            it('should populate the first step "Choose Your Donation" with a custom amount with admin fee and go to next step', () => {
                cy.wait(1000)
                donationsPO.donationDetails.enterOtherAmount(data);
                donationsPO.donationDetails.clickCoverAdminFee();
                donationsPO.continue();
            });

            it('should see validation errors when trying to proceed without filling donor info required fields', () => {
                donationsPO.isStepDisplayed(1)
                donationsPO.stepper.verifyDonationAmount(data.totalAmountWithAdminFeeAtTheLimit);
                donationsPO.stepper.clickDonate();
            });

            it('should update the donation amount value and verify that the text in the donate button is updated', () => {
                //console.log('matrixButtonSelection', data.matrixButtonSelection);
                donationsPO.selectDonationMatrixAmount(data.matrixButtonSelection);
                donationsPO.stepper.verifyDonationAmount(data.totalAmountWithAdminFee);
            });

            it('should see validation errors when trying to proceed without filling payment required fields', () => {
                // console.log('donorInformation.populateAllFields', data);
                donationsPO.donorInformation.populateAllFields(data);
                donationsPO.stepper.clickDonate();
                // donationsPO.verifyRequiredFieldErrors(data.requiredFieldsPaymentValidationMessages);
            });

            it('should populate the final step "Enter Payment & Complete Donation"', () => {
                donationsPO.paymentInformation.populateAllFields(data.card);
                donationsPO.stepper.clickDonate();
                // donationsPO.verifyTransactionSuccessful();
            });
        });
    });
});
