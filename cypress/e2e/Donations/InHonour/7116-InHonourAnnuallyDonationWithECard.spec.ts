import { PageSetup } from "../../../support/utils/pageSetup";
import { DonationsPage } from "../../../support/pages/Donations/donations.po";
import * as specificData from '../../../data/Donations/InHonourAnnuallyDonationWithECard.json'
import { FundListComponent } from "../../../support/components/fundList.co";

//The information regarding the Library
const using = require('jasmine-data-provider');
let pageSetup: PageSetup = new PageSetup();
const donationsPO = new DonationsPage();
const fundListCO = new FundListComponent();

const data = pageSetup.getData('Donations', specificData);
const events = pageSetup.getEvents(pageSetup.getEnvironment().donations, data.events);

describe('TR(7116) Donations > Give in Honour > Annual > Other Amount > Admin Fee > Fund Select > Honouree > eCard > Select Card > Message > With Receipt: ', () => {
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

            it('should allow the user to select the donation frequency "Annually"', () => {
                donationsPO.selectDonationFrequency(data.frequencyButtonSelection);
                donationsPO.verifySelectedDonationFrequency(data.frequencyButtonSelection);
            });

            it('should allow the user to type a donation amount and continue to the next page', () => {
                cy.get(donationsPO.container).should('be.visible')
                donationsPO.donationDetails.enterOtherAmount(data);
                fundListCO.selectFund(data.fund);
                donationsPO.continue();
                donationsPO.isStepDisplayed(1)
            });

            it('should see validation errors when trying to proceed without filling tribute info required fields', () => {
                donationsPO.tributeInformation.selectCardType(data.tributeInfo.cardType);
                donationsPO.continue();
                // donationsPO.verifyRequiredFieldErrors(data.requiredFieldsTributeInfoValidationMessages);
            });

            it('should populate the second step "Tribute Details" and go to next step', () => {
                donationsPO.tributeInformation.populateAllECardFields(data.tributeInfo);
                donationsPO.continue();
                donationsPO.isStepDisplayed(2)
            });

            it('should see validation errors when trying to proceed without filling donor info required fields', () => {
                donationsPO.stepper.verifyDonationAmount(data.donationAmount, data.donateButtonFrequencyLabel);
                donationsPO.stepper.clickDonate();
                // donationsPO.verifyRequiredFieldErrors(concat(data.requiredFieldsDonorInfoValidationMessages, data.requiredFieldsPaymentValidationMessages));
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
