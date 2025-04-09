import { PageSetup } from "../../../support/utils/pageSetup";
import { RegisterComponent } from "../../../support/components/register.co";
import { FlowPage } from "../../../support/pages/flow";
import { PledgeNavBarComponent } from "../../../support/components/pledgeNavBar.co";
import { RegisterPage } from "../../../support/pages/Pledge/register";
import { ReturningParticipant } from "../../../support/components/returningParticipant.co";
import { generateUniqueName } from "../../../support/utils/actions";
import { ReviewPage } from "../../../support/pages/Ticketing/ReviewPage";
import { ThankYouPage } from "../../../support/pages/Pledge/ThankYouPage";
import { Waiver } from "../../../support/components/waiver.co";
import * as specificData from '../../../data/Pledge/MultiPledgeRegItemByGroupRegisterFree.json'


//The information regarding the Library
const using = require('jasmine-data-provider');
let pageSetup: PageSetup = new PageSetup();

const data = pageSetup.getData('Pledge', specificData);
const events = pageSetup.getEvents(pageSetup.getEnvironment().multipledge, data.events);

let registerPO = new RegisterPage();
let reviewPO = new ReviewPage();
let thankYouPO = new ThankYouPage();
let flowPO = new FlowPage();

let navbarCO = new PledgeNavBarComponent();
let registerCO = new RegisterComponent();
let returningParticipantCO = new ReturningParticipant();
let waiverCO = new Waiver()

/* use event 17573 */
describe('TR(9026) Scenario -> Multi Pledge Registration Item By Group Ind Register with additional participants ', () => {
    using(events, event => {
        describe(`${event}`, () => {
            before(() => {
                pageSetup.goToEvent(event);
                pageSetup.waitForPageLoad();
                generateUniqueName(data);
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
            it('should select a free individual registration and press the create new account button', () => {
                registerCO.register(0, 1);
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
            it('should go past additional participants and the payment screen (free reg)', () => {
                flowPO.continue();
                // Skip additional participants
                flowPO.continue();
            });
            it('should verify the profile and payment info on the review page', () => {
                flowPO.continue();
                reviewPO.verifyProfileInformation(data);
                reviewPO.verifyNoPaymentInformation(data.zero);
            });
            it('should submit and then verify the Transaction code', () => {
                flowPO.continue();
                thankYouPO.verifySuccessfulTransaction(data);
            });
        });
    });
});
