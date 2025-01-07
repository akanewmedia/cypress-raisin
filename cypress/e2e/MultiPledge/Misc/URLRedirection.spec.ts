import { PageSetup } from "../../../support/utils/pageSetup";
import * as specificData from '../../../data/Pledge/MultiPledgeDonationWhileLoggedInWithPaypal.json'

const using = require('jasmine-data-provider');
let pageSetup: PageSetup = new PageSetup();

const data = pageSetup.getData('Pledge', specificData);
const events = pageSetup.getEvents(pageSetup.getEnvironment().multipledge, data.events);


describe('Should redirect to correct URL with /ui/', () => {
    using(events, event => {
        describe(`${event}`, () => {
            it('Should go to both pages and verify if it loads properly', () => {
                if (pageSetup.setEnvironment() == "UAT"){
                    cy.visit('https://qa.raisin.events/ui/vmpeventtest')
                    cy.url().should('eq', 'https://qa.raisin.events/ui/vmpeventtest');
                    pageSetup.waitForPageLoad()
                    cy.visit('https://qa.raisin.events/vmpeventtest')  
                    cy.url().should('eq', 'https://qa.raisin.events/ui/vmpeventtest');
                    pageSetup.waitForPageLoad()
                } 
                else if (pageSetup.setEnvironment() == "RAISIN-PROD" || pageSetup.setEnvironment() == "PROD" ) {
                    cy.visit('https://supportthepmcf.ca/ui/RFF')
                    cy.url().should('eq', 'https://supportthepmcf.ca/ui/RFF');
                    pageSetup.waitForPageLoad()
                    cy.visit('https://supportthepmcf.ca/RFF/')  
                    cy.url().should('eq', 'https://supportthepmcf.ca/ui/RFF');
                    pageSetup.waitForPageLoad()
                } 
            }); 
        });
    });
});
