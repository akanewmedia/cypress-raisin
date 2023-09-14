//The information regarding the Library
import { PageSetup } from "../../../../support/utils/pageSetup";
import { generateUniqueName } from "../../../../support/utils/actions";
import using from 'jasmine-data-provider';
import { PledgeNavBarComponent } from "../../../../support/components/pledgeNavBar.co";
import { RegisterComponent } from "../../../../support/components/register.co";
import { Waiver } from "../../../../support/components/waiver.co";
import { ReturningParticipant } from "../../../../support/components/returningParticipant.co";
import { FlowPage } from "../../../../support/pages/flow";
import { RegisterPage } from "../../../../support/pages/Pledge/register";
import { PaymentPage } from "../../../../support/pages/Pledge/payment";
import { ReviewPage } from "../../../../support/pages/Ticketing/ReviewPage";
import { ThankYouPage } from "../../../../support/pages/Pledge/ThankYouPage";
import * as specificData from '../../../../data/Pledge/MultiPledgeRegisterFreeDueToPromoCode.json'

//The information regarding the Library
const using = require('jasmine-data-provider');
let pageSetup: PageSetup = new PageSetup();

const data = pageSetup.getData('Pledge', specificData);
const events = pageSetup.getEvents(pageSetup.getEnvironment().multipledge, data.events);

const navbarCO = new PledgeNavBarComponent();
const registerCO = new RegisterComponent();
const waiverCO = new Waiver()
const returningParticipantCO = new ReturningParticipant();

const flowPO = new FlowPage();
const registerPO = new RegisterPage();
const paymentPO = new PaymentPage();
const reviewPO = new ReviewPage();
const thankYouPO = new ThankYouPage();

/* use event 16574 */
describe('TR(3010) Scenario -> Multi Pledge registration, and pay reg free - with promo code: ', () => {
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
            it('should verify and enter the promo code', () => {
                flowPO.continue();
                // skip additional participant
                flowPO.continue();
                cy.get(paymentPO.registrationFeeDiscountTextContainer).should('not.exist')
                paymentPO.enterRegFeePromoCode(data.promoCode);
                cy.get(paymentPO.registrationFeeDiscountTextContainer).should('be.visible')
                cy.get(paymentPO.registrationFeeDiscountText).should('be.visible')
                paymentPO.verifyRegFeeDiscountAmount(data.totalAfterPromo);
                cy.wait(5000);
                flowPO.continue();
            });
            it('Should verify the profile and payment info on the review page', () => {
                reviewPO.verifyProfileInformation(data);
                reviewPO.verifyNoPaymentInformation(data.zero);
            });
            it('should submit and then verify the Transaction code', () => {
                flowPO.continue();
                thankYouPO.verifyTransactionNumber(data);
            });
        });
    });
});
