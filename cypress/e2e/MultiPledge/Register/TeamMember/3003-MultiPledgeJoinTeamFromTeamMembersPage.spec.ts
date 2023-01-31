//The information regarding the Library
import { PageSetup } from "../../../../support/utils/pageSetup";
import { RegisterComponent } from "../../../../support/components/register.co";
import { PledgeNavBarComponent } from "../../../../support/components/pledgeNavbar.co";
import { ReturningParticipant } from "../../../../support/components/returningParticipant.co";
import { generateUniqueName } from "../../../../support/utils/actions";
import { RegisterPage } from "../../../../support/pages/Pledge/register";
import { FlowPage } from "../../../../support/pages/flow";
import { ReviewPage } from "../../../../support/pages/Ticketing/ReviewPage";
import { ThankYouPage } from "../../../../support/pages/Pledge/ThankYouPage";
import { DonationSearchPage } from "../../../../support/pages/Pledge/donationSearch";
import { Waiver } from "../../../../support/components/waiver.co";
import { PaymentPage } from "../../../../support/pages/Pledge/payment";
import { EnitytDetails } from "../../../../support/components/entityDetails.co";
import using from "jasmine-data-provider";
import * as specificData from '../../../../data/Pledge/MultiPledgeJoinTeamFromTeamMembersPage.json'

const using = require('jasmine-data-provider');
let pageSetup: PageSetup = new PageSetup();

const data = pageSetup.getData('Pledge', specificData);
const events = pageSetup.getEvents(pageSetup.getEnvironment().multipledge, data.events);



const registerPO = new RegisterPage();
const navbarCO = new PledgeNavBarComponent();
const registerCO = new RegisterComponent();
const returningParticipantCO = new ReturningParticipant();
const flowPO = new FlowPage();
const reviewPO = new ReviewPage();
const thankYouPO = new ThankYouPage();
const donationSearchPO = new DonationSearchPage();
const waiverCO = new Waiver();
const paymentPO = new PaymentPage();
const entityDetailsCO = new EnitytDetails();
//The calling of functions created in respective Pages
describe('TR(3003) Scenario -> Multi Pledge Join a team from a team member page: ', () => {
	using(events, (event) => {
		describe(`${event}`, () => {
			before(() => {
				pageSetup.goToEvent(event);
				pageSetup.waitForPageLoad()
				generateUniqueName(data);
			});

			after(() => {
				pageSetup.goToEvent(event);
				pageSetup.cleanupPage();
			});

			it('should select registration details', () => {
				navbarCO.donate();
				cy.get(donationSearchPO.container).should('be.visible')
				donationSearchPO.navigateDonationResult(data.donationName);
				// loading entity pages
				cy.wait(3000);
			});
			it('should verify then press the right side donate button', () => {
				entityDetailsCO.joinTeam();

				registerCO.register(0, 0);
				cy.get(returningParticipantCO.username).should('be.visible')
				cy.get(returningParticipantCO.password).should('be.visible')
				cy.get(returningParticipantCO.loginButton).should('be.visible')
				cy.get(returningParticipantCO.loginButton).should('be.visible')
			});

			it('should create account then enter profile details', () => {
				returningParticipantCO.createAccount();
				waiverCO.selectWaiverAcceptance(true);

				flowPO.continue();
				registerPO.fillInMandatoryInformation(data);
				cy.get(registerPO.container).should('be.visible')
			});

			it('should enter a donation amount and enter the CC details', () => {
				flowPO.continue();

				// Skip the additional participants page
				flowPO.continue();

				// Donation
				cy.get(paymentPO.donationContainer).should('be.visible')
				paymentPO.donate(data.donationAmount);

				// Payment Information
				paymentPO.verifyPaymentFieldsPresent();
				paymentPO.verifyCreditCardIsDisplayed();
				paymentPO.enterCardDetails(data.card);
			});

			it('should be on the review page', () => {
				flowPO.continue();

				reviewPO.verifyProfileInformation(data);
				reviewPO.verifyPaymentInformation(data.card);
				reviewPO.verifyTotalAmount(data.totalAmount);
				reviewPO.verifyTeamInfo(data.team);
			});

			it('should display thank you page and have a transaction number', () => {
				flowPO.continue();
				// actions.waitForElement(thankYouPO.transactionNumber);
				thankYouPO.verifyTransactionNumber(data);
			});

			it('should be able to select "start fundraising" and log into the PC', () => {
				thankYouPO.verifiyStartFundraisingIsPresent();
			});
		});
	});
});