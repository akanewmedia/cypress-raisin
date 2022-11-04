import { PageSetup } from "../../../support/utils/pageSetup";
import { Donation } from "../../../support/components/donation.co";
import { FlowPage } from "../../../support/pages/flow";
import { DonationSearchPage } from "../../../support/pages/Pledge/donationSearch";
import { PaymentPage } from "../../../support/pages/Pledge/payment";
import { RegisterPage } from "../../../support/pages/Pledge/register";
import { ThankYouPage } from "../../../support/pages/Pledge/ThankYouPage";
import { ReviewPage } from "../../../support/pages/Ticketing/ReviewPage";
import { SurveyComponent } from "../../../support/components/survey.co";
import * as specificData from '../../../data/Pledge/MultiPledgeDonationToParticipantFromPageLink.json'


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
const surveyCO = new SurveyComponent();

describe('TR(24) Scenario -> Multi Pledge donation to participant from page link - includes private message and custom honor roll : ', () => {
  using(events, event => {
  context('Donate to Participant from Page Link', () => {
    describe(`${event}`, () => {
      before(() => {
        pageSetup.goToEvent(`${event}/${data.URL}`);
        pageSetup.waitForPageLoad()
        //pageSetup.logoutIfLoggedIn();
      });
      it('should search for a participant then navigate to its page', () => {
        cy.get(donationSearchPO.container).should('be.visible');
        donationSearchPO.clickIndividualTab();
        donationSearchPO.searchAndSelectFirstOption(data.donationName);
      });
      it('Should check the cover admin fee checkbox, then press continue', () => {
        cy.get(donationCO.honourRollContainer).should('be.visible');
        cy.get(donationCO.donationContainer).should('be.visible');

        donationCO.setAmount(data.donationAmount);
        //donationCO.setCoverAdminFee(true);

        // Custom option 
        donationCO.selectLastHonorRollOption(data.honourRoleOptionIndex);
        donationCO.enterCustomHonorRollText(data.customHonourRollText);
        donationCO.enterPrivateMessage(data.privateMessage);
      });
      it('should enter the participant details', () => {
        flowPO.continue();        
        registerPO.fillInProfileAddressAndAdditionalInformation(data);
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
          reviewPO.verifyProfileInformation(data);
          reviewPO.verifyPaymentInformation(data.card);
      });
      it('Should verify the donation amount', () => {
          reviewPO.verifyTotalAmount(data.totalAmount);
      });
      it('should verify the Transaction code', () => {
          flowPO.continue();
          thankYouPO.verifyTransactionNumber(data);
      });
    });
  });
});
});
