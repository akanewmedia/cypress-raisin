import { PageSetup } from "../../../support/utils/pageSetup";
import { PledgeNavBarComponent } from "../../../support/components/pledgeNavBar.co";
import { Donation } from "../../../support/components/donation.co";
import { FlowPage } from "../../../support/pages/flow";
import { DonationSearchPage } from "../../../support/pages/Pledge/donationSearch";
import { PaymentPage } from "../../../support/pages/Pledge/payment";
import { RegisterPage } from "../../../support/pages/Pledge/register";
import { ThankYouPage } from "../../../support/pages/Pledge/ThankYouPage";
import { ReviewPage } from "../../../support/pages/Ticketing/ReviewPage";
import { SurveyComponent } from "../../../support/components/survey.co";
import * as specificData  from '../../../data/Pledge/MultiPledgeDonationToParticipantWithExtraValidationBlankForms.json'

//The information regarding the Library
const using = require('jasmine-data-provider');
let pageSetup: PageSetup = new PageSetup();
const data = pageSetup.getData('Pledge', specificData);
const events = pageSetup.getEvents(pageSetup.getEnvironment().multipledge, data.events);

const donationSearchPO = new DonationSearchPage();
const registerPO = new RegisterPage();
const paymentPO = new PaymentPage();
const reviewPO = new ReviewPage();
const thankYouPO = new ThankYouPage();
const flowPO = new FlowPage();

const donationCO = new Donation();
const navbarCO = new PledgeNavBarComponent();
const surveyCO = new SurveyComponent();

// use event 17560
describe('TR(2998) Scenario -> Multi Pledge donation to participant - submit blank forms : ', () => {
    using(events, event => { 
        describe(`${event}`, () => {
            before(() => {
                pageSetup.goToEvent(event);
                pageSetup.waitForPageLoad()
            });
            after(() => {
                pageSetup.goToEvent(event);
                pageSetup.cleanupPage();
            });
            it('should search for a participant to donate to', () => {
                navbarCO.donate();
                cy.get(donationSearchPO.container).should('be.visible');
                donationSearchPO.clickIndividualTab();
                donationSearchPO.searchAndSelectFirstOption(data.donationName);
            });
            it('Should fill out the donation details', () => {
                cy.get(donationCO.honourRollContainer).should('be.visible');
                cy.get(donationCO.donationContainer).should('be.visible');
                donationCO.selectSponsorshipLevel(data.sponsorshipLevel);

                donationCO.selectHonorRollOptionByIndex(data.honourRoleOptionIndex); // select Other (Custom)
                donationCO.enterCustomHonorRollText(data.customHonourRollText);
                donationCO.enterPrivateMessage(data.privateMessage);
                flowPO.continue();
            });
            it('should enter the participant details', () => {                
                // trigger validation
                flowPO.continue();
                cy.wait(2500)
                cy.get(registerPO.container).should('exist');
                registerPO.fillInProfileAddressAndAdditionalInformation(data);
                surveyCO.fill(data.surveyResponses);
                cy.wait(1000)
                cy.get('body').trigger('keydown', { keyCode: 27});
                cy.wait(500);
                cy.get('body').trigger('keyup', { keyCode: 27});  
                flowPO.continue();
            });
            it('should verify and enter the credit card information', () => {     
                cy.wait(2000)           
                // trigger validation
                flowPO.continue();
                paymentPO.verifyPaymentFieldsPresent();
                paymentPO.verifyCreditCardIsDisplayed();
                paymentPO.enterCardDetails(data.card);
            });
            it('Should verify the profile and payment info on the review page', () => {
                flowPO.continue();
                reviewPO.verifyProfileInformation(data);
                reviewPO.verifyPaymentInformation(data.card);
            });
            it('Should verify the donation amount', () => {
                reviewPO.verifyDonationAmount(data.totalAmount);
            });
            it('should verify the Transaction code', () => {
                flowPO.continue();
                 
            });
        });
    });
});
