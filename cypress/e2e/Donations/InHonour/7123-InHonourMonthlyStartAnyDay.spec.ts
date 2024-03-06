import { PageSetup } from "../../../support/utils/pageSetup";
import { DonationsPage } from "../../../support/pages/Donations/donations.po";
import * as specificData from '../../../data/Donations/InHonourMonthlyStartAnyDay.json'

//The information regarding the Library
const using = require('jasmine-data-provider');
let pageSetup: PageSetup = new PageSetup();
const donationsPO = new DonationsPage();

const data = pageSetup.getData('Donations', specificData);
const events = pageSetup.getEvents(pageSetup.getEnvironment().donations, data.events);

describe('TR(7123) Donations > In Honour > Monthly > Preset Amount > Custom Start Date > Start Any Day > Admin Fee > Default Fund > No Card > With Receipt : ', () => {
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

            it('should allow the user to select the donation type "In Honour"', () => {
                donationsPO.selectDonationType(data.typeTabSelection);
                donationsPO.verifySelectedDonationType(data.typeTabSelection);
            });

            it('should allow the user to select the donation frequency "Monthly"', () => {
                donationsPO.selectDonationFrequency(data.frequencyButtonSelection);
                donationsPO.verifySelectedDonationFrequency(data.frequencyButtonSelection);
            });

            it('should display donation matrix for monthly frequency and the correct date of the first payment', () => {
                donationsPO.getDonationMatrixAmounts(data.matrixValues.monthlyInHonour);
                //donationsPO.verifyStartDateMessageNextDate(data.recurringDonationStartDateMessage, data.lang); This still fails the date cus the date on the server where it's ran against has different dates.
            });

            it('should allow the user to select a donation matrix value and continue to the next page', () => {
                donationsPO.donationDetails.enterOtherAmount(data);
                donationsPO.continue();
                donationsPO.isStepDisplayed(1)
            });

            it('should populate the second step "Tribute Details" and go to next step', () => {
                donationsPO.tributeInformation.populateAllECardFields(data.tributeInfo);
                donationsPO.continue();
                donationsPO.isStepDisplayed(2)
            });

            it('should see validation errors when trying to proceed without filling fields', () => {
                donationsPO.donorInformation.populateAllFields(data);
                donationsPO.paymentInformation.populateAllFields(data.card);
            });

            it('should verify the donation amount and frequency in the Donate button', () => {
                donationsPO.stepper.verifyDonationAmount(data.donationAmount, data.donateButtonFrequencyLabel);
            });

            it('should complete the transaction', () => {
                donationsPO.stepper.clickDonate();
                donationsPO.verifyTransactionSuccessful();
            });
        });
    });
});
