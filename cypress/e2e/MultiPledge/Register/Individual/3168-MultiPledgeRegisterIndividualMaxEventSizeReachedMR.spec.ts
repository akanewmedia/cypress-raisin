import { PageSetup } from "../../../../support/utils/pageSetup";
import { RegisterComponent } from "../../../../support/components/register.co";
import { FlowPage } from "../../../../support/pages/flow";
import { PledgeNavBarComponent } from "../../../../support/components/pledgeNavBar.co";
import { RegisterPage } from "../../../../support/pages/Pledge/register";
import { ReturningParticipant } from "../../../../support/components/returningParticipant.co";
import { generateUniqueName, setFocus} from "../../../../support/utils/actions";
import { AdditionalParticipantsPage } from "../../../../support/pages/Pledge/addParticipants";
import { Waiver } from "../../../../support/components/waiver.co";
import using from "jasmine-data-provider";
import * as specificData from '../../../../data/Pledge/MultiPledgeRegisterIndividualMaxEventSizeReachedMR.json'

//The information regarding the Library
const using = require('jasmine-data-provider');
let pageSetup: PageSetup = new PageSetup();

const data = pageSetup.getData('Pledge', specificData);
const events = pageSetup.getEvents(pageSetup.getEnvironment().multipledge, data.events);
const registerPO = new RegisterPage();
const waiverCO = new Waiver()
const flowPO = new FlowPage();

const navbarCO = new PledgeNavBarComponent();
const registerCO = new RegisterComponent();
const returningParticipantCO = new ReturningParticipant();
const addParticipantsPO = new AdditionalParticipantsPage();
/* use event (MR - event size limit) */
describe('TR(3168) Scenario -> Multi Pledge Individual Registration with Additional Participant when event size limit reached: ', () => {
    using(events, event => {
        describe(`${event}`, () => {
            before(() => {
                pageSetup.goToEvent(event);
                generateUniqueName(data);
                generateUniqueName(data.additionalParticipants[0]);
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
            it('should accept the waiver and advance', () => {
                waiverCO.selectWaiverAcceptance(true);
                flowPO.continue();
            });
            it('should enter the participant details', () => {
                cy.wait(2000)
                registerPO.fillInAccountInformation(data);
                registerPO.fillInProfileAddressAndAdditionalInformation(data);
                flowPO.continue();                   
            });
            it('should enter the additional participant details, and see the max event size reached message', () => {
                
                addParticipantsPO.clickAddParticipantButton();
                addParticipantsPO.fillInProfileInformationNoWaiver(data.additionalParticipants[0]);                
                // Reaching max will hide the fields and add buttons so there is only verifying the error message on this step            
                addParticipantsPO.verifyMaxEventParticipantsReachedError(data.maxEventParticipantsReachedMessage);
            });
            // it('should go past the payment screen (free reg)', () => {
            //     flowPO.continue();
            // });
            // In this test case, we don't submit the transaction not to include participants in this event.
            // By not completing the transaction, this event size limit will never be reached, and this test
            // can be reused without the need of editing the event on Admin
        });
    });
});
