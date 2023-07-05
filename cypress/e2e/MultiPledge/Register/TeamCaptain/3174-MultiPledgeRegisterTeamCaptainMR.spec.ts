//The information regarding the Library
import { CreateTeamComponent } from "../../../../support/components/createTeam.co";
import { PledgeNavBarComponent } from "../../../../support/components/pledgeNavbar.co";
import { RegisterComponent } from "../../../../support/components/register.co";
import { ReturningParticipant } from "../../../../support/components/returningParticipant.co";
import { FlowPage } from "../../../../support/pages/flow";
import { AdditionalParticipantsPage } from "../../../../support/pages/Pledge/addParticipants";

import { RegisterPage } from "../../../../support/pages/Pledge/register";
import { ThankYouPage } from "../../../../support/pages/Pledge/ThankYouPage";
import { ReviewPage } from "../../../../support/pages/Ticketing/ReviewPage";

import { PageSetup } from "../../../../support/utils/pageSetup";
import { generateUniqueName } from "../../../../support/utils/actions";
import * as specificData from '../../../../data/Pledge/MultiPledgeRegisterTeamCaptainMR.json'


//The information regarding the Library
const using = require('jasmine-data-provider');
let pageSetup: PageSetup = new PageSetup();

const data = pageSetup.getData('Pledge', specificData);
const events = pageSetup.getEvents(pageSetup.getEnvironment().multipledge, data.events);


const registerPO = new RegisterPage();
const addParticipantsPO = new AdditionalParticipantsPage();
const reviewPO = new ReviewPage();
const thankYouPO = new ThankYouPage();
const flowPO = new FlowPage();


const navbarCO = new PledgeNavBarComponent();
const registerCO = new RegisterComponent();
const returningParticipantCO = new ReturningParticipant();
const createTeamCO = new CreateTeamComponent();

/* use event (MR) */
describe('TR(3174) Scenario -> Multi Pledge Team Captain Registration with Additional Participant: ', () => {
    using(events, event => {
        describe(`${event}`, () => {
            before(() => {
                pageSetup.goToEvent(event);
                pageSetup.waitForPageLoad()
                //pageSetup.logoutIfLoggedIn();
                generateUniqueName(data);
                generateUniqueName(data.additionalParticipants[0]);
            });
            after(() => {
                pageSetup.goToEvent(event);
                //pageSetup.logoutIfLoggedIn();
                pageSetup.cleanupPage();
            });
            it('Should press the register button at the top, then select the location and reg item', () => {
                navbarCO.register();
                cy.get(registerCO.container).should('be.visible')
                cy.wait(3000)
                registerCO.selectSubEventGroup(data.location);
                registerCO.register(2);
            });
            it('Should press the create new account button', () => {
                returningParticipantCO.createAccount();
            });
            it('should enter the participant details', () => {
                cy.wait(2000)
                //flowPO.continue();
                registerPO.fillInAccountInformation(data);
                registerPO.fillInProfileAndAddressInformation(data);
                // surveyCO.fill(data);
            });
            it('should enter the team details', () => {
                flowPO.continue();
                createTeamCO.fillOutPage(data);
            });
            it('should enter the additional participant details', () => {
                flowPO.continue();
                addParticipantsPO.clickAddParticipantButton();
                addParticipantsPO.fillInProfileInformationNoWaiver(data.additionalParticipants[0]);
            });
            it('should go past the payment screen (free reg)', () => {
                cy.wait(2000)
                flowPO.continue();
            });
            it('Should verify the profile, payment and additional participants info on the review page', () => {
                flowPO.continue();
                reviewPO.verifyProfileInformation(data);
                reviewPO.verifyNoPaymentInformation(data.zero);
                reviewPO.verifyAdditionalParticipantsInformation(data);
            });
            it('should submit and then verify the Transaction code', () => {
                flowPO.continue();
                thankYouPO.verifyTransactionNumber(data);
                thankYouPO.verifySuccessfulTransaction(data);
            });
        });
    });
});
