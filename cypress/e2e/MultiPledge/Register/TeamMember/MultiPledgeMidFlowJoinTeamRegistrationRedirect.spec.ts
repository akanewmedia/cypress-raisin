//The information regarding the Library
import { PageSetup } from "../../../../support/utils/pageSetup";
import { RegisterComponent } from "../../../../support/components/register.co";
import { ReturningParticipant } from "../../../../support/components/returningParticipant.co";
import { generateUniqueName } from "../../../../support/utils/actions";
import { RegisterPage } from "../../../../support/pages/Pledge/register";
import { FlowPage } from "../../../../support/pages/flow";
import { ReviewPage } from "../../../../support/pages/Ticketing/ReviewPage";
import { ThankYouPage } from "../../../../support/pages/Pledge/ThankYouPage";
import { Waiver } from "../../../../support/components/waiver.co";
import { PaymentPage } from "../../../../support/pages/Pledge/payment";
import { JoinTeamPage } from "../../../../support/pages/Pledge/joinTeamSearch";
import using from "jasmine-data-provider";
import * as specificData from '../../../../data/Pledge/MultiPledgeMidFlowJoinTeamRegistrationRedirect.json'

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
const joinTeamSearchPO = new JoinTeamPage();

//The calling of functions created in respective Pages
describe('Scenario -> Multi Pledge Join a team from a mid-flow redirect : ', () => {
	using(events, event => {
		describe(`${event}`, () => {
			before(() => {
				pageSetup.goToEvent(`${event}/${data.URL}`);
				pageSetup.waitForPageLoad()
				generateUniqueName(data);
				pageSetup.cleanupPage();

			});

			after(() => {
				pageSetup.goToEvent(`${event}/${data.URL}`);
				pageSetup.cleanupPage();
			});

			it('should be redirected to the registration start page and select subevent group and first team reg item', () => {
				registerCO.selectSubEventGroup(data.team.subEventGroupName);
				registerCO.register(1);
				cy.get(joinTeamSearchPO.container).should('be.visible')
			});

			it('should enter profile details', () => {
				joinTeamSearchPO.search(data.team.teamName, 0);
				cy.get(returningParticipantCO.username).should('be.visible')
				cy.get(returningParticipantCO.password).should('be.visible')
				cy.get(returningParticipantCO.loginButton).should('be.visible')
				cy.get(returningParticipantCO.loginButton).should('be.visible')
			});


			it('should enter the participant details', () => {
				returningParticipantCO.createAccount();
				waiverCO.selectWaiverAcceptance(true);
				flowPO.continue();
				registerPO.fillInMandatoryInformation(data);
				cy.get(registerPO.container).should('be.visible')
			});

			it('should enter user profile and card details', () => {
				flowPO.continue(); // skip additional details
				flowPO.continue();
				// paymentPO.verifyPaymentFieldsPresent();
				// paymentPO.verifyCreditCardIsDisplayed();
			});
			it('should verify review information', () => {
				flowPO.continue();

				//Verification for Your Information Section
				reviewPO.verifyProfileInformation(data);
				//Verification For Payment details section
				reviewPO.verifyNoPaymentInformation();
			});

			it('should complete registration', () => {
				flowPO.continue();
				 
			});

			it('should be able to select "start fundraising" and log into the PC', () => {
				thankYouPO.verifiyStartFundraisingIsPresent();
			});
		});
	});
});