//The information regarding the Library
import { PageSetup } from "../../../../support/utils/pageSetup";
import { generateUniqueName } from "../../../../support/utils/actions";
import using  from 'jasmine-data-provider';
import { PayPal } from "../../../../support/pages/External/Paypal/PayPal";
import { FlowPage } from "../../../../support/pages/flow";
import { ThankYouPage } from "../../../../support/pages/Pledge/ThankYouPage";
import { ReviewPage } from "../../../../support/pages/Ticketing/ReviewPage";
import { PaymentPage } from "../../../../support/pages/Pledge/payment";
import { RegisterComponent } from "../../../../support/components/register.co";
import { PledgeNavBarComponent } from "../../../../support/components/pledgeNavBar.co";
import { Waiver } from "../../../../support/components/waiver.co";
import { ReturningParticipant } from "../../../../support/components/returningParticipant.co";
import { inPayPal } from '../../../../support/utils/customTesting';
import { RegisterPage } from "../../../../support/pages/Pledge/register";
import * as specificData from '../../../../data/Pledge/MultiPledgeRegisterAndDonateWithPaypal.json'

//The information regarding the Library
const using = require('jasmine-data-provider');
let pageSetup: PageSetup = new PageSetup();

const data = pageSetup.getData('Pledge', specificData);
const events = pageSetup.getEvents(pageSetup.getEnvironment().multipledge, data.events);

const registerCO = new RegisterComponent();
const paymentPO = new PaymentPage();
const reviewPO = new ReviewPage();
const thankYouPO = new ThankYouPage();

const flowPO = new FlowPage();
const paypalPO = new PayPal()

const registerPO = new RegisterPage();
const navbarCO = new PledgeNavBarComponent();

const returningParticipantCO = new ReturningParticipant()
const waiverCO = new Waiver()

/* use event 16574 */
describe('TR(3007) Scenario -> Multi Pledge registration, and pay reg free using PayPal - with donation: ', () => {
    using(events, event => {
        describe(`${event}`, () => {
            before(() => {
                pageSetup.goToEvent(event);
                pageSetup.waitForPageLoad()
                generateUniqueName(data);
            });
            after(() => {
                pageSetup.cleanupPage()
            });
            it('Should press the register button at the top, then select the location and reg item', () => {
                navbarCO.register();
                cy.get(registerCO.container).should('be.visible')
                registerCO.selectSubEventGroup(data.location);
                registerCO.register(0, 1);
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
            it('should verify and choose PayPal as the payment method', () => {
                flowPO.continue();
                //skip additional participants step
                flowPO.continue();
                paymentPO.pressPaypalBtn();
                flowPO.continue();
            });
            inPayPal('should redirect to PayPal, complete the process and return to the review page', () => {
                cy.wait(3000);
                paypalPO.loginAndPay(data);
                cy.wait(3000);
            });
            it('Should verify the profile and payment information on the review page', () => {
                reviewPO.verifyProfileInformation(data);
                //Verification For Payment details section
                reviewPO.verifyPayPalInformation(data.paypalText);
            });
            it('should submit and then verify the Transaction code', () => {
                flowPO.continue();
                 
            });
        });
    });
});
