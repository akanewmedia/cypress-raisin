import { PageSetup } from "../../../support/utils/pageSetup";
import { Donation } from "../../../support/components/donation.co";
import { FlowPage } from "../../../support/pages/flow";
import { DonationSearchPage } from "../../../support/pages/Pledge/donationSearch";
import { PledgeNavBarComponent } from "../../../support/components/pledgeNavbar.co";
import * as specificData from '../../../data/Pledge/MultiPledgeDonationToParticipantWithExtraValidationInvalidCustomAmount.json'

//The information regarding the Library
const using = require('jasmine-data-provider');
let pageSetup: PageSetup = new PageSetup();

const data = pageSetup.getData('Pledge', specificData);
const events = pageSetup.getEvents(pageSetup.getEnvironment().multipledge, data.events);

const flowPO = new FlowPage();
const donationSearchPO = new DonationSearchPage();

const donationCO = new Donation();
const navbarCO = new PledgeNavBarComponent();

// use event 17560
describe('TR(2999) Scenario -> Multi Pledge donation to participant - invalid custom amount : ', () => {
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
            it('should search for a participant to donate to', () => {
                navbarCO.donate();
                cy.get(donationSearchPO.container).should('be.visible')
                donationSearchPO.clickIndividualTab();
                donationSearchPO.search(data.donationName);
                //expect(donationSearchPO.searchComponent.searchResults.get(0).isPresent()).toBeTruthy();
                donationSearchPO.selectDonationResult(0);
            });
            it('Should validate the custom donation amount', () => {
                cy.get(donationCO.honourRollContainer).should('be.visible')
                cy.get(donationCO.donationContainer).should('be.visible')               
                donationCO.selectSponsorshipLevel(data.sponsorshipLevel);
                // enter a valid amount to start
                donationCO.setAmount(1);
                cy.get(donationCO.invalidDonationAmountValidationMsg).should('not.exist')
                // now enter an invalid amount
                donationCO.setAmount(data.donationAmount);
                // trying to advance should trigger the validation
                flowPO.continue();
                // check if the validation error came up
                cy.get(donationCO.invalidDonationAmountValidationMsg).should('be.visible')
            });
        });
    });
});
