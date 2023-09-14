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
import { PaymentPage } from "../../../../support/pages/Pledge/payment";
import { CreateTeamComponent } from "../../../../support/components/createTeam.co";
import { AdditionalParticipantsPage } from "../../../../support/pages/Pledge/addParticipants";
import using from "jasmine-data-provider";
import * as specificData from '../../../../data/Pledge/MultiPledgeRegisterTeamCaptainMaxTeamSizeReachedMR.json'
import { Waiver } from "../../../../support/components/waiver.co";
import { flow } from "lodash";


//The information regarding the Library
const using = require('jasmine-data-provider');
let pageSetup: PageSetup = new PageSetup();

const data = pageSetup.getData('Pledge', specificData);
const events = pageSetup.getEvents(pageSetup.getEnvironment().multipledge, data.events);

const registerPO = new RegisterPage();
const waiverCO = new Waiver()
const reviewPO = new ReviewPage();
const thankYouPO = new ThankYouPage();
const flowPO = new FlowPage();
const paymentPO = new PaymentPage();
const navbarCO = new PledgeNavBarComponent();
const registerCO = new RegisterComponent();
const returningParticipantCO = new ReturningParticipant();
const addParticipantsPO = new AdditionalParticipantsPage();
const createTeamCO = new CreateTeamComponent();

/* use event (MR) */
// TODO: Reactivate once the all env have this event
describe('TR(3181) Scenario -> Multi Pledge Team Captain Registration with Additional Participant (max team size reached): ', () => {
    using(events, event => {
        describe(`${event}`, () => {
            before(() => {
                pageSetup.goToEvent(event);
                pageSetup.waitForPageLoad();
                generateUniqueName(data);
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
                flowPO.continue()
            });
            it('should enter the participant details', () => {
                registerPO.fillInAccountInformation(data);
                registerPO.fillInProfileAndAddressInformation(data);
            });
            it('should enter the team details', () => {
                flowPO.continue();
                createTeamCO.fillOutPage(data);
            });
            it('should enter the additional participant details and verify max reached', () => {
                flowPO.continue();                               
                addParticipantsPO.clickAddParticipantButton();
                cy.wait(1000)
                addParticipantsPO.fillInProfileInformation(data.additionalParticipants[0]);
                addParticipantsPO.verifyMaxTeamMembersReachedError(data.maxTeamMembersReachedMessage);                               
            });
            // I'm commenting all of this because it does not make sense to go further from here. The test is meant to validate if the max team size is being displayed when trying to add an Additional Participant
            // Which means it should not be possible to press continue if max team was reached.
            // it('should enter the payment details', () => {
            //     flowPO.continue();
            //     paymentPO.verifyPaymentFieldsPresent();
            //     paymentPO.verifyCreditCardIsDisplayed();
            //     paymentPO.enterCardDetails(data.card);
            // });
            // it('Should verify the profile, payment and additional participants info on the review page', () => {
            //     flowPO.continue();
            //     reviewPO.verifyProfileInformation(data);
            //     reviewPO.verifyAdditionalParticipantsInformation(data);
            // });
            // it('should submit and then verify the Transaction code', () => {
            //     flowPO.continue();
            //     thankYouPO.verifyTransactionNumber(data);
            //     thankYouPO.verifySuccessfulTransaction(data);
            // });
        });
    });
});
