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
import { EnitytDetails } from "../../../../support/components/entityDetails.co";
import using from "jasmine-data-provider";
import * as specificData from '../../../../data/Pledge/MultiPledgeTeamMemberRegistrationFromTeamPage.json'

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
const entityDetailsCO = new EnitytDetails();

//The calling of functions created in respective Pages
describe('TR(3020) Scenario -> Multi Pledge Join a team from the Join Team button on the team page : ', () => {
	using(events, event => {
		describe(`${event}`, () => {
			before(() => {
				pageSetup.goToEvent(`${event}/${data.URL}`);
				pageSetup.waitForPageLoad()
				generateUniqueName(data);
			});

			after(() => {
				pageSetup.goToEvent(event);
				pageSetup.cleanupPage();
			});

			it('should click on join team button from team page', () => {

				entityDetailsCO.joinTeam();
				registerCO.register(0);

				cy.get(returningParticipantCO.username).should('be.visible')
				cy.get(returningParticipantCO.password).should('be.visible')
				cy.get(returningParticipantCO.loginButton).should('be.visible')
				cy.get(returningParticipantCO.loginButton).should('be.visible')
			});

			it('should enter profile details', () => {
				returningParticipantCO.createAccount();
				waiverCO.selectWaiverAcceptance(true);
				flowPO.continue();
				registerPO.fillInMandatoryInformation(data);
				cy.get(registerPO.container).should('be.visible')
			});
			it('should skip additional participant step', () => {
				flowPO.continue();
				//skip additional participants step
			})
			// it('should enter the CC details', () => {
			// 	flowPO.continue();

			// 	paymentPO.verifyPaymentFieldsPresent();
			// 	paymentPO.verifyCreditCardIsDisplayed();
			// });
			it('should verify profile and payment information', () => {
				flowPO.continue();
				cy.wait(1000)
				flowPO.continue();

				reviewPO.verifyProfileInformation(data);
				reviewPO.verifyNoPaymentInformation();
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