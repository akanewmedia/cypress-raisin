import { PageSetup } from "../../../../support/utils/pageSetup";
import { RegisterComponent } from "../../../../support/components/register.co";
import { ReviewPage } from "../../../../support/pages/Ticketing/ReviewPage";
import { FlowPage } from "../../../../support/pages/flow";
import { PledgeNavBarComponent } from "../../../../support/components/pledgeNavBar.co";
import { RegisterPage } from "../../../../support/pages/Pledge/register";
import { ReturningParticipant } from "../../../../support/components/returningParticipant.co";
import { ThankYouPage } from "../../../../support/pages/Pledge/ThankYouPage";
import { generateUniqueAdditionalParticipant, generateUniqueName, generateUniqueUsername } from "../../../../support/utils/actions";
import { AdditionalParticipantsPage } from "../../../../support/pages/Pledge/addParticipants";
import { V3LoginPage } from "../../../../support/pages/Pledge/V3LoginPage";
import * as specificData from '../../../../data/Pledge/MultiPledgeRegisterIndividualReturningParticipantMR.json'



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
const addParticipantsPO = new AdditionalParticipantsPage();
const v3LoginPage = new V3LoginPage();

const navbarCO = new PledgeNavBarComponent();
const returningParticipantCO = new ReturningParticipant();

/* use event (MR) */
// TODO: Reactivate when db is restored. The second event doens't exist every where
describe('TR(3165) Scenario -> Multi Pledge Individual Registration with Additional Participant as Returning Participant: ', () => {
    /**
     * Registers a participant in the first event just to be registered as a returning participant in the second event
     */
      let iniqueName = generateUniqueName(data.participant[0]);
      let uniqueUserName = generateUniqueUsername(data.participant[0]);
    context('Registers a participant in the first event just to be registered as a returning participant in the second event', () => {
        using([events[0]], event => {
            describe(`${event}`, () => {
                before(() => {
                    pageSetup.goToEvent(event);
                    pageSetup.waitForPageLoad()
                    // pageSetup.logoutIfLoggedIn();
                    
                });
                after(() => {
                    //pageSetup.goToEvent(event);
                    // pageSetup.logoutIfLoggedIn();
                    pageSetup.cleanupPage();
                });
                it('Should press the register button at the top, then select the location and reg item', () => {
                    navbarCO.register();
                    cy.get(registerCO.container).should('exist')
                    registerCO.selectSubEventGroup(data.location);
                    registerCO.register(0, 0);
                });
                it('Should press the create new account button', () => {
                    returningParticipantCO.createAccount();
                });
                it('should enter the participant details', () => {
                    cy.wait(5000)
                    //flowPO.continue();
                    registerPO.fillInExactAccountInformation(data.participant[0]);
                    registerPO.fillInProfileAndAddressInformation(data.participant[0]);
                });
                it('should auto skip the additional participant', () => {
                    flowPO.continue();
                });
                it('should go past the payment screen (free reg)', () => {
                    flowPO.continue();
                });
                it('Should verify the profile, payment and additional participants info on the review page', () => {
                    flowPO.continue();
                    reviewPO.verifyProfileInformation(data.participant[0]);
                    reviewPO.verifyNoPaymentInformation(data.zero);
                });
                it('should submit and then verify the Transaction code', () => {
                    flowPO.continue();
                    thankYouPO.verifyTransactionNumber(data);
                    thankYouPO.verifySuccessfulTransaction(data);
                });
                it('should click on "Start Fundraising now" and go to PCUI', () => {
                    cy.get('.start-fundraising-btn').click()
                    cy.url().should('include', '/dashboard');
                });
            });
        });
    })
    
    

    /**
     * Registers the participant from the first event as a returning participant for the second event
     */
    context('Registers the participant from the first event as a returning participant for the second event', ()=>{
        using([events[1]], event => {
            describe(`${event}`, () => {
                before(() => {
                    pageSetup.goToEvent(event);
                    // pageSetup.logoutIfLoggedIn();
                    generateUniqueName(data);
                });
                after(() => {
                    pageSetup.goToEvent(event);
                    // pageSetup.logoutIfLoggedIn();
                    pageSetup.cleanupPage();
                });
                it('Should press the register button at the top, then select the location and reg item', () => {
                    navbarCO.register();
                    cy.get(registerCO.container).should('exist')
                    registerCO.selectSubEventGroup(data.locationSecondEvent);
                    registerCO.register(0, 0);
                });
                it('Should login as a returning participant', () => {
                    returningParticipantCO.loginAsReturning(uniqueUserName, data);
                });
                it('should enter the participant details', () => {                    
                    registerPO.fillInFundraisingGoal(data);
                });
                it('should enter the additional participant details', () => {
                    flowPO.continue();
                    addParticipantsPO.clickAddParticipantButton();
                    generateUniqueAdditionalParticipant(data.additionalParticipants[0])
                    addParticipantsPO.fillInProfileInformationNoWaiver(data.additionalParticipants[0]);
                });
                it('should go past the payment screen (free reg)', () => {
                    flowPO.continue();
                });
                it('Should verify the profile, payment and additional participants info on the review page', () => {
                    flowPO.continue();
                    reviewPO.verifyProfileInformation(data.participant[0]);
                    reviewPO.verifyNoPaymentInformation(data.zero);
                    reviewPO.verifyAdditionalParticipantsInformation(data);
                });
                it('should submit and then verify the Transaction code', () => {
                    flowPO.continue();
                    thankYouPO.verifyTransactionNumber(data);
                    thankYouPO.verifySuccessfulTransaction(data);
                });
                // it('Should press the login button at the top', () => {
                //     navbarCO.login();
                // });
                // inV3('Should log in to using the V3 login page', () => {
                //     v3LoginPage.doLogin(data.additionalParticipants[0]);
                //     expect(browser.driver.getCurrentUrl()).toContain('/Common/');
                // });
            });
        });
    })
    
});
