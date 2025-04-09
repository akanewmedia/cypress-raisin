//The information regarding the Library
import { Donation } from "../../../support/components/donation.co";
import { PledgeNavBarComponent } from "../../../support/components/pledgeNavBar.co";
import { PageSetup } from "../../../support/utils/pageSetup";
import { RegisterPage } from "../../../support/pages/Pledge/register";
import { ThankYouPage } from "../../../support/pages/Pledge/ThankYouPage";
import { ReviewPage } from "../../../support/pages/Ticketing/ReviewPage";
import { FlowPage } from "../../../support/pages/flow";
import { PaymentPage } from "../../../support/pages/Pledge/payment";
import { DonationSearchPage } from "../../../support/pages/Pledge/donationSearch";
import * as specificData from '../../../data/Pledge/MultiPledgeDonationToGroup.json'


//The information regarding the Library
const using = require('jasmine-data-provider');
let pageSetup: PageSetup = new PageSetup();

const data = pageSetup.getData('Pledge', specificData);
const events = pageSetup.getEvents(pageSetup.getEnvironment().multipledge, data.events);

const donationCO = new Donation();
const registerPO = new RegisterPage();
const paymentPO = new PaymentPage();
const reviewPO = new ReviewPage();
const thankYouPO = new ThankYouPage();
const flowPO = new FlowPage();
const navbarCO = new PledgeNavBarComponent();
const donationSearchPO = new DonationSearchPage();

describe('TR(658) Scenario -> Multi Pledge donation to group : ', () => {    
    using(events, event => {
        describe(`${event}`, () => {
            before(() => {
                pageSetup.goToEvent(event);
                pageSetup.waitForPageLoad()
            });
            after(() => {
                pageSetup.goToEvent(event);
                pageSetup.cleanupPage();
            });
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
                 
            });
        });
    });
});

