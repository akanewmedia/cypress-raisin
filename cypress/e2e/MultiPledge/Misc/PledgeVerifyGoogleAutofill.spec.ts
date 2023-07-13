import { PageSetup } from "../../../support/utils/pageSetup";
import { RegisterComponent } from "../../../support/components/register.co";
import { PledgeNavBarComponent } from "../../../support/components/pledgeNavbar.co";
import { RegisterPage } from "../../../support/pages/Pledge/register";
import { ReturningParticipant } from "../../../support/components/returningParticipant.co";
import { generateUniqueName} from "../../../support/utils/actions";
import using from "jasmine-data-provider";
import * as specificData from '../../../data/Pledge/MultiPledgeRegisterIndividualMR.json'

//The information regarding the Library
const using = require('jasmine-data-provider');
let pageSetup: PageSetup = new PageSetup();

const data = pageSetup.getData('Pledge', specificData);
const events = pageSetup.getEvents(pageSetup.getEnvironment().multipledge, data.events);
const registerPO = new RegisterPage();

const navbarCO = new PledgeNavBarComponent();
const registerCO = new RegisterComponent();
const returningParticipantCO = new ReturningParticipant();

/* use event (MR) */
describe('Verify Google Autofill ', () => {
    using(events, event => {
        describe(`${event}`, () => {
            before(() => {
                pageSetup.goToEvent(event);
                pageSetup.waitForPageLoad()
                generateUniqueName(data);
                generateUniqueName(data.additionalParticipants[0]);
            });
            after(() => {
                pageSetup.goToEvent(event);
                pageSetup.cleanupPage();
            });
            it('Should press the register button at the top, then select the location and reg item', () => {
                navbarCO.register();
                cy.get(registerCO.container)
                registerCO.selectSubEventGroup(data.location);
                registerCO.register(0, 0);
            });
            it('Should press the create new account button', () => {
                returningParticipantCO.createAccount();
            });
            it('should enter the participant details', () => {                
                registerPO.verifyGoogleAutofill(data)                
            });            
        });
    });
});
