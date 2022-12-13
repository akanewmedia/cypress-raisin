import { PageSetup } from "../../../support/utils/pageSetup";
import { RegisterComponent } from "../../../support/components/register.co";
import { FlowPage } from "../../../support/pages/flow";
import { PledgeNavBarComponent } from "../../../support/components/pledgeNavbar.co";
import { RegisterPage } from "../../../support/pages/Pledge/register";
import { ReturningParticipant } from "../../../support/components/returningParticipant.co";
import { generateUniqueName } from "../../../support/utils/actions";
import { ReviewPage } from "../../../support/pages/Ticketing/ReviewPage";
import { Waiver } from "../../../support/components/waiver.co";
import { JoinTeamPage } from "../../../support/pages/Pledge/joinTeamSearch";
import { PaymentPage } from "../../../support/pages/Pledge/payment";
import * as specificData from '../../../data/Pledge/MultiPledgeRegItemByGroupRegisterFree.json'


//The information regarding the Library
const using = require('jasmine-data-provider');
let pageSetup: PageSetup = new PageSetup();

const data = pageSetup.getData('Pledge', specificData);
const events = pageSetup.getEvents(pageSetup.getEnvironment().multipledge, data.events);
const registerPO = new RegisterPage();
const flowPO = new FlowPage();

const navbarCO = new PledgeNavBarComponent();
const registerCO = new RegisterComponent();
const returningParticipantCO = new ReturningParticipant();
const reviewPO = new ReviewPage();
const waiverCO = new Waiver();
const joinTeamSearchPO = new JoinTeamPage();
const paymentPO = new PaymentPage();

//The calling of functions created in respective Pages
describe('TR(9027) Scenario -> Multi Pledge Team Member Registration: ', () => {
	using(events, event => {
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

			it('should go to the register page and reg items should not be present', () => {
                navbarCO.register();
                cy.get(registerCO.container).should('be.visible')
                cy.get(registerCO.registrationTypeContainer).should('not.exist')
            });
            it('should select a SubEventGroup and reg items should be present', () => {
                registerCO.selectSubEventGroup(data.location);
                cy.wait(1000);
                cy.get(registerCO.registrationTypeContainer).should('exist')
            });
			it('should select a join team registration, search for the team and click on Join button', () => {
				registerCO.register(1, 1);
				cy.get(joinTeamSearchPO.container).should('be.visible')
				joinTeamSearchPO.search(data.teamname, 0);

				returningParticipantCO.createAccount();
				waiverCO.verifyWaiverIsDisplayed();
			});
			it('should accept the waiver', () => {
				waiverCO.selectWaiverAcceptance(true);
			});
			it('should enter the participant details', () => {
				flowPO.continue();
				registerPO.fillInAccountInformation(data);
				registerPO.fillInProfileAndAddressInformation(data);
			});

			it('should enter user profile and card details', () => {
				flowPO.continue();
				//skip additional participants step
				cy.wait(1000)
				flowPO.continue();				
			});

			it('should got to review page and verify data', () => {
				flowPO.continue();

				//Verification for Your Information Section
				reviewPO.verifyProfileInformation(data);
				//Verification For Payment details section
				reviewPO.verifyNoPaymentInformation(data.zero);
			});
		});
	});
});