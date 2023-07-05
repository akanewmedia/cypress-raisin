//The information regarding the Library
import { PageSetup } from "../../../../support/utils/pageSetup";
import { RegisterComponent } from "../../../../support/components/register.co";
import { JoinTeamPage } from "../../../../support/pages/Pledge/joinTeamSearch";
import { PledgeNavBarComponent } from "../../../../support/components/pledgeNavbar.co";
import { ReturningParticipant } from "../../../../support/components/returningParticipant.co";
import { generateUniqueName } from "../../../../support/utils/actions";
import { RegisterPage } from "../../../../support/pages/Pledge/register";
import { FlowPage } from "../../../../support/pages/flow";
import { ReviewPage } from "../../../../support/pages/Ticketing/ReviewPage";
import { ThankYouPage } from "../../../../support/pages/Pledge/ThankYouPage";
import { AdditionalParticipantsPage } from "../../../../support/pages/Pledge/addParticipants";
import * as specificData from '../../../../data/Pledge/MultiPledgeRegisterTeamMemberMR.json'


const using = require('jasmine-data-provider');
let pageSetup: PageSetup = new PageSetup();

const data = pageSetup.getData('Pledge', specificData);
const events = pageSetup.getEvents(pageSetup.getEnvironment().multipledge, data.events);

const registerPO = new RegisterPage();
const navbarCO = new PledgeNavBarComponent();
const registerCO = new RegisterComponent();
const returningParticipantCO = new ReturningParticipant();
const addParticipantsPO = new AdditionalParticipantsPage();
const flowPO = new FlowPage();
const joinTeamSearchPO = new JoinTeamPage();
const reviewPO = new ReviewPage();
const thankYouPO = new ThankYouPage();
let maxTeamReached: boolean;
/* use event (MR) */
describe('TR(3187) Scenario -> Multi Pledge Team Member Registration with Additional Participant: ', () => {
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
                registerCO.selectSubEventGroup(data.location);
                registerCO.register(1);
            });
            it('Should select the team', () => {
                cy.get(joinTeamSearchPO.container).should('be.visible')
                joinTeamSearchPO.search(data.teamname);
            });
            it('Should press the create new account button', () => {
                returningParticipantCO.createAccount();
            });
            it('should enter the participant details', () => {
                registerPO.fillInAccountInformation(data);
                registerPO.fillInProfileAndAddressInformation(data);
            });
            it('should check if can add additional participant details and add if max not reached', () => {
                flowPO.continue();
                maxTeamReached = addParticipantsPO.isMaxTeamMemberReached()
                if (!maxTeamReached) {
                    addParticipantsPO.clickAddParticipantButton();
                    addParticipantsPO.fillInProfileInformationNoWaiver(data.additionalParticipants[0]);
                }
            });
            it('should go past the payment screen (free reg)', () => {
                flowPO.continue();
            });
            it('Should verify the profile, payment and additional participants info on the review page', () => {
                flowPO.continue();
                reviewPO.verifyProfileInformation(data);
                reviewPO.verifyNoPaymentInformation(data.zero);
                if (!maxTeamReached) {
                    reviewPO.verifyAdditionalParticipantsInformation(data);
                }
            });
            it('should submit and then verify the Transaction code', () => {
                flowPO.continue();
                thankYouPO.verifyTransactionNumber(data);
                thankYouPO.verifySuccessfulTransaction(data);
            });
        });
    });
});
