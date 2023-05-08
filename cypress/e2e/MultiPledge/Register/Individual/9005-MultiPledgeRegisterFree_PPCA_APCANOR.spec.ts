import { PageSetup } from "../../../../support/utils/pageSetup";
import { RegisterComponent } from "../../../../support/components/register.co";
import { ReviewPage } from "../../../../support/pages/Ticketing/ReviewPage";
import { FlowPage } from "../../../../support/pages/flow";
import { PledgeNavBarComponent } from "../../../../support/components/pledgeNavbar.co";
import { RegisterPage } from "../../../../support/pages/Pledge/register";
import { ReturningParticipant } from "../../../../support/components/returningParticipant.co";
import { ThankYouPage } from "../../../../support/pages/Pledge/ThankYouPage";
import { generateUniqueName, generateUniqueUsername } from "../../../../support/utils/actions";
import { Waiver } from "../../../../support/components/waiver.co";
import { PaymentPage } from "../../../../support/pages/Pledge/payment";
import { SurveyComponent } from "../../../../support/components/survey.co";
import using from "jasmine-data-provider";
import { AdditionalParticipantsPage } from "../../../../support/pages/Pledge/addParticipants";
import * as specificData from '../../../../data/Pledge/MultiPledgeRegisterFree_PPCA_APCANOR.json'

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
const waiverCO = new Waiver()
const surveyCO = new SurveyComponent();
const paymentPO = new PaymentPage();

const navbarCO = new PledgeNavBarComponent();
const returningParticipantCO = new ReturningParticipant();
const addParticipantsPO = new AdditionalParticipantsPage();


/* use event 16574 */
describe('TR(3009) Scenario -> Multi Pledge free Individual registration: ', () => {
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
                cy.get(registerCO.container).should('be.visible')
                registerCO.selectSubEventGroup(data.location);
                registerCO.register(0, 0);
            });
            it('Should press the create new account button', () => {
                returningParticipantCO.createAccount();
            });
            it('Should accept the waiver', () => {
                waiverCO.selectWaiverAcceptance(true);
            });
            it('should enter the participant details', () => {
                flowPO.continue();
                registerPO.fillInAccountInformation(data);
                registerPO.fillInAllFields(data);
                surveyCO.fill(data.surveyResponses);
            });
            it('should enter the first additional participant details', () => {
                flowPO.continue();
                addParticipantsPO.clickAddParticipantButton();
                cy.wait(1500)
                addParticipantsPO.fillInProfileAndAddressInformation(data.additionalParticipants[0]);
            });
            it('should go to the payment screen (free reg)', () => {
                flowPO.continue();
                paymentPO.donate("5");
                paymentPO.verifyPaymentFieldsPresent();
                paymentPO.verifyCreditCardIsDisplayed();
                paymentPO.cardInformationCO.verifyCCIsRequired();
                paymentPO.clearDonation();
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
