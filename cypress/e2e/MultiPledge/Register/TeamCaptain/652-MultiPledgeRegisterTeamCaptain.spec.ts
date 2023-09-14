//The information regarding the Library
import { PledgeNavBarComponent } from "../../../../support/components/pledgeNavBar.co";
import { RegisterComponent } from "../../../../support/components/register.co";
import { ReturningParticipant } from "../../../../support/components/returningParticipant.co";
import { FlowPage } from "../../../../support/pages/flow";
import { RegisterPage } from "../../../../support/pages/Pledge/register";
import { ThankYouPage } from "../../../../support/pages/Pledge/ThankYouPage";
import { ReviewPage } from "../../../../support/pages/Ticketing/ReviewPage";
import { PageSetup } from "../../../../support/utils/pageSetup";
import { generateUniqueName } from "../../../../support/utils/actions";
import { Waiver } from "../../../../support/components/waiver.co";
import { PaymentPage } from "../../../../support/pages/Pledge/payment";
import { CreateTeamComponent } from "../../../../support/components/createTeam.co";
import using from "jasmine-data-provider";
import * as specificData from '../../../../data/Pledge/MultiPledgeRegisterTeamCaptain.json'


//The information regarding the Library
const using = require('jasmine-data-provider');
let pageSetup: PageSetup = new PageSetup();

const data = pageSetup.getData('Pledge', specificData);
const events = pageSetup.getEvents(pageSetup.getEnvironment().multipledge, data.events);

const registerPO = new RegisterPage();
const reviewPO = new ReviewPage();
const thankYouPO = new ThankYouPage();
const flowPO = new FlowPage();
const waiverCO = new Waiver()
const paymentPO = new PaymentPage();
const navbarCO = new PledgeNavBarComponent();
const registerCO = new RegisterComponent();
const returningParticipantCO = new ReturningParticipant();
const createTeamCO = new CreateTeamComponent();

/* use event 16574 */
describe('TR(652) Scenario -> Multi Pledge registration, create team', () => {
    using(events, event => {
        describe(`${event}`, () => {
            before(() => {
                pageSetup.goToEvent(event);
                pageSetup.waitForPageLoad()
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
                registerCO.register(2);
            });
            it('Should press the create new account button', () => {
                returningParticipantCO.createAccount();
            });
            it('Should accept the waiver', () => {
                waiverCO.selectWaiverAcceptance(true);
            });
            it('should enter the participant details', () => {
                flowPO.continue();
                registerPO.fillInMandatoryInformation(data);
            });
            it('should enter the team details', () => {
                flowPO.continue();
                createTeamCO.fillOutPage(data);
            });
            it('should enter the payment details', () => {
                flowPO.continue();
                flowPO.continue();
                // Adding the wait above, because the test tends to fail at this point.
                // It seems there is something happening when the loading overlay
                // is displayed, and causes the checks inside [paymentPO.verifyPaymentFieldsPresent] to fail.
                paymentPO.verifyPaymentFieldsPresent();
                paymentPO.verifyCreditCardIsDisplayed();
                paymentPO.enterCardDetails(data.card);
            });
            it('should verify the payment details', () => {
                flowPO.continue();
                reviewPO.verifyProfileInformation(data);
                reviewPO.verifyPaymentInformation(data.card);
                reviewPO.verifyTotalAmount(data.total);
            });
            it('should display thank you page and the participant centre', function () {
                flowPO.continue();
                thankYouPO.verifyTransactionNumber(data);
            });
        });
    });
});