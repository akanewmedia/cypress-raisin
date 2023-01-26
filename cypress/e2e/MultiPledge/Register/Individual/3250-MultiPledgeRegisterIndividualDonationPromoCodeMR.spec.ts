import { PageSetup } from "../../../../support/utils/pageSetup";
import { RegisterComponent } from "../../../../support/components/register.co";
import { ReviewPage } from "../../../../support/pages/Ticketing/ReviewPage";
import { FlowPage } from "../../../../support/pages/flow";
import { PledgeNavBarComponent } from "../../../../support/components/pledgeNavbar.co";
import { RegisterPage } from "../../../../support/pages/Pledge/register";
import { ReturningParticipant } from "../../../../support/components/returningParticipant.co";
import { ThankYouPage } from "../../../../support/pages/Pledge/ThankYouPage";
import { generateUniqueName} from "../../../../support/utils/actions";
import { AdditionalParticipantsPage } from "../../../../support/pages/Pledge/addParticipants";
import { PaymentPage } from "../../../../support/pages/Pledge/payment";
import { Waiver } from "../../../../support/components/waiver.co";
import using from "jasmine-data-provider";
import * as specificData from '../../../../data/Pledge/MultiPledgeRegisterIndividualDonationPromoCodeMR.json'

//The information regarding the Library
const using = require('jasmine-data-provider');
let pageSetup: PageSetup = new PageSetup();

const data = pageSetup.getData('Pledge', specificData);
const events = pageSetup.getEvents(pageSetup.getEnvironment().multipledge, data.events);
const registerPO = new RegisterPage();
const reviewPO = new ReviewPage();
const thankYouPO = new ThankYouPage();
const flowPO = new FlowPage();

const navbarCO = new PledgeNavBarComponent();
const registerCO = new RegisterComponent();
const returningParticipantCO = new ReturningParticipant();
const addParticipantsPO = new AdditionalParticipantsPage();
const paymentPO = new PaymentPage();
const waiverCO = new Waiver()

/* use event (MR - all fields required) */
// TODO: https://dev.azure.com/akaraisin/raisin/_workitems/edit/19824
// If the main registrant chooses free registration, and then registers an additional participant with an individual registration fee, 
// and a promo code for individual registration is used, it will not give a discount (says code doesn't apply). BUT, but, but, 
// if the main registrant is not free (registers as registration fee, individual) then the promo code works for both of them.
describe('TR(3250) Scenario -> Multi Pledge Individual Registration with Additional Participant (including donation and promo code): ', () => {
    using(events, event => {
        describe(`${event}`, () => {
            before(() => {
                pageSetup.goToEvent(event);
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
                registerCO.register(0, 1);
            });
            it('Should press the create new account button', () => {
                returningParticipantCO.createAccount();
            });
            it('should accept the waiver and advance', () => {
                waiverCO.selectWaiverAcceptance(true);
                flowPO.continue();
            });
            it('should enter the participant details', () => {
                registerPO.fillInAccountInformation(data);
                registerPO.fillInProfileAndAddressInformation(data);
                flowPO.continue();
            });
            it('should skip the Additional Participants and then come back', () => {
                flowPO.continue();
                flowPO.goBack();
            });
            it('should enter the additional participant details', () => {
                addParticipantsPO.clickAddParticipantButton();
                addParticipantsPO.acceptRegistrationWaiver(data);
                addParticipantsPO.fillInProfileInformation(data.additionalParticipants[0]);
             
            });
            it('should enter donation amount, promo code and add store items in the payment screen', () => {
                flowPO.continue();
                paymentPO.verifyPaymentFieldsPresent();
                paymentPO.verifyCreditCardIsDisplayed();
                paymentPO.verifyRegFeeDiscountAmount(data.notSet);
                paymentPO.enterRegFeePromoCode(data.promoCode);
                paymentPO.verifyRegFeeDiscountAmount(data.totalAfterPromo);
             
                paymentPO.donate(data.donationAmount);
                paymentPO.buyItem(0);
                paymentPO.buyItem(1);
                paymentPO.verifyTotalAmount(data.total);
                paymentPO.enterCardDetails(data.card);
            });
            it('Should verify the profile, payment and additional participants info on the review page', () => {
                flowPO.continue();
                reviewPO.verifyProfileInformation(data);
                reviewPO.verifyPaymentInformation(data.card);
                reviewPO.verifyAdditionalParticipantsInformation(data);
                reviewPO.verifyTotalAmount(data.totalWithDonation);
            });
            it('should submit and then verify the Transaction code', () => {
                flowPO.continue();
                thankYouPO.verifySuccessfulTransaction(data);
            });
        });
    });
});
