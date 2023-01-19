import { PageSetup } from "../../support/utils/pageSetup";
import { DonateNowPage } from "../../support/pages/Ticketing/DonateNowPage";
import { ReviewPage } from "../../support/pages/Ticketing/ReviewPage";
import { PaymentPage } from "../../support/pages/Ticketing/PaymentPage";
import { ThankYouPage } from "../../support/pages/Ticketing/ThankYouPage";
import { YourInformationPage } from "../../support/pages/Ticketing/YourInformationPage";
import { FlowPage } from "../../support/pages/flow";
import { TicketingNavBar } from "../../support/components/ticketingNavbar.co";
import * as specificData from '../../data/Ticketing/DonateIndividual.json'


//The information regarding the Library
const using = require('jasmine-data-provider');

let pageSetup: PageSetup = new PageSetup();

//To get the Test Data
const data = pageSetup.getData('Ticketing', specificData);
const events = pageSetup.getEvents(pageSetup.getEnvironment().ticketing, data.events);

//The Usage of locators pagewise
const donateNowPO = new DonateNowPage();
const reviewPO = new ReviewPage();
const paymentPO = new PaymentPage();
const thankYouPO = new ThankYouPage();
const yourInformationPO = new YourInformationPage();
const flowPO = new FlowPage();

const ticketingNavbarCO = new TicketingNavBar();

//The calling of functions created in respective Pages
describe('TR(547) Scenario -> Ticketing Donate : ', () => {
  using(events, event => {
    describe(`${event}`, () => {
      //Could maybe be put in first test but probably slightly more correct in a setup function like this
      before(() => {
        pageSetup = new PageSetup();
        pageSetup.goToEvent(event);
        pageSetup.waitForPageLoad()
        //pageSetup.logoutIfLoggedIn();
        //pageSetup.clearCart();
      });

      after(() => {
        pageSetup.goToEvent(event);
        //pageSetup.logoutIfLoggedIn();
        pageSetup.cleanupPage();
      });

      it('Add donation amount', () => {
        ticketingNavbarCO.clickOnDonate(); //clicks the Donate button
        donateNowPO.verifyDonationText(data.verifyDonationText); //waits the donation page to be loaded
        donateNowPO.donate(data.donationAmount);  //fills txtDonationAmount with an amount
        donateNowPO.clickAddAndCheckout(); //clicks the Add and Checkout button
        yourInformationPO.verifyFieldPresence(); //checks next page loaded
      });
      //Tests should always end with a verification. Any setup for other tests should be done at the start of those tests or in a beforeEach/beforeAll

      it('Enter the participant details', () => {
        yourInformationPO.fillInMandatoryFields(data); //fills the mandatory fields (Personal and Address Information)
        flowPO.continue(); //clicks the continue button
        paymentPO.verifyPaymentFieldsPresent(); //checks next page loaded
      });

      it('Enter the payment details', () => {
        paymentPO.verifyCreditCardIsDisplayed(); //checks next page loaded
        paymentPO.enterCardDetails(data.card); //fills txtCardNumber, txtCardHolderName, creditCardExpirationMonth and creditCardExpirationYear fields
      });

      it('Check participant and payment details on review page', () => {
        flowPO.continue(); //clicks the continue button
        reviewPO.verifyReviewPage(); //waits the container of the fields to be displayed

        reviewPO.verifyProfileInformation(data); //checks Your Information child fields against the input data
        reviewPO.verifyPaymentInformation(data.card); //checks Payment Information child fields against the input data
        reviewPO.verifyTicketingAmount(1, data.donationAmount); //checks donationAmount field against the input data (donation)
      });

      it('Display thank you page with transaction number', () => {
        flowPO.continue(); //clicks the continue button
        thankYouPO.verifyTransactionNumber(data); //checks if the ticketed-donation-success element contains the transactionNumber (string that contains "successful")
      });
    });
  });
});