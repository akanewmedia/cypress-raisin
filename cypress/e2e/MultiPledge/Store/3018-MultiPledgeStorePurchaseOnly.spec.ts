import { PageSetup } from "../../../support/utils/pageSetup";
import { RegisterPage } from "../../../support/pages/Pledge/register";
import { ReviewPage } from "../../../support/pages/Ticketing/ReviewPage";
import { FlowPage } from "../../../support/pages/flow";
import { PaymentPage } from "../../../support/pages/Pledge/payment";
import { StorePage } from "../../../support/pages/Pledge/store";
import { ThankYouPage } from "../../../support/pages/Pledge/ThankYouPage";
import { TransactionFailed } from "../../../support/pages/Pledge/transactionFailed";
import * as specificData from '../../../data/Pledge/MultiPledgeStorePurchaseOnly.json'


//The information regarding the Library
const using = require('jasmine-data-provider');
let pageSetup: PageSetup = new PageSetup();

const data = pageSetup.getData('Pledge', specificData);
const events = pageSetup.getEvents(pageSetup.getEnvironment().multipledge, data.events);


const registerPO = new RegisterPage();
const paymentPO = new PaymentPage();
const reviewPO = new ReviewPage();
const flowPO = new FlowPage();
const storePO = new StorePage();
const thankYouPO = new ThankYouPage();
const transactionFailedPO = new TransactionFailed();


/* use event 16574 */
describe('TR(3018) Scenario -> Multi Pledge registration, volunteer - purchase only', () => {
    using(events, event => {
        describe(`${event}`, () => {
            before(() => {
                pageSetup.goToEvent(`${event}/${data.URL}`);
                pageSetup.waitForPageLoad()
                //pageSetup.logoutIfLoggedIn();
            });
            after(() => {
                pageSetup.goToEvent(event);
                //pageSetup.logoutIfLoggedIn();
                pageSetup.cleanupPage();
            });
            it('should add store item', () => {
                storePO.buyItem(1);
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
                reviewPO.verifyTotalAmount(data.totalAmount);
            });
            it('should verify the Transaction code', () => {
                flowPO.continue();
                 
            });
        });
    });
});