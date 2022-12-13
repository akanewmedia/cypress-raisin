import { DonationsPage } from "../../../support/pages/Donations/donations.po";
import { PageSetup } from "../../../support/utils/pageSetup";
import * as specificData from '../../../data/Donations/MatrixAmountMonthlyDonation.json'
import { concat } from "lodash";


//The information regarding the Library
const using = require('jasmine-data-provider');
let pageSetup: PageSetup = new PageSetup();
const donationsPO = new DonationsPage();

const data = pageSetup.getData('Donations', specificData);
const events = pageSetup.getEvents(pageSetup.getEnvironment().donations, data.events);

describe('TR(7149) Donations > Give Now > Monthly > Donation Matrix > Matrix Values > Default Matrix Value > Suggested Amount : ', () => {
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

            it("module should be loaded and should display donation matrix", () => {
                donationsPO.waitForDonationsContainerToBeLoaded();
            });

            it('should allow the user to select the donation frequency', () => {
                donationsPO.selectDonationFrequency(data.frequencyButtonSelection);
                donationsPO.verifySelectedDonationFrequency(data.frequencyButtonSelection);
            });

            it('should display donation matrix for montly frequency with correct suggested value selected', () => {
                donationsPO.getDonationMatrixAmounts(data.matrixValues.monthlyGeneralDonation);
                donationsPO.verifySelectedDonationMatrixAmount(data.monthlyGeneralDonationSuggestedValue);
            });

            it('should allow the user to select a donation matrix value and continue to the next page', () => {
                cy.get(donationsPO.container).should('be.visible')
                donationsPO.selectDonationMatrixAmount(data.matrixButtonSelection);
                donationsPO.continue()
                donationsPO.stepper.verifyDonationAmount(data.matrixButtonSelection, data.donateButtonFrequencyLabel);

            });

            it('should see validation errors when trying to proceed without filling donor info required fields', () => {
                donationsPO.stepper.clickDonate()

                donationsPO.verifyRequiredFieldErrors(concat(data.requiredFieldsDonorInfoValidationMessages, data.requiredFieldsPaymentValidationMessages));
            });

            it('should populate the second step "Enter Donor Information" and go to next step', () => {
                donationsPO.isStepDisplayed(2)
                donationsPO.donorInformation.populateAllFields(data);
                donationsPO.stepper.clickDonate();
            });

            it('should populate the final step "Enter Payment & Complete Donation"', () => {
                donationsPO.verifyRequiredFieldErrors(data.requiredFieldsPaymentValidationMessages);
                donationsPO.paymentInformation.populateAllFields(data.card);
                donationsPO.stepper.clickDonate();
                donationsPO.verifyTransactionSuccessful();
            });
        });
    });
});
