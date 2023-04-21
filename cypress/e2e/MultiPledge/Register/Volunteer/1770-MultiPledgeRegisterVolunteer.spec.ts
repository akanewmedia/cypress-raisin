//The information regarding the Library
import { PageSetup } from "../../../../support/utils/pageSetup";
import { RegisterPage } from "../../../../support/pages/Pledge/register";
import { FlowPage } from "../../../../support/pages/flow";
import { VolunteerThankYouPage } from "../../../../support/pages/Pledge/VolunteerThankYouPage";
import { PledgeRxfNavBarComponent } from "../../../../support/components/pledgeRxfNavbar.co";
import { RegisterComponent } from "../../../../support/components/register.co";
import using from "jasmine-data-provider";
import * as specificData from '../../../../data/Pledge/MultiPledgeRegisterVolunteer.json'

const using = require('jasmine-data-provider');
let pageSetup: PageSetup = new PageSetup();

const data = pageSetup.getData('Pledge', specificData);
const events = pageSetup.getEvents(pageSetup.getEnvironment().multipledge, data.events);

const registerPO = new RegisterPage();
const flowPO = new FlowPage();
const thankYouPO = new VolunteerThankYouPage();
const navbarCO = new PledgeRxfNavBarComponent();
const registerCO = new RegisterComponent();

/* use event 16574 */
describe('TR(1770) Scenario -> Multi Pledge registration, volunteer', () => {
    using(events, event => {
        describe(`${event}`, () => {
            before(() => {
                pageSetup.goToEvent(event);
                pageSetup.waitForPageLoad()                
            });
            after(() => {
                pageSetup.goToEvent(event);
                pageSetup.cleanupPage();
            });
            it('Should go to the volunteer registration page', () => {
                navbarCO.clickOnVolunteerMenuItem();
            });
            it('Should fill out the required volunteer registration', () => {
                cy.wait(1500)
                flowPO.continue();
                registerCO.selectSubEventGroup(data.location);
                registerPO.fillInProfileInformation(data);
                registerPO.fillInAddressInformation(data);                
            });
            it('Should submit the volunteer registration', () => {
                flowPO.continue();
                thankYouPO.checkSuccessful(data);
            });
        });

        // describe(`${event}`, () => {
        //     before(() => {
        //         pageSetup.goToEvent(event);
        //         pageSetup.waitForPageLoad()
        //     });
        //     after(() => {
        //         pageSetup.goToEvent(event);
        //         pageSetup.cleanupPage();
        //     });
        //     it('Should go to the volunteer registration page', () => {
        //         navbarCO.clickOnVolunteerMenuItem();
        //     });
        //     it('Should fill out the full volunteer registration form', () => {
        //         cy.wait(1500)
        //         flowPO.continue();
        //         registerCO.selectSubEventGroup(data.location);
        //         registerPO.fillInAllProfileInformation(data);
        //         registerPO.fillInAllAddressInformation(data);
        //     });
        //     it('Should submit the volunteer registration', () => {
        //         thankYouPO.getConstituent()
        //         flowPO.continue();
        //         thankYouPO.checkSuccessful(data);
        //     });
        // });
    });
});