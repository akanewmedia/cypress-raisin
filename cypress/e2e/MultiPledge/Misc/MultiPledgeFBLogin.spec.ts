import { inV3, inFB } from '../../../support/utils/customTesting';
import { PageSetup } from "../../../support/utils/pageSetup";
import { FacebookLoginForm } from "../../../support/pages/External/Facebook/FacebookLoginForm";
import { PledgeRxfNavBarComponent } from "../../../support/components/pledgeRxfNavbar.co";
import { PledgeV3LoginFormComponent } from "../../../support/components/pledgeV3LoginForm.co";
import * as specificData from '../../../data/Pledge/MultiPledgeDonationWhileLoggedInWithPaypal.json'

const using = require('jasmine-data-provider');
let pageSetup: PageSetup = new PageSetup();

const data = pageSetup.getData('Pledge', specificData);
const events = pageSetup.getEvents(pageSetup.getEnvironment().multipledge, data.events);

const fbLoginPO = new FacebookLoginForm();
const navbarCO = new PledgeRxfNavBarComponent();
const pledgeV3LoginCO = new PledgeV3LoginFormComponent();

describe('TR(3002) Scenario -> Multi Pledge log in to Facebook : ', () => {
    using(events, event => {
        describe(`${event}`, () => {
            before(() => {
                //pageSetup.closePopups();
                pageSetup.goToEvent(event);
                pageSetup.waitForPageLoad()
            });
            after(() => {
                pageSetup.goToEvent(event);
                pageSetup.cleanupPage()
                //pageSetup.closePopups();
            });
            it('Should press the login button at the top', () => {
                navbarCO.login();
            });
            inV3('Should press the facebook login button', () => {
                pledgeV3LoginCO.pressFacebookLoginBtn();
            });
            inFB('Should log in to facebook', () => {
                fbLoginPO.bindSelectors();
                fbLoginPO.enterEmail(data);
                fbLoginPO.enterPassword(data);
                fbLoginPO.pressLoginBtn();
            });
            inV3('Should be logged in to FB, and about to log out of FB', () => {
                cy.wait(2000);
                pageSetup.logoutIfLoggedIn();
                cy.wait(2000);
                navbarCO.login();
                cy.wait(2000);
                cy.get(pledgeV3LoginCO.facebookLogoutBtn).should('be.visible')
                pledgeV3LoginCO.pressFacebookLogoutBtn();
            });
        });
    });
});
