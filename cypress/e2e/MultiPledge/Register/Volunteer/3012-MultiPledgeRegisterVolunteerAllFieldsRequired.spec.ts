//The information regarding the Library
import { PageSetup } from "../../../../support/utils/pageSetup";
import { RegisterPage } from "../../../../support/pages/Pledge/register";
import { FlowPage } from "../../../../support/pages/flow";
import { VolunteerThankYouPage } from "../../../../support/pages/Pledge/VolunteerThankYouPage";
import { PledgeRxfNavBarComponent } from "../../../../support/components/pledgeRxfNavbar.co";
import { RegisterComponent } from "../../../../support/components/register.co";
import { SurveyComponent } from "../../../../support/components/survey.co";
import using from "jasmine-data-provider";
import * as specificData from '../../../../data/Pledge/MultiPledgeRegisterVolunteerAllFieldsRequired.json'



//The information regarding the Library
let pageSetup: PageSetup = new PageSetup();

const data = pageSetup.getData('Pledge', specificData);
const events = pageSetup.getEvents(pageSetup.getEnvironment().multipledge, data.events);

const registerPO = new RegisterPage();
const flowPO = new FlowPage();
const thankYouPO = new VolunteerThankYouPage();
const navbarCO = new PledgeRxfNavBarComponent();
const registerCO = new RegisterComponent();
const surveyCO = new SurveyComponent();


/* use event 17560 */
describe('TR(3012) Scenario -> Multi Pledge registration, volunteer - all fields required', () => {
    using(events, event => {
        describe(`${event}`, () => {
            before(() => {
                pageSetup.goToEvent(event);
                //pageSetup.logoutIfLoggedIn();
            });
            after(() => {
                pageSetup.goToEvent(event);
                //pageSetup.logoutIfLoggedIn();
                pageSetup.cleanupPage();
            });
            it('Should go to the volunteer registration page', () => {
                navbarCO.clickOnVolunteerMenuItem();
            });
            it('Should fill out the full volunteer registration form', () => {
                registerCO.selectSubEventGroup(data.location);
                registerPO.fillInProfileAddressAndAdditionalInformation(data);
                surveyCO.fill(data.surveyResponses);
            });
            it('Should submit the volunteer registration', () => {
                flowPO.continue();
                thankYouPO.checkSuccessful(data);
            });
        });
    });
});