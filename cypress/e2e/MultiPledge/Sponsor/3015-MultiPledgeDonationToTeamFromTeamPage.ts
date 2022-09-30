import { PageSetup } from "../../../support/utils/pageSetup";
import { Donation } from "../../../support/components/donation.co";
import { FlowPage } from "../../../support/pages/flow";
import { DonationSearchPage } from "../../../support/pages/Pledge/donationSearch";
import { PaymentPage } from "../../../support/pages/Pledge/payment";
import { RegisterPage } from "../../../support/pages/Pledge/register";
import { ThankYouPage } from "../../../support/pages/Pledge/ThankYouPage";
import { ReviewPage } from "../../../support/pages/Ticketing/ReviewPage";
import { PledgeRxfNavBarComponent } from "../../../support/components/pledgeRxfNavbar.co";
import { EnitytDetails } from "../../../support/components/entityDetails.co";
import * as specificData from '../../../data/Pledge/MultiPledgeDonationToTeam.json'


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
const entityDetailsCO = new EnitytDetails();

describe('TR(3015) Scenario -> Multi Pledge donation to team from team page : ', () => {
    using(events, event => {
        describe(`${event}`, () => {
            before(() => {
                pageSetup = new PageSetup();
                pageSetup.goToEvent(event);
            });
            after(() => {
                pageSetup.goToEvent(event);
                pageSetup.cleanupPage();
            });
            it('should search for a team then navigate to its page', () => {
                navbarCO.donate();
                cy.get(donationSearchPO.container).should('be.visible')
                donationSearchPO.clickTeamButton();
                donationSearchPO.navigateDonationResult(data.teamname);
            });
            it('should verify then press the right side donate button', () => {
                entityDetailsCO.sideDonateNow();
            });
            it('Should fill in the donation amount', () => {
                cy.get(donationCO.honourRollContainer).should('be.visible')
                cy.get(donationCO.donationContainer).should('be.visible')
                donationCO.setAmount(data.donationAmount);
                donationCO.selectHonorRollOptionByIndex(data.honourRoleOptionIndex);
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
                thankYouPO.verifyTransactionNumber(data);
            });
        });
    });
});
