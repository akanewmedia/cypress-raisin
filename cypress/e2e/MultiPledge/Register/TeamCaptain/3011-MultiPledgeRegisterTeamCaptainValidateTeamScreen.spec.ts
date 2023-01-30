//The information regarding the Library
import { PledgeNavBarComponent } from "../../../../support/components/pledgeNavbar.co";
import { RegisterComponent } from "../../../../support/components/register.co";
import { ReturningParticipant } from "../../../../support/components/returningParticipant.co";
import { FlowPage } from "../../../../support/pages/flow";

import { RegisterPage } from "../../../../support/pages/Pledge/register";
import { ThankYouPage } from "../../../../support/pages/Pledge/ThankYouPage";
import { ReviewPage } from "../../../../support/pages/Ticketing/ReviewPage";
import { PageSetup } from "../../../../support/utils/pageSetup";
import { generateUniqueName } from "../../../../support/utils/actions";
import { PaymentPage } from "../../../../support/pages/Pledge/payment";
import { CreateTeamComponent } from "../../../../support/components/createTeam.co";
import { SurveyComponent } from "../../../../support/components/survey.co";
import using from "jasmine-data-provider";
import * as specificData from '../../../../data/Pledge/MultiPledgeRegisterTeamCaptainValidateTeamScreen.json'


//The information regarding the Library
const using = require('jasmine-data-provider');
let pageSetup: PageSetup = new PageSetup();

const data = pageSetup.getData('Pledge', specificData);
const events = pageSetup.getEvents(pageSetup.getEnvironment().multipledge, data.events);

const registerPO = new RegisterPage();
const reviewPO = new ReviewPage();
const thankYouPO = new ThankYouPage();
const flowPO = new FlowPage();
const paymentPO = new PaymentPage();
const navbarCO = new PledgeNavBarComponent();
const registerCO = new RegisterComponent();
const returningParticipantCO = new ReturningParticipant();
const createTeamCO = new CreateTeamComponent();
const surveyCO = new SurveyComponent();


/* use event 17560 */
describe('TR(3011) Scenario -> Multi Pledge registration, create team - validate team screen', () => {
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
            it('Should press the register button at the top, then select the location and reg item', () => {
                navbarCO.register();
				cy.get(registerCO.container).should('be.visible')
                registerCO.selectSubEventGroup(data.location);
                registerCO.register(2, 1);
            });
            it('Should press the create new account button', () => {
                returningParticipantCO.createAccount();
            });
            it('Should enter the participant details', () => {
                cy.wait(2000)
                registerPO.fillInAccountInformation(data);
                registerPO.fillInProfileAddressAndAdditionalInformation(data);
                surveyCO.fill(data.surveyResponses);
            });
            it('Should Verify Goal validation and fill out the fundraising goal above the min', () => {
                flowPO.continue();
                registerPO.accountInformationCO.enterGoal(data.account.fundraisingGoal2);
            });
            it('should fill out the team with a fundraising goal below the min and survey', () => {
                flowPO.continue();
                createTeamCO.fillOutPage(data);

                // after filling out each survey question we try to press continue
                // it should not advance to the next screen
                cy.get(createTeamCO.container).should('be.visible')
                surveyCO.fill(data.teamCaptainSurveyResponses);
            });
            it('should fix the team fundraising goal', () => {
                flowPO.continue();
                cy.get(createTeamCO.container).should('be.visible')
                createTeamCO.enterGoal(data.team.goal2);
                flowPO.continue();
            });
            it('should enter the payment details', () => {
                // Skip additional participants
                flowPO.continue();
                paymentPO.verifyPaymentFieldsPresent();
                paymentPO.enterCardDetails(data.card);
            });
            it('should verify the profile and payment details', () => {
                flowPO.continue();
                reviewPO.verifyProfileInformation(data);
                reviewPO.verifyPaymentInformation(data.card);
            });
            it('should display thank you page', () => {
                flowPO.continue();
                thankYouPO.verifyTransactionNumber(data);
            });
        });
    });
});