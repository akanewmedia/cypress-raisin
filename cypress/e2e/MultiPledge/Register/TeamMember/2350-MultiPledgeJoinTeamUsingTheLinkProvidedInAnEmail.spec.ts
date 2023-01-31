//The information regarding the Library
import { PageSetup } from "../../../../support/utils/pageSetup";
import { RegisterComponent } from "../../../../support/components/register.co";
import { ReturningParticipant } from "../../../../support/components/returningParticipant.co";
import { generateUniqueName, waitForUrl } from "../../../../support/utils/actions";
import { RegisterPage } from "../../../../support/pages/Pledge/register";
import { FlowPage } from "../../../../support/pages/flow";
import { ReviewPage } from "../../../../support/pages/Ticketing/ReviewPage";
import { ThankYouPage } from "../../../../support/pages/Pledge/ThankYouPage";
import { EnitytDetails } from "../../../../support/components/entityDetails.co";
import { Waiver } from "../../../../support/components/waiver.co";
import { PaymentPage } from "../../../../support/pages/Pledge/payment";
import using from "jasmine-data-provider";
import * as specificData from '../../../../data/Pledge/MultiPledgeJoinTeamUsingTheLinkProvidedInAnEmail.json'

const using = require('jasmine-data-provider');
let pageSetup: PageSetup = new PageSetup();

const data = pageSetup.getData('Pledge', specificData);
const events = pageSetup.getEvents(pageSetup.getEnvironment().multipledge, data.events);

const registerPO = new RegisterPage();
const registerCO = new RegisterComponent();
const returningParticipantCO = new ReturningParticipant();
const flowPO = new FlowPage();
const reviewPO = new ReviewPage();
const thankYouPO = new ThankYouPage();
const waiverCO = new Waiver();
const paymentPO = new PaymentPage();
//The calling of functions created in respective Pages

describe('TR(2350) Scenario -> Multi Pledge Join a team from the Join Team email link: ', function () {
	using(events, function (event) {
		describe(`${event}`, function () {
			before(() => {
				//creating a unique firstname
				generateUniqueName(data);
				data.fullName = `${data.firstName} ${data.lastName}`;
				pageSetup.goToSite(`${data.URL}`);
				pageSetup.waitForPageLoad()
			});

			after(() => {
				pageSetup.goToEvent(event);
				pageSetup.cleanupPage();
			});
			it('should verify registration item is selected', () => {
				registerCO.register(0, 1);
				cy.get(returningParticipantCO.username).should('be.visible')
				cy.get(returningParticipantCO.password).should('be.visible')
				cy.get(returningParticipantCO.loginButton).should('be.visible')
				cy.get(returningParticipantCO.loginButton).should('be.visible')
			});
			it('should create account', () => {
				returningParticipantCO.createAccount();
				waiverCO.selectWaiverAcceptance(true);
			})
			it('should enter profile details', () => {
				cy.wait(2000)
				flowPO.continue();
				registerPO.fillInMandatoryInformation(data);
				cy.get(registerPO.container).should('be.visible')
			});

			it('should enter user donations and card details', () => {
				flowPO.continue();
				flowPO.continue();

				// Donation
				paymentPO.donate(data.donationAmount);

				// Payment Information
				paymentPO.verifyPaymentFieldsPresent();
				paymentPO.verifyCreditCardIsDisplayed();
				paymentPO.enterCardDetails(data.card);
			});
			it('should verify review information', () => {
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