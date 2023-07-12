//The information regarding the Library
import { PageSetup } from "../../../../support/utils/pageSetup";
import { RegisterComponent } from "../../../../support/components/register.co";
import { ReturningParticipant } from "../../../../support/components/returningParticipant.co";
import { generateUniqueName } from "../../../../support/utils/actions";
import { RegisterPage } from "../../../../support/pages/Pledge/register";
import { FlowPage } from "../../../../support/pages/flow";
import { ReviewPage } from "../../../../support/pages/Ticketing/ReviewPage";
import { ThankYouPage } from "../../../../support/pages/Pledge/ThankYouPage";
import { PaymentPage } from "../../../../support/pages/Pledge/payment";
import { JoinTeamPage } from "../../../../support/pages/Pledge/joinTeamSearch";
import { PledgeNavBarComponent } from "../../../../support/components/pledgeNavbar.co";
import { SurveyComponent } from "../../../../support/components/survey.co";
import using from "jasmine-data-provider";
import * as specificData from '../../../../data/Pledge/MultiPledgeTeamMemberRegistrationFundraisingMin.json'

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
const paymentPO = new PaymentPage();
const joinTeamSearchPO = new JoinTeamPage();
const navbarCO = new PledgeNavBarComponent();
const surveyCO = new SurveyComponent();

//The calling of functions created in respective Pages
describe('TR(3021) Scenario -> Multi Pledge Team Member Registration - fundraising min: ', () => {
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
				navbarCO.register();
				cy.get(registerCO.container).should('be.visible')
				registerCO.selectSubEventGroup(data.location);
				registerCO.register(1, 1);
				cy.get(joinTeamSearchPO.container).should('be.visible')
				joinTeamSearchPO.search(data.team.teamName, 0);
				cy.get(returningParticipantCO.username).should('be.visible')
				cy.get(returningParticipantCO.password).should('be.visible')
				cy.get(returningParticipantCO.loginButton).should('be.visible')
				cy.get(returningParticipantCO.loginButton).should('be.visible')
			});
			it('should enter fill out the profile with a fundraising goal below the min, then fix it', () => {
				returningParticipantCO.createAccount();

				registerPO.fillInAccountInformationAndFund(data);
				registerPO.fillInProfileAddressAndAdditionalInformation(data);
				surveyCO.fill(data.surveyResponses);

				flowPO.continue();
				cy.get(registerPO.container).should('be.visible')
				registerPO.accountInformationCO.enterGoal(data.account.fundraisingGoal2);
			});
			it('should skip additional participants', () => {
				// skip additional participants
				flowPO.continue();
			});
			it('should add payment details', () => {
				flowPO.continue();
				paymentPO.verifyPaymentFieldsPresent();
				paymentPO.verifyCreditCardIsDisplayed();
			})
			it('should verify the payment details', () => {
				paymentPO.enterCardDetails(data.card);
				flowPO.continue();
				reviewPO.verifyProfileInformation(data);
				reviewPO.verifyPaymentInformation(data.card);
			});

			it('should complete registration', () => {
				flowPO.continue();
				thankYouPO.verifyTransactionNumber(data);
			});
		});
	});
});
