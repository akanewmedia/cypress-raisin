//The information regarding the Library
import { Donation } from "../../../support/components/donation.co";
import { PledgeNavBarComponent } from "../../../support/components/pledgeNavbar.co";
import { PageSetup } from "../../../support/utils/pageSetup";
import { RegisterPage } from "../../../support/pages/Pledge/register";
import { ThankYouPage } from "../../../support/pages/Pledge/ThankYouPage";
import { ReviewPage } from "../../../support/pages/Ticketing/ReviewPage";
import { FlowPage } from "../../../support/pages/flow";
import { PaymentPage } from "../../../support/pages/Pledge/payment";
import { DonationSearchPage } from "../../../support/pages/Pledge/donationSearch";
import { data } from '../../../data/Pledge/base.js'



//The information regarding the Library
let pageSetup: PageSetup = new PageSetup();

const event = '/AD9235BF0C2148F29DD47B092A3564AB'



const donationCO = new Donation();
const registerPO = new RegisterPage();
const paymentPO = new PaymentPage();
const reviewPO = new ReviewPage();
const thankYouPO = new ThankYouPage();
const flowPO = new FlowPage();
const navbarCO = new PledgeNavBarComponent();
const donationSearchPO = new DonationSearchPage();

describe('TR(658) Scenario -> Multi Pledge donation to group : ', () => {    
        describe(`${event}`, () => {
            before(() => {
                pageSetup.goToEvent(event);
                //pageSetup.logoutIfLoggedIn();
            });
            // after(() => {
            //     pageSetup.goToEvent(event);
            //     pageSetup.logoutIfLoggedIn();
            //     browser.executeScript('window.sessionStorage.clear();');
            //     browser.executeScript('window.localStorage.clear();');
            // });
            it('Should start a donation to the group', () => {
                navbarCO.donate();

                cy.get(donationSearchPO.container).should('be.visible')                
                donationSearchPO.clickGroupTab();
                donationSearchPO.searchAndSelectFirstOption(data.groupName);

                cy.get(donationCO.honourRollContainer).should('be.visible') 
                cy.get(donationCO.donationContainer).should('be.visible')                 
                donationCO.selectFirstHonorRollOption(0);
                donationCO.setAmount(data.donationAmount);
            });
            it('should enter the participant details', () => {
                flowPO.continue();
                cy.wait(3000)
                registerPO.fillInProfileAndAddressInformation(data);
                cy.get(registerPO.container).should('be.visible')                
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

