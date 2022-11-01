import { PageSetup } from "../../../support//utils/pageSetup";
import { DonationsPage } from "../../../support//pages/Donations/donations.po";
import { FundListComponent } from "../../../support//components/fundList.co";
import * as specificData from '../../../data/Donations/InMemoryOneTimeDonation.json'

//The information regarding the Library
const using = require('jasmine-data-provider');
const pageSetup: PageSetup = new PageSetup();
const donationsPO = new DonationsPage();
const fundListCO = new FundListComponent();

const data = pageSetup.getData('Donations', specificData);
const events = pageSetup.getEvents(pageSetup.getEnvironment().donations, data.events);

describe('TR(7117) Donations > In Memory > One Time > Preset Amount > Admin Fee > Fund Select > Honouree > eCard > Select Card > Message > With Receipt > No Survey : ', () => {
    using(events, event => {
        describe(`${event}`, () => {
            before(() => {
                pageSetup.goToEvent(`${event}/${data.URL}`);
                pageSetup.cleanupPage();
            });

            after(() => {
                pageSetup.goToEvent(event);
                pageSetup.cleanupPage();
            });

            it('should allow the user to select the donation type "In Memory"', () => {
                donationsPO.selectDonationType(data.typeTabSelection);
                donationsPO.verifySelectedDonationType(data.typeTabSelection);
            });

            it('should allow the user to select the donation frequency "One-Time"', () => {
                donationsPO.selectDonationFrequency(data.frequencyButtonSelection);
                donationsPO.verifySelectedDonationFrequency(data.frequencyButtonSelection);
            });

            it('should display donation matrix for one-time frequency and the default fund', () => {
                donationsPO.getDonationMatrixAmounts(data.matrixValues.oneTimeInMemory);
                fundListCO.getFundValue(data.funds.default);
            });

            it('should allow the user to select a custom donation value with admin fee and continue to the next page', () => {
                donationsPO.donationDetails.enterOtherAmount(data);
                donationsPO.donationDetails.clickCoverAdminFee();
                fundListCO.selectFund(data.funds.fundSelection);
                donationsPO.continue();
                donationsPO.isStepDisplayed(1)
            });

            it('should populate the second step "Tribute Details" and go to next step', () => {
                donationsPO.tributeInformation.selectCardType('eCard');
                donationsPO.tributeInformation.populateAllECardFields(data.tributeInfo);
                donationsPO.continue();
                donationsPO.isStepDisplayed(2)
            });

            it('should see validation errors when trying to proceed without filling payment required fields', () => {
                donationsPO.donorInformation.populateAllFields(data);
                donationsPO.stepper.clickDonate();
                donationsPO.verifyRequiredFieldErrors(data.requiredFieldsPaymentValidationMessages);
            });

            it('should populate the final step "Enter Payment & Complete Donation"', () => {
                donationsPO.paymentInformation.populateAllFields(data.card);
                donationsPO.stepper.clickDonate();
                donationsPO.verifyTransactionSuccessful();
            });
        });
    });
});
