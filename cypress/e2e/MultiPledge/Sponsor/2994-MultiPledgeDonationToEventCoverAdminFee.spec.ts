import { PageSetup } from "../../..//support/utils/pageSetup";
import { PledgeRxfNavBarComponent } from "../../../support/components/pledgeRxfNavbar.co";
import { Donation } from "../../../support/components/donation.co";
import { FlowPage } from "../../../support/pages/flow";
import { DonationSearchPage } from "../../../support/pages/Pledge/donationSearch";
import { PaymentPage } from "../../../support/pages/Pledge/payment";
import { RegisterPage } from "../../../support/pages/Pledge/register";
import { ThankYouPage } from "../../../support/pages/Pledge/ThankYouPage";
import { ReviewPage } from "../../../support/pages/Ticketing/ReviewPage";
import {data} from '../../../data/Pledge/base'
import {data2} from '../../../data/Pledge/MultiPledgeDonationToTeamCoverAdminFee'

//The information regarding the Library
let pageSetup: PageSetup = new PageSetup();
const event = '/rxfmpaee'

const donationSearchPO = new DonationSearchPage();
const registerPO = new RegisterPage();
const paymentPO = new PaymentPage();
const reviewPO = new ReviewPage();
const thankYouPO = new ThankYouPage();
const flowPO = new FlowPage();

const donationCO = new Donation();
const navbarCO = new PledgeRxfNavBarComponent();

describe('TR(2994) Scenario -> Multi Pledge donation to event (cover admin fee) : ', () => {    
        describe(`${event}`, () => {
            before(() => {
                pageSetup = new PageSetup();
                pageSetup.goToEvent(event);
                
            });
            after(() => {
                pageSetup.goToEvent(event);
                pageSetup.cleanupPage();
            });
            it('Should start a donation to the event with cover admin fee', () => {
                navbarCO.donate();                
                cy.get(donationSearchPO.container).should('be.visible')
                donationSearchPO.clickEventTab();                              
                donationCO.setEventDonationAmount(data2.donationAmount);
                donationCO.setCoverAdminFee(true);       
                donationCO.pressEventDonationContinueBtn();     
            });
            it('should enter the participant details', () => {                
                registerPO.fillInProfileAndAddressInformation(data);                
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
            it('Should verify the donation amount + cover admin fee', () => {
                reviewPO.verifyTotalAmount(data2.totalAmount);
                flowPO.continue();
            });
            it('should verify the Transaction code', () => {
                thankYouPO.verifyTransactionNumber(data);
            });
        });
    });

