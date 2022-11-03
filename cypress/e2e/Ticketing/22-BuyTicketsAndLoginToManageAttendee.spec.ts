import { getLocalDateTime } from "../../support/utils/actions";
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
import * as specificData from '../../data/Ticketing/BuyTicketsAndLoginToManageAttendee.json'


//The information regarding the Library
const using = require('jasmine-data-provider');

let pageSetup: PageSetup = new PageSetup();

//To get the Test Data
const data = pageSetup.getData('Ticketing', specificData);
const events = pageSetup.getEvents(pageSetup.getEnvironment().ticketing, data.events);

//The Usage of locators pagewise
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
describe('TR(22) Scenario -> Buy Tickets And Login To Manage Attendee : ', () => {
	using(events, event => {
		describe(`${event}`, () => {
			//Could maybe be put in first test but probably slightly more correct in a setup function like this
			before(() => {
				pageSetup.goToEvent(event);
				pageSetup.cleanupPage();
				//pageSetup.logoutIfLoggedIn();
				//pageSetup.clearCart();
			});
			after(() => {
				pageSetup.cleanupPage();
			});

			//test names as command for functionality being tested
			it('Add tickets to cart and start checkout', () => {
				navbarCO.clickOnBuyTickets();
				cy.wait(2000)
				//buyTicketsPO.verifyItemsText(data.verifyTickets, data.verifyTickets.length);
				buyTicketsPO.clickOnPlusButtonForSingleItem();
				buyTicketsPO.clickOnPlusButtonForGroupItem();
				buyTicketsPO.clickOnAddToCartInBuyItemsPage();
				cy.wait(2000)
				buyTicketsPO.verifyAmountInCart(data.enteredTotalAmount);
				buyTicketsPO.clickOnCheckOutButtonInPopUp();
				cy.get(createAccountCO.username).should('be.visible')
				cy.get(createAccountCO.password).should('be.visible')
				cy.get(createAccountCO.createAccountButton).should('be.visible')
			});
			//Tests should always end with a verification. Any setup for other tests should be done at the start of those tests or in a beforeEach/beforeAll

			it('Create a New Account', () => {
				createAccountCO.enterUsernameAndPassword(data.username + getLocalDateTime(), data.password);
				cy.wait(1000)
				createAccountCO.clickOnCreateAccountButton();
			});

			it('should enter the participant details', () => {
				//createAccountCO.clickOnCreateAccountButton();
				cy.get(yourInformationPO.container).should('be.visible')
				yourInformationPO.verifyFieldPresence();
				yourInformationPO.fillInMandatoryFields(data);
				flowPO.continue();
				cy.get(attendeesCO.container).should('be.visible')
				cy.get(attendeesCO.skipStepButton).should('be.visible')
			});

			it('Skip Manage Attendees page', () => {
				attendeesCO.skipStepClick();
				paymentPO.verifyPaymentFieldsPresent();
			});

			it('Enter credit card info and review info', () => {
				paymentPO.verifyCreditCardIsDisplayed();
				paymentPO.enterCardDetails(data.card);

				flowPO.continue();

				//Verification for Your Information Section
				reviewPO.verifyProfileInformation(data);
				//Verification For Payment details section
				reviewPO.verifyPaymentInformation(data.card);
				//Verification for Amount Section
				reviewPO.verifyTotalTicketAmount(data.totalAmountOnReviewPage);
			});

			it('Edit the Information and Amount Section', () => {
				//Editted the Information section and verification
				reviewPO.editInformation();
				cy.wait(2000);
				yourInformationPO.fillInEditedMandatoryFields(data);
				cy.get(yourInformationPO.container).should('be.visible')
				flowPO.continue();
				cy.wait(2000);
				reviewPO.verifyProfileInformation(data);

				//Editing the Amount Section and verification
				reviewPO.editTickets();
				reviewPO.removeGroupTicketFromCart();
				reviewPO.updateCart();
				cy.wait(2000);
				reviewPO.verifyTotalTicketAmount(data.updatedTotalAmountOnReviewPage);
			});

			it('Complete checkout and download tickets', () => {
				flowPO.continue();
				thankYouPO.downloadTicketButtonPresence();
				thankYouPO.manageAttendeesButtonPresence();
			});

			it('Navigate to manage attendees page and log out', () => {
				thankYouPO.clickOnManageAttendeesButton();
				cy.wait(2000);
				attendeesCO.updateAttendee(0, 0, { firstName: 'Test', lastName: 'test', email: 'test.test@test.org' });
				attendeesCO.clickUpdate();
				cy.wait(2000);
				cy.get(attendeesCO.updateSuccessMessage).contains(data.successMessage, { matchCase:false })
				navbarCO.logout();
				cy.get(navbarCO.loginButton).should('be.visible')
			});
		});
	});
});