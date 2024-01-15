import { PageSetup } from "../../../../support/utils/pageSetup";
import { RegisterComponent } from "../../../../support/components/register.co";
import { ReviewPage } from "../../../../support/pages/Ticketing/ReviewPage";
import { FlowPage } from "../../../../support/pages/flow";
import { PledgeNavBarComponent } from "../../../../support/components/pledgeNavBar.co";
import { RegisterPage } from "../../../../support/pages/Pledge/register";
import { ReturningParticipant } from "../../../../support/components/returningParticipant.co";
import { ThankYouPage } from "../../../../support/pages/Pledge/ThankYouPage";
import { generateUniqueName, setFocus} from "../../../../support/utils/actions";
import { AdditionalParticipantsPage } from "../../../../support/pages/Pledge/addParticipants";
import using from "jasmine-data-provider";
import * as specificData from '../../../../data/Pledge/MultiPledgeRegisterIndividualFixRepeatedNameEmailMR.json'

//The information regarding the Library
const using = require('jasmine-data-provider');
let pageSetup: PageSetup = new PageSetup();

const data = pageSetup.getData('Pledge', specificData);
const events = pageSetup.getEvents(pageSetup.getEnvironment().multipledge, data.events);
const registerPO = new RegisterPage();
const reviewPO = new ReviewPage();
const thankYouPO = new ThankYouPage();
const flowPO = new FlowPage();

const navbarCO = new PledgeNavBarComponent();
const registerCO = new RegisterComponent();
const returningParticipantCO = new ReturningParticipant();
const addParticipantsPO = new AdditionalParticipantsPage();

/* use event (MR) */
describe('TR(3169) Scenario -> Multi Pledge Individual Registration with Additional Participant (fixing name/email already registered): ', () => {
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
                registerCO.register(0, 0);
            });
            it('Should press the create new account button', () => {
                returningParticipantCO.createAccount();
            });
            it('should enter the participant details', () => {
                cy.wait(5000)
                flowPO.continue();
                registerPO.fillInAccountInformation(data);
                registerPO.fillInProfileAndAddressInformation(data);
                //surveyCO.fill(data);
            });
            it('should enter the additional participant details', () => {
                flowPO.continue();
                addParticipantsPO.clickAddParticipantButton();
                addParticipantsPO.fillInProfileInformationNoWaiver(data.additionalParticipants[0]);
                addParticipantsPO.clickAddParticipantButton();
             
                addParticipantsPO.verifyParticipantAlreadyRegisteredError(data.participantAlreadyRegisteredMessage);
                generateUniqueName(data.additionalParticipants[0]);
                addParticipantsPO.fillInProfileInformationNoWaiver(data.additionalParticipants[0]);
            });
            it('should go past the payment screen (free reg)', () => {
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
