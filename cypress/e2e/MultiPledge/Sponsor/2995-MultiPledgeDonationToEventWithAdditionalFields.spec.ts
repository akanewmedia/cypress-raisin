import { PageSetup } from "../../../support/utils/pageSetup";
import { PledgeRxfNavBarComponent } from "../../../support/components/pledgeRxfNavbar.co";
import { Donation } from "../../../support/components/donation.co";
import { FlowPage } from "../../../support/pages/flow";
import { DonationSearchPage } from "../../../support/pages/Pledge/donationSearch";
import { PaymentPage } from "../../../support/pages/Pledge/payment";
import { RegisterPage } from "../../../support/pages/Pledge/register";
import { ThankYouPage } from "../../../support/pages/Pledge/ThankYouPage";
import { ReviewPage } from "../../../support/pages/Ticketing/ReviewPage";
import {data} from '../../../data/Pledge/base'
import {data2} from '../../../data/Pledge/MultiPledgeDonationToEventWithAdditionalFields'
import { SurveyComponent } from "../../../support/components/survey.co";


//The information regarding the Library
let pageSetup: PageSetup = new PageSetup();
const event = '/8b55d2ada6bf433b966cb10b49079587'

const donationSearchPO = new DonationSearchPage();
const registerPO = new RegisterPage();
const paymentPO = new PaymentPage();
const reviewPO = new ReviewPage();
const thankYouPO = new ThankYouPage();
const flowPO = new FlowPage();
const surveyCO = new SurveyComponent();

const donationCO = new Donation();
const navbarCO = new PledgeRxfNavBarComponent();

describe('TR(2995) Scenario -> Multi Pledge donation to event and fill out optional fields : ', () => {    
        describe(`${event}`, () => {
            before(() => {
                pageSetup = new PageSetup();
                pageSetup.goToEvent(event);                
            });
            after(() => {
                pageSetup.goToEvent(event);                
                pageSetup.cleanupPage()
            });
            it('Should start a donation to the event', () => {
                navbarCO.donate();

                cy.get(donationSearchPO.container).should('be.visible')                
                donationSearchPO.clickEventTab();
                cy.get(donationCO.donationAmountText).should('be.visible')                
                donationCO.setEventDonationAmount(data.donationAmount);
                cy.get(donationCO.eventDonationContinueBtn).should('be.visible')                
                donationCO.pressEventDonationContinueBtn();
            });
            it('Should fill out the profile, address and additional fields', () => {                
                registerPO.fillInProfileAddressAndAdditionalInformation(data);
                cy.get(registerPO.container).should('be.visible')  
                surveyCO.fill(data.surveyResponses);
                cy.get('body').trigger('keydown', { keyCode: 27});
                cy.wait(500);
                cy.get('body').trigger('keyup', { keyCode: 27});                  
            });
            it('should verify and enter the credit card information', () => {
                flowPO.continue();
                paymentPO.verifyPaymentFieldsPresent();
                paymentPO.verifyCreditCardIsDisplayed();
                paymentPO.enterCardDetails(data.card);
            });
            it('Should verify the profile and payment info on the review page', () => {
                flowPO.continue();
                reviewPO.verifyAllProfileInformation(data2);
                reviewPO.verifyPaymentInformation(data.card);
            });
            it('should verify the Transaction code', () => {
                flowPO.continue();
                thankYouPO.verifyTransactionNumber(data);
            });
        });
    });