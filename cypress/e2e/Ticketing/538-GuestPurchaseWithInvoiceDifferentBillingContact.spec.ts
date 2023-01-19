import { PageSetup } from "../../support/utils/pageSetup";
import { BuyItemsPage } from "../../support/pages/Ticketing/BuyItemsPage";
import { ReviewPage } from "../../support/pages/Ticketing/ReviewPage";
import { PaymentPage } from "../../support/pages/Ticketing/PaymentPage";
import { ThankYouPage } from "../../support/pages/Ticketing/ThankYouPage";
import { YourInformationPage } from "../../support/pages/Ticketing/YourInformationPage";
import { FlowPage } from "../../support/pages/flow";
import { CreateAccount } from "../../support/components/createAccount.co";
import { TicketingNavBar } from "../../support/components/ticketingNavbar.co";
import { Attendees } from "../../support/components/attendees.co";
import * as specificData from '../../data/Ticketing/GuestPurchaseWithInvoiceDifferentBillingContact.json'


//The information regarding the Library
const using = require('jasmine-data-provider');

let pageSetup: PageSetup = new PageSetup();

//To get the Test Data
const data = pageSetup.getData('Ticketing', specificData);
const events = pageSetup.getEvents(pageSetup.getEnvironment().ticketing, data.events);

//The Usage of Locators Pagewise
const buyTicketsPO = new BuyItemsPage();
const reviewPO = new ReviewPage();
const paymentPO = new PaymentPage();
const thankYouPO = new ThankYouPage();
const yourInformationPO = new YourInformationPage();
const flowPO = new FlowPage();

const createAccountCO = new CreateAccount();
const navbarCO = new TicketingNavBar();
const attendeesCO = new Attendees();

//The calling of functions created in respective Pages
describe('TR(538) Scenario -> Guest Purchase With Invoice And Different Billing Contact : ', () => {
	using(events, event => {
		describe(`${event}`, () => {
			//Could maybe be put in first test but probably slightly more correct in a setup function like this
			before(function () {
				pageSetup = new PageSetup();
				pageSetup.goToEvent(event);
				pageSetup.cleanupPage()
				pageSetup.waitForPageLoad()
				//pageSetup.logoutIfLoggedIn();
				//pageSetup.clearCart();
			});

			//test names as command for functionality being tested
			it('Add Tickets to cart', () => {
				navbarCO.clickOnBuyTickets();
				buyTicketsPO.verifyItemsText(data.verifyTickets, data.verifyTickets.length);
				buyTicketsPO.clickOnAddToCartButton();
				buyTicketsPO.verifyEmptyCartText(data.emptyShoppingCardText);
				buyTicketsPO.clickOnKeepShoppingButton();
				buyTicketsPO.clickOnPlusButtonForSingleItem();
				buyTicketsPO.clickOnPlusButtonForGroupItem();
				buyTicketsPO.clickOnAddToCartInBuyItemsPage();
				cy.wait(4000)
				buyTicketsPO.verifyAmountInCart(data.enteredTotalAmount);
			});
			//Tests should always end with a verification. Any setup for other tests should be done at the start of those tests or in a beforeEach/beforeAll

			it('Proceed as Guest and review info', () => {
				buyTicketsPO.clickOnCheckOutButtonInPopUp();
				createAccountCO.clickOnProceedAsGuestButton();
				cy.wait(3000)
				yourInformationPO.verifyFieldPresence();
			});

			it('should enter the participant details', () => {
				yourInformationPO.fillInMandatoryFields(data);
				cy.get(yourInformationPO.container).should('be.visible')
			});

			it('Skip Manage Attendees page', () => {
				flowPO.continue();

				cy.get(attendeesCO.container).should('be.visible')
				cy.get(attendeesCO.skipStepButton).should('be.visible')
			});

			it('Start checkout and enter payment info details', () => {
				attendeesCO.skipStepClick();

				paymentPO.verifyCreditCardIsDisplayed();
				paymentPO.clickInvoiceButton();
				cy.wait(1000)
				paymentPO.unselectSameAsPurchaser()
				paymentPO.verifyTheBillingInfoFieldsDisplayed();
			});

			it('Enter billing contact info (different from purchaser)', () => {
				paymentPO.fillInMandatoryFieldsBilling(data.billingContact);
			});

			it('review guest info', () => {
				flowPO.continue();
				//Verification for Your Information section
				reviewPO.verifyProfileInformation(data);
				//Verification for Billing Information Section		
				reviewPO.verifyBillingInformation(data.billingContact);
				//Verification for Amount Section
				reviewPO.verifyTotalTicketAmount(data.totalAmountOnReviewPage);
			});

			it('Complete successful checkout and download invoice', () => {
				flowPO.continue();
				thankYouPO.verifyTransactionNumber(data);
				thankYouPO.downloadInvoiceButtonPresense();
			});
		});
	});
});