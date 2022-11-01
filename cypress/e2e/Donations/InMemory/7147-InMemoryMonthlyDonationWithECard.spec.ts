import { PageSetup } from "../../../support/utils/pageSetup";
import { setFocus } from "../../../support/utils/actions";
import { DonationsPage } from "../../../support/pages/Donations/donations.po";
import * as specificData from '../../../data/Donations/InMemoryMonthlyDonationWithECard.json'


//The information regarding the Library
const using = require('jasmine-data-provider');
const pageSetup: PageSetup = new PageSetup();
const donationsPO = new DonationsPage();
const data = pageSetup.getData('Donations', specificData);
const events = pageSetup.getEvents(pageSetup.getEnvironment().donations, data.events);

describe('TR(7147) Donations > In Memory > Monthly > eCard > Card Preview > Change Selection > Card Preview : ', () => {
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

            it('should check if the default donation frequency "Monthly" is selected', () => {
                donationsPO.verifySelectedDonationFrequency(data.frequencyButtonSelection);
            });

            it('should check if the default donation amount is selected and continue to the next page', () => {
                cy.get(donationsPO.container).should('be.visible')
                donationsPO.verifySelectedDonationMatrixAmount(data.monthlyInMemorySuggestedValue);
                donationsPO.continue();
                donationsPO.isStepDisplayed(1)
            });

            it('should populate the second step "Tribute Details"', () => {
                donationsPO.tributeInformation.selectCardType(data.tributeInfo.cardType);
                donationsPO.tributeInformation.populateECardMinimumFields(data.tributeInfo);
            });

            it('should choose the first template and check the card preview', () => {
                donationsPO.tributeInformation.selectCardTemplate(data.tributeInfo.templateImageText1);
                donationsPO.tributeInformation.checkCardPreviewContent(data.tributeInfo.defaultTemplateMessage1);
                cy.wait(1000)
                donationsPO.isStepDisplayed(1)
            });

            it('should choose the second template and check the card preview', () => {
                donationsPO.tributeInformation.selectCardTemplate(data.tributeInfo.templateImageText2);
                donationsPO.tributeInformation.checkCardPreviewContent(data.tributeInfo.defaultTemplateMessage2);
                donationsPO.isStepDisplayed(1)
                // Fixes the position of the page in order to allow the "Continue" button to be clickable
                // after the material dialog containing the card preview has been dismissed
                setFocus(donationsPO.tributeInformation.continueButton);
            });

            it('should go to next step (Profile & Payment)', () => {
                donationsPO.continue();
                donationsPO.isStepDisplayed(2)
            });

            it('should fill profile and payment required fields and complete the transaction', () => {
                donationsPO.donorInformation.populateAllFields(data);
                donationsPO.paymentInformation.populateAllFields(data.card);
                donationsPO.stepper.clickDonate();
                donationsPO.verifyTransactionSuccessful();
            });
        });
    });
});
