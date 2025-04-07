//The information regarding the Library
import { PageSetup } from "../../../../support/utils/pageSetup";
import { generateUniqueName, waitForUrl } from "../../../../support/utils/actions";
import  using from 'jasmine-data-provider';
import { PayPal } from "../../../../support/pages/External/Paypal/PayPal";
import { FlowPage } from "../../../../support/pages/flow";
import { ThankYouPage } from "../../../../support/pages/Pledge/ThankYouPage";
import { ReviewPage } from "../../../../support/pages/Ticketing/ReviewPage";
import { PaymentPage } from "../../../../support/pages/Pledge/payment";
import { RegisterComponent } from "../../../../support/components/register.co";
import { PledgeNavBarComponent } from "../../../../support/components/pledgeNavBar.co";
import { Waiver } from "../../../../support/components/waiver.co";
import { DonationSearchPage } from "../../../../support/pages/Pledge/donationSearch";
import { ReturningParticipant } from "../../../../support/components/returningParticipant.co";
import { RegisterPage } from "../../../../support/pages/Pledge/register";
import * as specificData from '../../../../data/Pledge/MultiPledgeRegisterBuyStoreItemAndDonateToSelf.json'

//The information regarding the Library
const using = require('jasmine-data-provider');
let pageSetup: PageSetup = new PageSetup();

const data = pageSetup.getData('Pledge', specificData);
const events = pageSetup.getEvents(pageSetup.getEnvironment().multipledge, data.events);

const registerCO = new RegisterComponent();
const paymentPO = new PaymentPage();
const reviewPO = new ReviewPage();
const thankYouPO = new ThankYouPage();

const flowPO = new FlowPage();

const registerPO = new RegisterPage();
const navbarCO = new PledgeNavBarComponent();
const donationSearchPO = new DonationSearchPage();

const returningParticipantCO = new ReturningParticipant()
const waiverCO = new Waiver()

//The calling of functions created in respective Function Pages
describe('TR(3008) Scenario -> Multi Pledge Register, Add a Self Donation And Buy Store Item : ', () => {
  using(events, event => {
    describe(`${event}`, () => {
      before(() => {
        pageSetup.goToEvent(event);
        pageSetup.waitForPageLoad()
        generateUniqueName(data);
    });
    after(() => {
        pageSetup.cleanupPage()
    });

      it('should select registration details', () => {
        navbarCO.register();					
				cy.get(registerCO.container).should('be.visible')
				registerCO.selectSubEventGroup(data.location);
				registerCO.register(0);
				cy.get(returningParticipantCO.username).should('be.visible')
				cy.get(returningParticipantCO.password).should('be.visible')
				cy.get(returningParticipantCO.createAccountButton).should('be.visible')
				cy.get(returningParticipantCO.loginButton).should('be.visible')	
      });

      it('should create an account enter participant information, add self donation, and add store items', () => {
        returningParticipantCO.createAccount(); //clicks the create account button
        waiverCO.selectWaiverAcceptance(true);
        flowPO.continue();
        registerPO.fillInMandatoryInformation(data); //fills mandatory fields (on regster.js and accountInformation.co.js)
        registerPO.profileInformationCO.selectGender(data.gender); //selects the gender in the dropdown

        flowPO.continue(); //skip additional participants
        flowPO.continue(); //clicks the continue button
        paymentPO.donate(data.donationAmount);  //fills txtDonationAmount with an amount
        paymentPO.verifyPaymentFieldsPresent(); //waits for the paymentDetails-title child components to be loaded
        paymentPO.verifyCreditCardIsDisplayed(); //waits for the txtCardHolderName filed to be loaded
        paymentPO.buyItem(0); //clicks the first store item
        paymentPO.buyItem(1); //clicks the second store item
        paymentPO.verifyTotalAmount(data.total); //checks if store-items-total is 125
      });

      it('should display participant details on review page', () => {
        paymentPO.enterCardDetails(data.card); //fills txtCardNumber, txtCardHolderName, creditCardExpirationMonth and creditCardExpirationYear fields
        flowPO.continue(); //clicks the continue button

        reviewPO.verifyProfileInformation(data); //checks Your Information child fields against the input data
        reviewPO.verifyPaymentInformation(data.card); //checks Payment Information child fields against the input data
        reviewPO.verifyTotalAmount(data.totalAmountDonationAndStore); //checks reviewStoreItemsTotalAmount-title field against the input data (store items and donation)
      });

      it('should display thank you page and the participant centre', () => {
        flowPO.continue(); //clicks the continue button
          //checks if the last row of div.is-container.is-builder.is-content-800 contains the transactionNumber (string that contains "Test-")
      });

      // xit('should go to participant center', () => {
      //   thankYouPO.startFundraising(); //clicks the Start Fundraising button
      //   waitForUrl('Common/Participant/', 7000); //checks if page redirected to the Participant Center
      // });
    });
  });
});