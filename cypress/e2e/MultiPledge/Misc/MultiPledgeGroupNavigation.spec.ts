import { PageSetup } from "../../../support/utils/pageSetup";
import { PledgeRxfNavBarComponent } from "../../../support/components/pledgeRxfNavbar.co";
import { EnitytDetails } from "../../../support/components/entityDetails.co";
import { DonationSearchPage } from "../../../support/pages/Pledge/donationSearch";
import * as specificData from '../../../data/Pledge/MultiPledgeGroupNavigation.json'

//The information regarding the Library
const using = require('jasmine-data-provider');
let pageSetup: PageSetup = new PageSetup();

const data = pageSetup.getData('Pledge', specificData);
const events = pageSetup.getEvents(pageSetup.getEnvironment().multipledge, data.events);

const donationSearchPO = new DonationSearchPage();
const navbarCO = new PledgeRxfNavBarComponent();
const entityDetailsCO = new EnitytDetails();

const doSetup = event => {
    before(() => {
        pageSetup.goToEvent(event);
        pageSetup.waitForPageLoad()
    });
    after(() => {
        pageSetup.goToEvent(event);
        pageSetup.cleanupPage();
    });
};

// TODO: This file needs to be broken apart
describe('Scenario -> Multi Pledge group navigation: ', () => {
    using(events, event => {
        doSetup(event);
        describe('Navigating to an inactive group (Team Member page)', () => {
            //doSetup(event);
            it('Should click on the location link, but stay on the same page (Team Member page)', () => {
                const url = `/participant/${data.teamMemberInInactiveGroup.userId}`;
                pageSetup.goToEvent(`${event}${url}`);
                navbarCO.donate();
                cy.get(donationSearchPO.container).should('be.visible')
                donationSearchPO.navigateDonationResult(data.teamMemberInInactiveGroup.firstName);
                if(cy.get(entityDetailsCO.locationLinkDisabled).get('.disable')){
                    cy.get(entityDetailsCO.locationLinkDisabled).should('be.visible')
                }
                else {
                    cy.get(entityDetailsCO.locationLinkDisabled).click()
                }
                // should not navigate to the group page because it is inactive
                // so we check if we are still on the same page
                cy.url().should('include', url)
            });
        });

        describe('Navigating to an inactive group (Team Captain page)', () => {
            //doSetup(event);
            it('Should click on the location link, but stay on the same page (Team Captain page)', () => {
                const url = `/participant/${data.teamCaptainInInactiveGroup.userId}`;
                pageSetup.goToEvent(`${event}${url}`);
                navbarCO.donate();
                cy.get(donationSearchPO.container).should('be.visible')
                donationSearchPO.navigateDonationResult(data.teamCaptainInInactiveGroup.firstName);
                if(cy.get(entityDetailsCO.locationLinkDisabled).get('.disable')){
                    cy.get(entityDetailsCO.locationLinkDisabled).should('be.visible')
                }
                else {
                    cy.get(entityDetailsCO.locationLinkDisabled).should('be.visible').click
                }
                // should not navigate to the group page because it is inactive
                // so we check if we are still on the same page
                cy.url().should('include', url)
            });
        });

        describe('Navigating directly to an inactive group', () => {
            //doSetup(event);
            it('Should display page not found navigating to an inactive group', () => {
                const url = `/g/${data.inactiveLocation.id}`;
                pageSetup.goToEvent(`${event}${url}`);
                //expect(element(by.tagName('p')).getText()).toBe('Page Not Found');
            });
        });

        describe('Joining a team in an inactive group from team captains page', () => {
            //doSetup(event);
            it('Should not be able to press the Join Team button because its group is inactive', () => {
                const url = `/participant/${data.teamCaptainInInactiveGroup.userId}`;
                pageSetup.goToEvent(`${event}${url}`);
                navbarCO.donate();
                cy.get(donationSearchPO.container).should('be.visible')
                donationSearchPO.navigateDonationResult(data.teamCaptainInInactiveGroup.firstName);
                cy.get(entityDetailsCO.joinTeamButton).should('not.exist')
            });
        });

        describe('Joining a team in an inactive group from team members page', () => {
            //doSetup(event);
            it('Should not be able to press the Join Team button because its group is inactive', () => {
                const url = `/participant/${data.teamMemberInInactiveGroup.userId}`;
                pageSetup.goToEvent(`${event}${url}`);
                navbarCO.donate();
                cy.get(donationSearchPO.container).should('be.visible')
                donationSearchPO.navigateDonationResult(data.teamMemberInInactiveGroup.firstName);
                cy.get(entityDetailsCO.joinTeamButton).should('not.exist')
            });
        });
    });
});
