import { DonationsPage } from "../../../support/pages/Donations/donations.po";
import { PageSetup } from "../../../support/utils/pageSetup";
import { concat } from "lodash";
import using from "jasmine-data-provider";
import * as specificData from '../../../data/Donations/InHonourMonthlyDonation.json'



//The information regarding the Library
let pageSetup: PageSetup = new PageSetup();
const donationsPO = new DonationsPage();

const data = pageSetup.getData('Donations', specificData);
const events = pageSetup.getEvents(pageSetup.getEnvironment().donations, data.events);

describe('TR(7152) Donations > In Honour > Monthly > Modified Donation Matrix > Suggested Value Equal to Matrix Amount : ', () => {
    using(events, event => {
        describe(`${event}`, () => {
            before(() => {
                pageSetup.goToEvent(`${event}/${data.URL}`);
            });

            after(() => {
                pageSetup.goToEvent(`${event}`);
                pageSetup.cleanupPage();
            });

            it('should allow the user to select the donation type "In Honour"', () => {
                donationsPO.selectDonationType(data.typeTabSelection);
                donationsPO.verifySelectedDonationType(data.typeTabSelection);
            });

            it('should verify the default frequency "Monthly" for the donation type "In Honour" is selected', () => {
                donationsPO.verifySelectedDonationFrequency(data.defaultFrequencyAfterTypeTabSelection);
            });

            it('should display donation matrix for monthly frequency with correct suggested value selected', () => {
                donationsPO.getDonationMatrixAmounts(data.matrixValues.monthlyInHonour)
                donationsPO.verifySelectedDonationMatrixAmount(data.monthlyInHonourSuggestedValue);
            });

            it('should allow the user to select a donation matrix value and continue to the next page', () => {
                cy.get(donationsPO.container).should('be.visible')
                donationsPO.selectDonationMatrixAmount(data.matrixButtonSelection);
                donationsPO.continue();
            });

            it('should see validation errors when trying to proceed without filling tributee info required fields', () => {
                donationsPO.isStepDisplayed(1)
                donationsPO.tributeInformation.selectCardType(data.tributeInfo.cardType);
                donationsPO.continue();
            });

            it('should populate the second step "Tribute Details" and go to next step', () => {
                donationsPO.verifyRequiredFieldErrors(data.requiredFieldsTributeInfoValidationMessages);
                donationsPO.tributeInformation.populateMinimumFields(data.tributeInfo);
                donationsPO.continue();
            });

            it('should see validation errors when trying to proceed without filling donor info required fields', () => {
                donationsPO.isStepDisplayed(2)
                donationsPO.stepper.verifyDonationAmount(data.matrixButtonSelection, data.donateButtonFrequencyLabel);
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
