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
import * as specificData from '../../data/Ticketing/GuestPurchaseWithInvoiceAndDownload.json'


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
describe('TR(5) Scenario -> Guest Purchase With Invoice And Download : ', () => {
	using(events, event => {
		describe(`${event}`, () => {
			//Could maybe be put in first test but probably slightly more correct in a setup function like this
			before(() => {
				pageSetup = new PageSetup();
				pageSetup.cleanupPage()
				pageSetup.goToEvent(event);
				pageSetup.waitForPageLoad()
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
				cy.wait(5000)
				buyTicketsPO.verifyAmountInCart(data.enteredTotalAmount);
			});
			//Tests should always end with a verification. Any setup for other tests should be done at the start of those tests or in a beforeEach/before

			it('Proceed as Guest and review info', () => {
				buyTicketsPO.clickOnCheckOutButtonInPopUp();
				createAccountCO.clickOnProceedAsGuestButton();
				cy.wait(3000);
				yourInformationPO.verifyFieldPresence();
			});

			it('should enter the participant details', () => {
				yourInformationPO.fillInMandatoryFields(data);
				cy.get(yourInformationPO.container).should('be.visible')
			});

			it('Skip Manage Attendees page', () => {
				cy.wait(2000)
				flowPO.continue();

				cy.get(attendeesCO.container).should('be.visible')
				cy.get(attendeesCO.skipStepButton).should('be.visible')
				attendeesCO.skipStepClick();
			});

			it('Start checkout and enter payment info details', () => {
				paymentPO.verifyCreditCardIsDisplayed();
				paymentPO.clickInvoiceButton();
				cy.wait(1000);
				//paymentPO.verifyTheBillingInfoFieldsNotDisplayed();
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

			it('Edit the Your Information Section and Amount Section', () => {
				reviewPO.editInformation();
				yourInformationPO.fillInEditedMandatoryFields(data);
				flowPO.continue();
				reviewPO.verifyProfileInformation(data);

				//Editing the Amount Section
				reviewPO.editTickets();
				cy.wait(1000);
				reviewPO.removeSingleTicketFromCart();
				reviewPO.updateCart();
				cy.wait(1000);
				reviewPO.verifyTotalTicketAmount(data.updatedTotalAmountOnReviewPage, `checking updatedTotalAmountOnReviewPage: ${data.updatedTotalAmountOnReviewPage}`);
			});

			it('Complete successful checkout and download invoice', () => {
				flowPO.continue();
				thankYouPO.verifyTransactionNumber(data);
				thankYouPO.downloadInvoiceButtonPresense();
			});
		});
	});
});