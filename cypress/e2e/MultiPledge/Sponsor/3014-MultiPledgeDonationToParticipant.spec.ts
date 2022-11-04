import { PageSetup } from "../../../support/utils/pageSetup";
import { PledgeNavBarComponent } from "../../../support/components/pledgeNavbar.co";
import { Donation } from "../../../support/components/donation.co";
import { FlowPage } from "../../../support/pages/flow";
import { DonationSearchPage } from "../../../support/pages/Pledge/donationSearch";
import { PaymentPage } from "../../../support/pages/Pledge/payment";
import { RegisterPage } from "../../../support/pages/Pledge/register";
import { ThankYouPage } from "../../../support/pages/Pledge/ThankYouPage";
import { ReviewPage } from "../../../support/pages/Ticketing/ReviewPage";
import * as specificData from '../../../data/Pledge/MultiPledgeDonationToParticipant.json'


//The information regarding the Library
const using = require('jasmine-data-provider');
let pageSetup: PageSetup = new PageSetup();

const data = pageSetup.getData('Pledge', specificData);
const events = pageSetup.getEvents(pageSetup.getEnvironment().multipledge, data.events);
const donationSearchPO = new DonationSearchPage();
const donationCO = new Donation();
const registerPO = new RegisterPage();
const navbarCO = new PledgeNavBarComponent();
const paymentPO = new PaymentPage();
const reviewPO = new ReviewPage();
const thankYouPO = new ThankYouPage();
const flowPO = new FlowPage();


//The calling of functions created in respective Pages
describe('TR(3014) Scenario -> Multi Pledge Search For Participant And Donate : ', () => {
	using(events, event => {
		describe(`${event}`, () => {
			before(() => {
				pageSetup.goToEvent(event);
				pageSetup.waitForPageLoad()
			});
			after(() => {
				pageSetup.goToEvent(event);
				pageSetup.cleanupPage();
			});

			it('should start donation to a participant', () => {
				navbarCO.donate();
				cy.get(donationSearchPO.container).should('be.visible');
				donationSearchPO.searchAndSelectFirstOption(data.donationName);
				cy.get(donationCO.honourRollContainer).should('be.visible');
				cy.get(donationCO.donationContainer).should('be.visible');
				cy.get(donationCO.privateMessageContainer).should('be.visible');
				donationCO.setAmount(data.donationAmount);
				donationCO.selectHonorRollOption(data.honourRoleOption);
			});

			it('should enter the participant details', () => {
				flowPO.continue();
				registerPO.fillInProfileAndAddressInformation(data);
				cy.get(registerPO.container).should('be.visible');
			});

			it('should enter the payment details and display on the review page', () => {
				flowPO.continue();
				paymentPO.verifyPaymentFieldsPresent();
				paymentPO.verifyCreditCardIsDisplayed();
				paymentPO.enterCardDetails(data.card);

				flowPO.continue();
				reviewPO.verifyProfileInformation(data);
				reviewPO.verifyPaymentInformation(data.card);
			});

			it('should verify the Transaction Number', () => {
				flowPO.continue();
				thankYouPO.verifyTransactionNumber(data);
			});

			it('should go to participant page', () => {
				thankYouPO.goToProfile();
			});
		});		
	});
});