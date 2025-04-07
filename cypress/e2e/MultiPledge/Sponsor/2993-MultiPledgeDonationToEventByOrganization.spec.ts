import { PageSetup } from "../../../support/utils/pageSetup";
import { PledgeRxfNavBarComponent } from "../../../support/components/pledgeRxfNavbar.co";
import { Donation } from "../../../support/components/donation.co";
import { FlowPage } from "../../../support/pages/flow";
import { DonationSearchPage } from "../../../support/pages/Pledge/donationSearch";
import { PaymentPage } from "../../../support/pages/Pledge/payment";
import { RegisterPage } from "../../../support/pages/Pledge/register";
import { ThankYouPage } from "../../../support/pages/Pledge/ThankYouPage";
import { ReviewPage } from "../../../support/pages/Ticketing/ReviewPage";
import * as specificData from '../../../data/Pledge/MultiPledgeDonationToEventByOrganization.json'


//The information regarding the Library
const using = require('jasmine-data-provider');
let pageSetup: PageSetup = new PageSetup();

const data = pageSetup.getData('Pledge', specificData);
const events = pageSetup.getEvents(pageSetup.getEnvironment().multipledge, data.events);

const donationSearchPO = new DonationSearchPage();
const registerPO = new RegisterPage();
const paymentPO = new PaymentPage();
const reviewPO = new ReviewPage();
const thankYouPO = new ThankYouPage();
const flowPO = new FlowPage();

const donationCO = new Donation();
const navbarCO = new PledgeRxfNavBarComponent();

describe('TR(2993) Scenario -> Multi Pledge donation to event using the organization field: ', () => {
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
            it('Should start a donation to the event', () => {
                navbarCO.donate();
                cy.get(donationSearchPO.container).should('be.visible')
                donationSearchPO.clickEventTab();
                cy.get(donationCO.donationAmountText).should('be.visible')
                donationCO.setEventDonationAmount(data.donationAmount);
                cy.get(donationCO.eventDonationContinueBtn).should('be.visible')
                donationCO.pressEventDonationContinueBtn();
            });
            it('Should press the organization user type button, then enter the participant details', () => {
                registerPO.clickOrganizationUserType();
                registerPO.fillInAllProfileInformation(data);
                registerPO.fillInAddressInformation(data);
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

