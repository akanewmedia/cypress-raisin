import { PageSetup } from "../../support/utils/pageSetup";
import { BuyItemsPage } from "../../support/pages/Ticketing/BuyItemsPage";
import { ReviewPage } from "../../support/pages/Ticketing/ReviewPage";
import { PaymentPage } from "../../support/pages/Ticketing/PaymentPage";
import { ThankYouPage } from "../../support/pages/Ticketing/ThankYouPage";
import { YourInformationPage } from "../../support/pages/Ticketing/YourInformationPage";
import { FlowPage } from "../../support/pages/flow";
import { CreateAccount } from "../../support/components/createAccount.co";
import { TicketingNavBar } from "../../support/components/ticketingNavbar.co";
import * as specificData from '../../data/Ticketing/GuestPurchaseMostFieldsHidden.json'


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

//The calling of functions created in respective Pages
describe('TR(2356) Scenario -> Guest Purchase With Most Fields Hidden : ', () => {
	using(events, event => {
		describe(`${event}`, () => {
			//Could maybe be put in first test but probably slightly more correct in a setup function like this
			before(() => {
				pageSetup = new PageSetup();
				pageSetup.goToEvent(event);
				pageSetup.waitForPageLoad()
				//pageSetup.cleanupPage();
			});

			after(() => {
				pageSetup.goToEvent(event);
				pageSetup.cleanupPage();
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

			//Tests should always end with a verification. Any setup for other tests should be done at the start of those tests or in a beforeEach/before
			it('Proceed as Guest and review info', () => {
				buyTicketsPO.clickOnCheckOutButtonInPopUp();
				createAccountCO.clickOnProceedAsGuestButton();
				yourInformationPO.verifyFieldPresence();
			});

			it('should enter the participant details', () => {
				cy.get(yourInformationPO.container).should('be.visible')
				yourInformationPO.fillInMandatoryFields(data);
			});

			it('Should auto skip Manage Attendees page', () => {
				flowPO.continue();
			});

			it('Start checkout and enter payment info details', () => {
				flowPO.continue();
				paymentPO.verifyCreditCardIsDisplayed();
				paymentPO.clickInvoiceButton();
				cy.wait(1000)
				//paymentPO.verifyTheBillingInfoFieldsDisplayed();
			});

			// it('Select billing user to be same as purchaser', () => {
			// 	paymentPO.selectSameAsPurchaser(true);
			// 	paymentPO.verifySameAsPurchaserisChecked();
			// });

			it('review guest info', () => {
				flowPO.continue();

				//Verification for Your Information section
				reviewPO.verifyProfileInformation(data);
				//Verification for Billing Information Section		
				reviewPO.verifyBillingInformation(data);
				//Verification for Amount Section
				reviewPO.verifyTotalTicketAmount(data.totalAmountOnReviewPage, `checking totalAmountOnReviewPage: ${data.totalAmountOnReviewPage}`);
			});

			it('Edit the Billing Information Section and Amount Section', () => {
				reviewPO.editBillingInformation();
				paymentPO.clickInvoiceButton();
				paymentPO.unselectSameAsPurchaser();
				paymentPO.fillInMandatoryFieldsBilling(data.billingContact);
				flowPO.continue();

				reviewPO.verifyBillingInformation(data.billingContact);
				//Editing the Amount Section
				reviewPO.editTickets();
				cy.wait(1000)
				reviewPO.removeSingleTicketFromCart();
				reviewPO.updateCart();
				cy.wait(1000)
				reviewPO.verifyTotalTicketAmount(data.updatedTotalAmount, `checking updatedTotalAmount: ${data.updatedTotalAmount}`);
			});

			it('Complete successful checkout and download invoice', () => {
				flowPO.continue();
				 
				thankYouPO.downloadInvoiceButtonPresense();
			});
		});
	});
});