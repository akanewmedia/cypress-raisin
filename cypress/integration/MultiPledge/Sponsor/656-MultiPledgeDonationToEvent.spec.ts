import  PledgeNavBarComponent  from "../../../support/components/pledgeNavBar.co";
import { Donation } from "../../../support/components/donation.co";
import  FlowPage  from "../../../pages/flow";
import { DonationSearchPage } from "../../raisin/pages/Pledge/donationSearch";
import { PaymentPage } from "../../raisin/pages/Pledge/payment";
import { RegisterPage } from "../../../pages/Pledge/register";
import { ThankYouPage } from "../../raisin/pages/Pledge/ThankYouPage";
import { ReviewPage } from "../../raisin/pages/Ticketing/ReviewPage";
import  PageSetup  from "../../../support/utils/pageSetup";

const pageSetup = new PageSetup();
const data = pageSetup.getData('Pledge', 'MultiPledgeDonationToEvent');
const donationCO = new Donation();
const navbarCO = new PledgeNavBarComponent();
const registerPO = new RegisterPage();
const paymentPO = new PaymentPage();
const reviewPO = new ReviewPage();
const thankYouPO = new ThankYouPage();
const flowPO = new FlowPage();
const donationSearchPO = new DonationSearchPage();

describe('TR(656) Scenario -> Multi Pledge donation to event : ', () => {


const event = '/AD9235BF0C2148F29DD47B092A3564AB'

    //using(events, event => {
        context('Donate to Event', () => {
            before(() => {
                pageSetup.goToEvent(event);
                //pageSetup.logoutIfLoggedIn();
            });
            after(() => {                
                //pageSetup.logoutIfLoggedIn();
                //pageSetup.cleanupPage();
            });
            it.only('Should goto to the sponsor page', () => {
                navbarCO.donate();
            });
            it('Should click on a donation to the event', () => {

                donationSearchPO.clickEventTab();

                donationCO.setEventDonationAmount(data.donationAmount);
                donationCO.eventDonationContinueBtn.should('be.visible')
                donationCO.pressEventDonationContinueBtn();
            });
            it('should enter the participant details', () => {
                flowPO.continue();
                registerPO.fillInProfileAndAddressInformation(data);
                registerPO.container.should('be.visible')
            });
            it('should verify and enter the credit card information', () => {
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

