import { PageSetup } from "../../../../support/utils/pageSetup";
import { RegisterComponent } from "../../../../support/components/register.co";
import { PaymentPage } from "../../../../support/pages/Pledge/payment";
import { ReviewPage } from "../../../../support/pages/Ticketing/ReviewPage";
import { FlowPage } from "../../../../support/pages/flow";
import { PledgeNavBarComponent } from "../../../../support/components/pledgeNavBar.co";
import { RegisterPage } from "../../../../support/pages/Pledge/register";
import { SurveyComponent } from "../../../../support/components/survey.co";
import { ReturningParticipant } from "../../../../support/components/returningParticipant.co";
import { ThankYouPage } from "../../../../support/pages/Pledge/ThankYouPage";
import { generateUniqueName, getLocalDateTime, pressEsc, pressTab, scrollToElement, setCustomAttribute, setFocus, waitForElementToBeVisible } from "../../../../support/utils/actions";
import * as specificData from '../../../../data/Pledge/SinglePledgeRegisterAllFieldsRequired.json'

//The information regarding the Library
const using = require('jasmine-data-provider');
let pageSetup: PageSetup = new PageSetup();

const data = pageSetup.getData('Pledge', specificData);
const events = pageSetup.getEvents(pageSetup.getEnvironment().singlepledge, data.events);
const registerPO = new RegisterPage();
const paymentPO = new PaymentPage();
const reviewPO = new ReviewPage();
const thankYouPO = new ThankYouPage();
const flowPO = new FlowPage();

const navbarCO = new PledgeNavBarComponent();
const registerCO = new RegisterComponent();
const returningParticipantCO = new ReturningParticipant();
const surveyCO = new SurveyComponent();

/* use event 17560 */
describe('Single Pledge free registration - all fields required: ', () => {

    Cypress.on('uncaught:exception', (err, runnable) => {
        return false;
    });

    using(events, (event) => {
        describe(`${event}`, () => {
            before(() => {
                pageSetup.goToEvent(event);
                pageSetup.waitForPageLoad()
                generateUniqueName(data);
            });

            it('Should press the register button at the top, then select the reg item', () => {
                navbarCO.register();
                registerCO.register(0);
            });
            it('Should press the create new account button', () => {
                returningParticipantCO.createAccount();
            });
            it('should fill account details', () => {
                cy.wait(5000)
                scrollToElement(registerPO.container)
                registerPO.accountInformationCO.enterDetails(data.account.username + getLocalDateTime(), data.account.password, data.account.fundraisingGoal, data.account.fund)
            });
            it('should fill Profile Information', () => {
                registerPO.fillInAllProfileInformation(data)
            });
            it('should fill Address and Tribute Information', () => {
                registerPO.fillInAllAddressInformation(data)
                registerPO.fillInTributeInformation(data)
            });
            it('should fill Additional Information and Custom Fields', () => {
                registerPO.fillInAdditionalInformation(data)
            });
            // it('should fill Custom Fields', () => {
            //     cy.get(registerPO.container).should('exist')
            //     registerPO.fillInCustomFields(data)
            // });
            it('should fill Surveys', () => {
                // we go through each survey response and fill it out
                data.surveyResponses.forEach(({ question, answer }) => {
                    //flowPO.continue();
                    cy.get(registerPO.container).should('exist')
                    surveyCO.setAnswer({ question, answer });
                    pressEsc();
                });
                flowPO.continue();
            });
            it('should enter amount, validate CC error messages then clear amount', () => {
                cy.wait(2000)
                // skip additional participants
                flowPO.continue();
                // enter donation amount
                paymentPO.donate(data.donationAmount);

                //Validate CC error messages
                // flowPO.continue();
                // paymentPO.verifyCCErrors(data.ccValidationMessages)
                // paymentPO.enterCardDetails(data.wrongCard);

                // then clear the donation amount
                paymentPO.clearDonation();
            });
            it('should Add store item then remove it', () => {
                cy.wait(2000)
                paymentPO.buyItem(0);
                cy.wait(1000)
                // remove store item
                paymentPO.removeStoreItem(0);
                // add a different store item
                paymentPO.buyItem(1);
                cy.wait(1000)
                // remove store item
                paymentPO.removeStoreItem(1);
            });
            // it('should add credit card info', () => {                
            //     paymentPO.verifyPaymentFieldsPresent();
            // 	paymentPO.verifyCreditCardIsDisplayed();
            // 	paymentPO.enterCardDetails(data.card);              
            // });
            it('Should verify the profile and payment info on the review page', () => {
                cy.wait(2000)
                flowPO.continue();
                reviewPO.verifyProfileInformation(data);
                reviewPO.verifyTributeInformation(data)
            });
            it('should submit and then verify the Transaction code', () => {
                flowPO.continue();
                thankYouPO.verifyTransactionNumber(data);
            });
        });
    });
});
