//The information regarding the Library
import { PageSetup } from "../../../support/utils/pageSetup";
import { RegisterPage } from "../../../support/pages/Pledge/register";
import { ReviewPage } from "../../../support/pages/Ticketing/ReviewPage";
import { FlowPage } from "../../../support/pages/flow";
import { PaymentPage } from "../../../support/pages/Pledge/payment";
import { StorePage } from "../../../support/pages/Pledge/store";
import { ThankYouPage } from "../../../support/pages/Pledge/ThankYouPage";
import using from "jasmine-data-provider";
import * as specificData from '../../../data/Pledge/MultiPledgeStoreMultiplePurchasesOnly.json'


//The information regarding the Library
let pageSetup: PageSetup = new PageSetup();

const data = pageSetup.getData('Pledge', specificData);
const events = pageSetup.getEvents(pageSetup.getEnvironment().multipledge, data.events);

const registerPO = new RegisterPage();
const paymentPO = new PaymentPage();
const reviewPO = new ReviewPage();
const flowPO = new FlowPage();
const storePO = new StorePage();
const thankYouPO = new ThankYouPage();


/* use event 16574 */
describe('TR(3017) Scenario -> Multi Pledge registration, volunteer - purchase only - multiple', () => {
    using(events, event => {
        describe(`${event}`, () => {
            before(() => {
                pageSetup.goToEvent(`${event}/${data.URL}`);
                //pageSetup.logoutIfLoggedIn();
            });
            after(() => {
                pageSetup.goToEvent(event);
                //pageSetup.logoutIfLoggedIn();
                pageSetup.cleanupPage();
            });
            it('should add store item', () => {
                storePO.buyItem(1);
                storePO.buyItem(2);
                storePO.buyItem(2);
                storePO.enterStorePromoCode(data.storePromoCode);
                storePO.verifyStorePromoCodeApplied();
            });
            it('should fill out the user details form', () => {
                flowPO.continue();
                registerPO.fillInProfileAndAddressInformation(data);
            });
            it('should enter the payment information', () => {
                flowPO.continue();
                paymentPO.verifyPaymentFieldsPresent();
                paymentPO.verifyCreditCardIsDisplayed();
                paymentPO.enterCardDetails(data.card);
            });
            it('Should verify the profile and payment info on the review page', () => {
                flowPO.continue();
                reviewPO.verifyProfileInformation(data);
                reviewPO.verifyPaymentInformation(data.card);
            });
            it('should verify the Transaction code', () => {
                flowPO.continue();
                thankYouPO.verifyTransactionNumber(data);
            });
        });
    });
});