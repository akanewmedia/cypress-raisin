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
import { PledgeNavBarComponent } from "../../../../support/components/pledgeNavbar.co";
import using from "jasmine-data-provider";
import * as specificData from '../../../../data/Pledge/MultiPledgeTeamMemberRegistration.json'

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
const navbarCO = new PledgeNavBarComponent();

//The calling of functions created in respective Pages
describe('TR(3019) Scenario -> Multi Pledge Team Member Registration: ', () => {
	using(events, event => {
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

			it('should enter user profile and card details', () => {
				returningParticipantCO.createAccount();

				waiverCO.selectWaiverAcceptance(true);
				flowPO.continue();

				registerPO.fillInMandatoryInformation(data);
				registerPO.profileInformationCO.selectGender(data.gender);

				flowPO.continue();
				//skip additional participants step

				flowPO.continue();
				paymentPO.verifyPaymentFieldsPresent();
				paymentPO.verifyCreditCardIsDisplayed();
				paymentPO.verifyTotalAmount(data.total);
				paymentPO.enterCardDetails(data.card);

			});
			it('should verify review information', () => {
				flowPO.continue();
				//Verification for Your Information Section
				reviewPO.verifyProfileInformation(data);
				//Verification For Payment details section
				reviewPO.verifyPaymentInformation(data.card);
				//Verification for Amount Section
				reviewPO.verifyTotalAmount(data.totalAmountWithRegFee);
			});

			it('should complete registration', () => {
				flowPO.continue();
				thankYouPO.verifyTransactionNumber(data);
			});
		});
	});
});