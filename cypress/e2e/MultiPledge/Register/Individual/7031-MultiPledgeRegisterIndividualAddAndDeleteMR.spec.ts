
import { PageSetup } from "../../../../support/utils/pageSetup";
import { RegisterComponent } from "../../../../support/components/register.co";
import { ReviewPage } from "../../../../support/pages/Ticketing/ReviewPage";
import { FlowPage } from "../../../../support/pages/flow";
import { PledgeNavBarComponent } from "../../../../support/components/pledgeNavbar.co";
import { RegisterPage } from "../../../../support/pages/Pledge/register";
import { ReturningParticipant } from "../../../../support/components/returningParticipant.co";
import { ThankYouPage } from "../../../../support/pages/Pledge/ThankYouPage";
import { generateUniqueName } from "../../../../support/utils/actions";
import { AdditionalParticipantsPage } from "../../../../support/pages/Pledge/addParticipants";
import { SurveyComponent } from "../../../../support/components/survey.co";
import using from "jasmine-data-provider";
import * as specificData from '../../../../data/Pledge/MultiPledgeRegisterIndividualMR.json'

//The information regarding the Library
const using = require('jasmine-data-provider');
let pageSetup: PageSetup = new PageSetup();

const data = pageSetup.getData('Pledge', specificData);
const events = pageSetup.getEvents(pageSetup.getEnvironment().multipledge, data.events);
const registerPO = new RegisterPage();
const registerCO = new RegisterComponent();
const reviewPO = new ReviewPage();
const thankYouPO = new ThankYouPage();
const flowPO = new FlowPage();
const addParticipantsPO = new AdditionalParticipantsPage();
const surveyCO = new SurveyComponent

const navbarCO = new PledgeNavBarComponent();
const returningParticipantCO = new ReturningParticipant();


/* use event (MR) */
describe('TR(7031) Scenario -> Multi Pledge Individual Registration with Additional Participant including Accordion and deletion functionality: ', () => {
    using(events, event => {
        describe(`${event}`, () => {
            before(() => {
                pageSetup.goToEvent(event);
                generateUniqueName(data);
                generateUniqueName(data.additionalParticipants[0]);
                generateUniqueName(data.additionalParticipants[1]);
                generateUniqueName(data.additionalParticipants[2]);
            });
            after(() => {
                pageSetup.goToEvent(event);
                pageSetup.cleanupPage();
            });
            it('Should press the register button at the top, then select the location and reg item', () => {
                navbarCO.register();
                cy.get(registerCO.container).should('be.visible')
                registerCO.selectSubEventGroup(data.location);
                registerCO.register(0, 0);
            });
            it('Should press the create new account button', () => {
                returningParticipantCO.createAccount();
            });

            it('should enter the participant details', () => {
                cy.wait(3000)
                //flowPO.continue();
                registerPO.fillInAccountInformation(data);
                registerPO.fillInProfileAndAddressInformation(data);
            });
            it('should enter the additional participant details', () => {
                flowPO.continue();
                addParticipantsPO.clickAddParticipantButton();
                addParticipantsPO.fillInProfileInformationNoWaiver(data.additionalParticipants[0]);
            });
            it('should enter the second additional participant details', () => {
                addParticipantsPO.clickAddParticipantButton();
                cy.wait(2000)
                addParticipantsPO.fillInProfileInformationNoWaiver(data.additionalParticipants[1]);
            });
            it('should enter the third additional participant details', () => {
                addParticipantsPO.clickAddParticipantButton();
                cy.wait(2000)
                addParticipantsPO.fillInProfileInformationNoWaiver(data.additionalParticipants[2]);
            });
            it('should open first tab, delete second participant and cancel deletion', () => {
                //addParticipantsPO.openAdditionParticipant();
                addParticipantsPO.cancelDelete(1);
                //addParticipantsPO.removeParticipant(2);
            });
            it('should delete second participant and confirm deletion', () => {
                addParticipantsPO.confirmDelete(1);
                //addParticipantsPO.removeParticipant(2);
            });
            it('should go past the payment screen (free reg)', () => {
                flowPO.continue();
            });
            it('Should verify the profile on the review page', () => {
                flowPO.continue();
                reviewPO.verifyProfileInformation(data);
            });
            it('should verify no payment information on the review page', () => {
                reviewPO.verifyNoPaymentInformation(data.zero);
            });
            it('should verify first additional participant information on the review page', () => {
                reviewPO.verifyAdditionalParticipantsInformation(data);
            });
            it('should verify second additional participant information on the review page', () => {
                reviewPO.verifyAdditionalParticipantsInformation(data, 2, 1);
            });
            it('should submit and then verify the Transaction code', () => {
                flowPO.continue();
                thankYouPO.verifyTransactionNumber(data);
                thankYouPO.verifySuccessfulTransaction(data);
            });
        });
    });
});
