import { PageSetup } from "../../../support/utils/pageSetup";
import { DonationsPage } from "../../../support/pages/Donations/donations.po";
import * as specificData from '../../../data/Donations/InHonourMonthlyDonationWithPrintedCard.json'
import { concat } from "lodash";

//The information regarding the Library
const using = require('jasmine-data-provider');
let pageSetup: PageSetup = new PageSetup();
const donationsPO = new DonationsPage();

const data = pageSetup.getData('Donations', specificData);
const events = pageSetup.getEvents(pageSetup.getEnvironment().donations, data.events);

describe('TR(7143) Donations > In Honour > Monthly > eCard > Review > Edit Card > Printed Card > Complete : ', () => {
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

            it('should check if the default donation frequency "Monthly" is selected', () => {
                donationsPO.verifySelectedDonationFrequency(data.frequencyButtonSelection);
            });

            it('should check if the default donation amount is selected and continue to the next page', () => {
                cy.get(donationsPO.container).should('be.visible')
                donationsPO.verifySelectedDonationMatrixAmount(data.monthlyInHonourSuggestedValue);
                donationsPO.continue();
                donationsPO.isStepDisplayed(1)
            });

            it('should should select eCard, populate the second step "Tribute Details" and go to next step', () => {
                donationsPO.tributeInformation.selectCardType(data.eCardTributeInfo.cardType);
                donationsPO.tributeInformation.populateAllECardFields(data.eCardTributeInfo);
                donationsPO.continue();
                donationsPO.isStepDisplayed(2)
            });

            it('should see validation errors when trying to proceed without filling donor info required fields', () => {
                donationsPO.stepper.verifyDonationAmount(data.donationAmount, data.donateButtonFrequencyLabel);
                donationsPO.stepper.clickDonate();
                donationsPO.verifyRequiredFieldErrors(concat(data.requiredFieldsDonorInfoValidationMessages, data.requiredFieldsPaymentValidationMessages));
            });

            it('should fill profile and payment required fields and go back to change the card type', () => {
                donationsPO.donorInformation.populateAllFields(data);
                donationsPO.paymentInformation.populateAllFields(data.card);
            });

            it('should select Printed Card, populate the "Tribute Details" with Printed Card information and complete the transaction', () => {
                donationsPO.tributeInformation.selectCardType(data.tributeInfo.cardType);
                donationsPO.tributeInformation.populatePrintedCardMinimumFields(data.tributeInfo);
                donationsPO.stepper.clickDonate();
                donationsPO.verifyTransactionSuccessful();
            });
        });
    });
});
