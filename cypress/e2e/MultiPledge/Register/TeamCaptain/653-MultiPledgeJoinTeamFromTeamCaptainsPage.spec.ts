//The information regarding the Library
import { PledgeNavBarComponent } from "../../../../support/components/pledgeNavBar.co";
import { RegisterComponent } from "../../../../support/components/register.co";
import { ReturningParticipant } from "../../../../support/components/returningParticipant.co";
import { FlowPage } from "../../../../support/pages/flow";
import { RegisterPage } from "../../../../support/pages/Pledge/register";
import { ThankYouPage } from "../../../../support/pages/Pledge/ThankYouPage";
import { ReviewPage } from "../../../../support/pages/Ticketing/ReviewPage";
import { DonationSearchPage } from "../../../../support/pages/Pledge/donationSearch";
import { PageSetup } from "../../../../support/utils/pageSetup";
import { generateUniqueName } from "../../../../support/utils/actions";
import { Waiver } from "../../../../support/components/waiver.co";
import { PaymentPage } from "../../../../support/pages/Pledge/payment";
import { EnitytDetails } from "../../../../support/components/entityDetails.co";
import using from "jasmine-data-provider";
import * as specificData from '../../../../data/Pledge/MultiPledgeJoinTeamFromTeamCaptainsPage.json'


//The information regarding the Library
const using = require('jasmine-data-provider');
let pageSetup: PageSetup = new PageSetup();

const data = pageSetup.getData('Pledge', specificData);
const events = pageSetup.getEvents(pageSetup.getEnvironment().multipledge, data.events);

const registerPO = new RegisterPage();
const reviewPO = new ReviewPage();
const thankYouPO = new ThankYouPage();
const flowPO = new FlowPage();
const waiverCO = new Waiver()
const paymentPO = new PaymentPage();
const navbarCO = new PledgeNavBarComponent();
const registerCO = new RegisterComponent();
const returningParticipantCO = new ReturningParticipant();
const donationSearchPO = new DonationSearchPage();
const entityDetailsCO = new EnitytDetails();

//The calling of functions created in respective Pages
describe('TR(653) Scenario -> Multi Pledge Join a team from a team captains page: ', () => {
	using(events, (event) => {
		describe(`${event}`, () => {
			before(() => {
				pageSetup.goToEvent(event);
				pageSetup.waitForPageLoad();
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
			});
			it('should verify then press the right side donate button', () => {
				cy.wait(4000);
				entityDetailsCO.joinTeam();
				registerCO.register(0, 0);
				cy.get(returningParticipantCO.username).should('be.visible')
				cy.get(returningParticipantCO.password).should('be.visible')
				cy.get(returningParticipantCO.createAccountButton).should('be.visible')
				cy.get(returningParticipantCO.loginButton).should('be.visible')
			});

			it('should create account, select waiver and enter profile details', () => {
				returningParticipantCO.createAccount();
				waiverCO.selectWaiverAcceptance(true);

				flowPO.continue();
				registerPO.fillInMandatoryInformation(data);
			});

			it('should go to the payment page and skip additional participants', () => {
				flowPO.continue(); // skip
				flowPO.continue();
				// paymentPO.verifyPaymentFieldsPresent();
				// paymentPO.verifyCreditCardIsDisplayed();
			});

			it('should enter a donation amount and CC details', () => {
				// Donation
				paymentPO.donate(data.donationAmount);

				// Payment Information
				paymentPO.enterCardDetails(data.card);
			});

			it('should enter the CC details', () => {
				flowPO.continue();

				reviewPO.verifyProfileInformation(data);
				reviewPO.verifyPaymentInformation(data.card);
				reviewPO.verifyTotalAmount(data.totalAmount);
				reviewPO.verifyTeamInfo(data.team);
			});

			it('should display thank you page and have a transaction number', () => {
				flowPO.continue();
				thankYouPO.verifyTransactionNumber(data);
			});

			it('should be able to select "start fundraising" and log into the PC', () => {
				thankYouPO.verifiyStartFundraisingIsPresent();
			});
		});
	});
});