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
import using from "jasmine-data-provider";
import * as specificData from '../../../../data/Pledge/RegisterAndModifyAdditionalParticipantsMR.json'

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

const navbarCO = new PledgeNavBarComponent();
const returningParticipantCO = new ReturningParticipant();

/* use event (MR) */
describe('TR(7107) Scenario -> Multi Pledge Modify additional participants: ', () => {
    using(events, event => {
        describe(`${event}`, () => {
            before(() => {
                pageSetup.goToEvent(event);
                generateUniqueName(data);
                generateUniqueName(data.additionalParticipants[0]);
                generateUniqueName(data.additionalParticipants[1]);
                generateUniqueName(data.additionalParticipants[2]);
                generateUniqueName(data.editedData.additionalParticipants[0]);
                generateUniqueName(data.editedData.additionalParticipants[1]);
                generateUniqueName(data.editedData.additionalParticipants[2]);
            });
            after(() => {
                pageSetup.goToEvent(event);
                pageSetup.cleanupPage();
            });
            it('Should press the register button at the top, then select the location and reg item', () => {
                navbarCO.register();
                cy.get(registerCO.container).should('be.visible')
                registerCO.selectSubEventGroup(data.location);
                registerCO.register(0);
            });
            it('Should press the create new account button', () => {
                returningParticipantCO.createAccount();
            });
            it('should enter the participant details', () => {
                cy.wait(2000)
                flowPO.continue();
                registerPO.fillInAccountInformation(data);
                registerPO.fillInProfileAndAddressInformation(data);
            });
            it('should enter the first additional participant details', () => {
                flowPO.continue();
                addParticipantsPO.clickAddParticipantButton();
                cy.wait(1500)
                addParticipantsPO.fillInProfileInformationNoWaiver(data.additionalParticipants[0]);
            });
            it('should enter the second additional participant details', () => {
                addParticipantsPO.clickAddParticipantButton();
                cy.wait(1500)
                addParticipantsPO.fillInProfileInformationNoWaiver(data.additionalParticipants[1]);
            });
            it('should enter the third additional participant details', () => {
                addParticipantsPO.clickAddParticipantButton();
                cy.wait(1500)
                addParticipantsPO.fillInProfileInformationNoWaiver(data.additionalParticipants[2]);
            });
            it('should go past the payment screen (free reg)', () => {
                flowPO.continue();
            });
            it('Should verify the profile, payment and additional participants info on the review page', () => {
                flowPO.continue();
                reviewPO.verifyProfileInformation(data);
                reviewPO.verifyNoPaymentInformation(data.zero);
                reviewPO.verifyAdditionalParticipantsInformation(data);
                reviewPO.verifyAdditionalParticipantsInformation(data, 1, 1);
            });
            it('should go to edit additional participants page when button is clicked', () => {
              reviewPO.editAdditionalParticipants();
              cy.get(addParticipantsPO.container).should('exist')
            });
            it('should update the an additional participant info', () => {
              addParticipantsPO.openAdditionParticipant();
              addParticipantsPO.fillInProfileInformationNoWaiver(data.editedData.additionalParticipants[0]);
            
              addParticipantsPO.openAdditionParticipant(1);
              addParticipantsPO.fillInProfileInformationNoWaiver(data.editedData.additionalParticipants[1]);
         
              flowPO.continue();
              cy.get(reviewPO.review.container).should('exist')
              reviewPO.verifyAdditionalParticipantsInformation(data.editedData);
            
              reviewPO.verifyAdditionalParticipantsInformation(data.editedData, 1, 1);
            });
            it('should submit and then verify the Transaction code', () => {
                flowPO.continue();
                thankYouPO.verifyTransactionNumber(data);
                thankYouPO.verifySuccessfulTransaction(data);
            });
        });
    });
});
