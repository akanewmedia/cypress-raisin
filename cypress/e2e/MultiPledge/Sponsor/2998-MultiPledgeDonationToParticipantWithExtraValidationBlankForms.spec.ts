import { PageSetup } from "../../../support/utils/pageSetup";
import { PledgeNavBarComponent } from "../../../support/components/pledgeNavbar.co";
import { Donation } from "../../../support/components/donation.co";
import { FlowPage } from "../../../support/pages/flow";
import { DonationSearchPage } from "../../../support/pages/Pledge/donationSearch";
import { PaymentPage } from "../../../support/pages/Pledge/payment";
import { RegisterPage } from "../../../support/pages/Pledge/register";
import { ThankYouPage } from "../../../support/pages/Pledge/ThankYouPage";
import { ReviewPage } from "../../../support/pages/Ticketing/ReviewPage";
import { SurveyComponent } from "../../../support/components/survey.co";
import { data } from '../../../data/Pledge/base'
import { data2 } from '../../../data/Pledge/MultiPledgeDonationToParticipantWithExtraValidationBlankForms'

//The information regarding the Library
let pageSetup: PageSetup = new PageSetup();

const event = '/8B55D2ADA6BF433B966CB10B49079587'

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
        describe(`${event}`, () => {
            before(() => {
                pageSetup = new PageSetup();
                pageSetup.goToEvent(event);
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
                donationCO.selectSponsorshipLevel(data2.sponsorshipLevel);

                donationCO.selectHonorRollOptionByIndex(data2.honourRoleOptionIndex); // select Other (Custom)
                donationCO.enterCustomHonorRollText(data.customHonourRollText);
                donationCO.enterPrivateMessage(data.privateMessage);
                flowPO.continue();
            });
            it('should enter the participant details', () => {                
                // trigger validation
                flowPO.continue();
                cy.wait(2500)
                cy.get(registerPO.container).should('exist');
                registerPO.fillInProfileAddressAndAdditionalInformation(data2);
                surveyCO.fill(data.surveyResponses);
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
                reviewPO.verifyProfileInformation(data2);
                reviewPO.verifyPaymentInformation(data.card);
            });
            it('Should verify the donation amount', () => {
                reviewPO.verifyTotalAmount(data2.totalAmount);
            });
            it('should verify the Transaction code', () => {
                flowPO.continue();
                thankYouPO.verifyTransactionNumber(data);
            });
        });
    });
