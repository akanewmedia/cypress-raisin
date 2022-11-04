import { PageSetup } from "../../../support/utils/pageSetup";
import { Donation } from "../../../support/components/donation.co";
import { EnitytDetails } from "../../../support/components/entityDetails.co";
import { FlowPage } from "../../../support/pages/flow";
import { PaymentPage } from "../../../support/pages/Pledge/payment";
import { RegisterPage } from "../../../support/pages/Pledge/register";
import { ThankYouPage } from "../../../support/pages/Pledge/ThankYouPage";
import { ReviewPage } from "../../../support/pages/Ticketing/ReviewPage";
import * as specificData from '../../../data/Pledge/MultiPledgeDonateUsingDonateNowButtonOnParticipantPage.json'




//The information regarding the Library
const using = require('jasmine-data-provider');
let pageSetup: PageSetup = new PageSetup();

const data = pageSetup.getData('Pledge', specificData);
const events = pageSetup.getEvents(pageSetup.getEnvironment().multipledge, data.events);


const registerPO = new RegisterPage();
const paymentPO = new PaymentPage();
const reviewPO = new ReviewPage();
const thankYouPO = new ThankYouPage();
const flowPO = new FlowPage();

const donationCO = new Donation();
const entityDetailsCO = new EnitytDetails();

describe('TR(659) Scenario -> Multi Pledge go to Participant page and click side donate now : ', () => {
    using(events, event => {
        describe(`${event}`, () => {
            before(() => {
                pageSetup = new PageSetup();
                pageSetup.goToEvent(`${event}/${data.URL}`);
                pageSetup.waitForPageLoad()
            });
            after(() => {
                pageSetup.goToEvent(event);
                pageSetup.cleanupPage();
            });

            it('should start donation to a participant', () => {
                cy.get(entityDetailsCO.container).should('be.visible')
                entityDetailsCO.sideDonateNow();
            });

            it('should start enter donation amount', () => {
                cy.get(donationCO.donationContainer).should('be.visible')
                cy.get(donationCO.honourRollContainer).should('be.visible')
                cy.get(donationCO.privateMessageContainer).should('be.visible')
                donationCO.setAmount(data.donationAmount);
                donationCO.selectHonorRollOption(data.honourRoleOption);
            });

            it('should enter the participant details', () => {
                flowPO.continue();
                registerPO.fillInProfileAndAddressInformation(data);
                cy.get(registerPO.container).should('be.visible')
            });

            it('should enter the payment details', () => {
                flowPO.continue();
                paymentPO.verifyPaymentFieldsPresent();
                paymentPO.verifyCreditCardIsDisplayed();
                paymentPO.enterCardDetails(data.card);
            });

            it('should display on the review page', () => {
                flowPO.continue();
                reviewPO.verifyProfileInformation(data);
                reviewPO.verifyPaymentInformation(data.card);
            });

            it('should verify the Transaction Number', () => {
                flowPO.continue();
                thankYouPO.verifyTransactionNumber(data);
            });

            it('should go to participant profile', () => {
                thankYouPO.goToProfile();
                cy.contains('.rs-preview .page-preview-title', "Welcome to aa a's page")
            })
        });
    });
});

