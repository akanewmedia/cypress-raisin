import { inPayPal } from '../../support/utils/customTesting';
import { PageSetup } from "../../support/utils/pageSetup";
import { AttendeesPage } from "../../support/pages/Ticketing/AttendeesPage";
import { BuyItemsPage } from "../../support/pages/Ticketing/BuyItemsPage";
import { ReviewPage } from "../../support/pages/Ticketing/ReviewPage";
import { PaymentPage } from "../../support/pages/Ticketing/PaymentPage";
import { ThankYouPage } from "../../support/pages/Ticketing/ThankYouPage";
import { YourInformationPage } from "../../support/pages/Ticketing/YourInformationPage";
import { FlowPage } from "../../support/pages/flow";
import { PayPal } from "../../support/pages/External/Paypal/PayPal";
import { CreateAccount } from "../../support/components/createAccount.co";
import { TicketingNavBar } from "../../support/components/ticketingNavbar.co";
import * as specificData from '../../data/Ticketing/GuestBuySponsorDonatePromocodePayPal.json'


//The information regarding the Library
const using = require('jasmine-data-provider');

let pageSetup: PageSetup = new PageSetup();

const data = pageSetup.getData('Ticketing', specificData);
const events = pageSetup.getEvents(pageSetup.getEnvironment().ticketing, data.events);

//The Usage of locators pagewise
const attendeesPO = new AttendeesPage();
const buySponsorTicketsPO = new BuyItemsPage();
const reviewPO = new ReviewPage();
const paymentPO = new PaymentPage();
const thankYouPO = new ThankYouPage();
const yourInformationPO = new YourInformationPage();
const flowPO = new FlowPage();
const paypalPO = new PayPal();

const createAccountCO = new CreateAccount();
const navbarCO = new TicketingNavBar();

//The calling of functions created in respective Pages
describe('TR(453) Scenario -> Guest Purchase, Buy and Sponsor Tickets And Donate using Promo code : ', () => {
	using(events, function (event) {
		describe(`${event}`, () => {
			//Could maybe be put in first test but probably slightly more correct in a setup function like this
			before(function () {
				pageSetup = new PageSetup();
				pageSetup.goToEvent(event);
				pageSetup.waitForPageLoad()
				//pageSetup.cleanupPage()
			});

			after(() => {
				pageSetup.goToEvent(event);
				pageSetup.logoutIfLoggedIn();
				pageSetup.cleanupPage()
			});

			it('Add tickets to cart and start checkout', () => {
				navbarCO.clickOnBuyTickets();
				buySponsorTicketsPO.verifyItemsText(data.verifyTickets, data.verifyTickets.length);
				buySponsorTicketsPO.clickOnPlusButtonForSingleItem();
				buySponsorTicketsPO.clickOnPlusButtonForGroupItem();
				buySponsorTicketsPO.clickOnPlusButtonForNonTicketedItem();
				buySponsorTicketsPO.clickOnAddToCartInBuyItemsPage();
				cy.wait(4000);
				buySponsorTicketsPO.verifyAmountInCart(data.enteredTotalAmount);
				buySponsorTicketsPO.fillInDonationAmount(data.donationAmount);
				buySponsorTicketsPO.fillInAndApplyPromoCode(data.promocode);
				cy.wait(4000);
				buySponsorTicketsPO.verifyAmountInCart(data.enteredUpdatedTotalAmount);
			});

			it('should proceed as guest and review info', () => {
				buySponsorTicketsPO.clickOnCheckOutButtonInPopUp();
				createAccountCO.clickOnProceedAsGuestButton();
				cy.wait(3000);
				yourInformationPO.verifyFieldPresence();
			});

			it('should enter the participant details', () => {
				yourInformationPO.selectUserTypeOrganization();
				yourInformationPO.fillInMandatoryFields(data);
			});

			it('Should see validation errors when trying to continue before filling the required fields', () => {
				flowPO.continue();
				cy.get(yourInformationPO.container).should('be.visible')
				yourInformationPO.verifyRequiredFieldErrors(data.requiredFieldsValidationMessages);
			});

			it('should enter the organization name', () => {
				yourInformationPO.fillInOrganizationNameField(data);
				flowPO.continue();
				attendeesPO.verifyManageAttendeesDisplayed();
			});

			it('should Verify number of attendees and Skip Manage Attendees page', () => {
				attendeesPO.verifySkipThisStepButtonDisplayed();
				attendeesPO.verifyNumberOfAttendees(data.numberOfAttendeesBuyTicket);
				attendeesPO.skipStepClick();
			});

			it('Should enter payment information', () => {
				paymentPO.verifyPaymentFieldsPresent();
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

			it('Add sponsorship tickets to cart and start checkout', () => {
				navbarCO.clickOnSponsorships();
				cy.wait(2000);
				buySponsorTicketsPO.verifyItemsText(data.verifySponsorships, data.verifySponsorships.length);
				buySponsorTicketsPO.clickOnPlusButtonForSponsorshipSingleItem();
				buySponsorTicketsPO.clickOnPlusButtonForSponsorshipGroupItem();
				buySponsorTicketsPO.clickOnAddToCartInBuyItemsPage();
				cy.wait(4000);
				buySponsorTicketsPO.verifyAmountInCart(data.enteredUpdatedTotalAmountWithSponsorshipItems);
				buySponsorTicketsPO.clickOnCheckOutButtonInPopUp();
				cy.get(yourInformationPO.container).should('be.visible')
			});

			it('Skip Manage Attendees page (after sponsorship inclusion)', () => {
				createAccountCO.clickOnProceedAsGuestButton();
				yourInformationPO.verifyFieldPresence();
				yourInformationPO.fillInMandatoryFields(data);
				flowPO.continue();
				attendeesPO.verifyManageAttendeesDisplayed();
				attendeesPO.verifySkipThisStepButtonDisplayed();
				attendeesPO.verifyNumberOfAttendees(data.numberOfAttendeesBuyTicketsAndSponsorship);
			});

			it('Should enter payment information (PayPal)', () => {
				attendeesPO.skipStepClick();
				paymentPO.verifyPaymentFieldsPresent();
				paymentPO.clickPayPalButton();
				flowPO.continue();
			});

			it('should redirect to PayPal, complete the process and return to the review page', () => {
				cy.wait(10000);
				paypalPO.loginAndPay(data);
			});

			it('should verify the profile, payment and amount information (after sponsorship inclusion)', () => {
				cy.wait(10000);
				//Verification for Your Information Section
				reviewPO.verifyProfileInformation(data);
				//Verification For Payment details section
				reviewPO.verifyPayPalInformation(data.paypalText);
				//Verification for Amount Section
				reviewPO.verifyTotalTicketAmount(data.totalAmountOnReviewPageWithSponsorshipItems);
			});

			it('Complete successful checkout and download invoice', () => {
				flowPO.continue();
				cy.wait(5000);
				 
				thankYouPO.downloadTicketButtonPresence();
			});

		});
	});
});