import { PageSetup } from "../../../support/utils/pageSetup";
import { RegisterComponent } from "../../../support/components/register.co";
import { FlowPage } from "../../../support/pages/flow";
import { PledgeNavBarComponent } from "../../../support/components/pledgeNavbar.co";
import { RegisterPage } from "../../../support/pages/Pledge/register";
import { ReturningParticipant } from "../../../support/components/returningParticipant.co";
import { generateUniqueName } from "../../../support/utils/actions";
import { ReviewPage } from "../../../support/pages/Ticketing/ReviewPage";
import { Waiver } from "../../../support/components/waiver.co";
import { SurveyComponent } from "../../../support/components/survey.co";
import { CreateTeamComponent } from "../../../support/components/createTeam.co";
import { PaymentPage } from "../../../support/pages/Pledge/payment";
import { TransactionFailed } from "../../../support/pages/Pledge/transactionFailed";
import { ThankYouPage } from "../../../support/pages/Pledge/ThankYouPage";
import { AdditionalParticipantsPage } from "../../../support/pages/Pledge/addParticipants";
import * as specificData from '../../../data/Pledge/MultiPledgeRegItemByGroupRegisterFree.json'


//The information regarding the Library
const using = require('jasmine-data-provider');
let pageSetup: PageSetup = new PageSetup();

const data = pageSetup.getData('Pledge', specificData);
const events = pageSetup.getEvents(pageSetup.getEnvironment().multipledge, data.events);
const registerPO = new RegisterPage();
const flowPO = new FlowPage();

const navbarCO = new PledgeNavBarComponent();
const registerCO = new RegisterComponent();
const returningParticipantCO = new ReturningParticipant();
const reviewPO = new ReviewPage();
const waiverCO = new Waiver();
const surveyCO = new SurveyComponent();
const createTeamCO = new CreateTeamComponent();
const paymentPO = new PaymentPage();
const transactionFailedPO = new TransactionFailed();
const thankYouPO = new ThankYouPage();
const addParticipantsPO = new AdditionalParticipantsPage();

/* use event 17573 */
// TODO: Need to get the supoort merged into donations then I can fix this
describe('TR(9029) Scenario -> Multi Pledge > RXF > Select Group > Captain Registration > Add Additional Participant > Failed CC > Correct & Success ', () => {
    using(events, event => {
        describe(`${event}`, () => {
            before(() => {
                pageSetup.goToEvent(event);
                pageSetup.waitForPageLoad();
                generateUniqueName(data);
                generateUniqueName(data.additionalParticipants[0]);
            });
            after(() => {
                pageSetup.goToEvent(event);
                pageSetup.cleanupPage();
            });

            it('should go to the register page and reg items should not be present', () => {
                navbarCO.register();
                cy.get(registerCO.container).should('be.visible')
                cy.get(registerCO.registrationTypeContainer).should('not.exist')
            });
            it('should select a SubEventGroup and reg items should be present', () => {
                registerCO.selectSubEventGroup(data.location);
                cy.wait(1000);
                cy.get(registerCO.registrationTypeContainer).should('exist')
            });
            it('should select a free registration and press the create new account button', () => {
                registerCO.register(2, 0);
                returningParticipantCO.createAccount();
                waiverCO.verifyWaiverIsDisplayed();
            });
            it('should accept the waiver', () => {
                waiverCO.selectWaiverAcceptance(true);
            });
            it('should enter the participant details', () => {
                flowPO.continue();
                registerPO.fillInAccountInformation(data);
                registerPO.fillInProfileAndAddressInformation(data);
            });
            it('should enter the team details', () => {
                flowPO.continue();
                createTeamCO.fillOutPageNoPassword(data);

                // after filling out each survey question we try to press continue
                // it should not advance to the next screen
                surveyCO.fill(data.teamCaptainSurveyResponses);
            });
            it('should enter the additional participant details', () => {
                flowPO.continue();
                addParticipantsPO.clickAddParticipantButton();
                addParticipantsPO.fillInProfileInformation(data.additionalParticipants[0]);
            });
            it('should go to payment and enter CC detail', () => {
                flowPO.continue();
                paymentPO.verifyPaymentFieldsPresent();
                paymentPO.verifyCreditCardIsDisplayed();
                paymentPO.verifyRegFeeAmount(data.totalRegAmount);
                paymentPO.enterCardDetails(data.cardInfo);
                flowPO.continue();
                //Verification for Your Information Section
                reviewPO.verifyProfileInformation(data);
                //Verification For Payment details section
                reviewPO.verifyPaymentInformation(data.cardInfo);
                //Verification for Amount Section
                reviewPO.verifyTotalAmount(data.totalRegAmount);
            });
            it('should fail the transaction and reenter the payment details', () => {
                flowPO.continue();
                //Validate it failed
                transactionFailedPO.verifyTransactionFailed();
                transactionFailedPO.goBackToReview();
                // Go back one 
                reviewPO.verifyProfileInformation(data);
                //Verification For Payment details section
                reviewPO.verifyPaymentInformation(data.failedCard);
                reviewPO.editPaymentInfo();
                paymentPO.enterCardDetails(data.validCard);
                flowPO.continue();
                //Verification for Your Information Section
                reviewPO.verifyProfileInformation(data);
                //Verification For Payment details section
                reviewPO.verifyPaymentInformation(data.validCard);
                //Verification for Amount Section
                reviewPO.verifyTotalAmount(data.totalRegAmount);
            });
            it('should submit and then verify the Transaction code', () => {
                flowPO.continue();
                thankYouPO.verifyTransactionNumber(data);
                thankYouPO.verifySuccessfulTransaction(data);
            });
        });
    });
});
