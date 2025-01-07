import { PageSetup } from "../../../support/utils/pageSetup";
import * as specificData from '../../../data/Pledge/MultiPledgeDonationWhileLoggedInWithPaypal.json'

const using = require('jasmine-data-provider');
let pageSetup: PageSetup = new PageSetup();

const data = pageSetup.getData('Pledge', specificData);
const events = pageSetup.getEvents(pageSetup.getEnvironment().multipledge, data.events);


describe('Should be able to load both custom URLs for event', () => {
    using(events, event => {
        describe(`${event}`, () => {
            it('Should go to both pages and verify if it loads properly', () => {
                cy.visit('https://tx.akaraisin.com/ui/rxfmpaeetest')
                cy.url().should('eq', 'https://tx.akaraisin.com/ui/rxfmpaeetest');
                pageSetup.waitForPageLoad()
                cy.visit('https://tx.akaraisin.com/ui/rxfmpaee')  
                cy.url().should('eq', 'https://tx.akaraisin.com/ui/rxfmpaee');
                pageSetup.waitForPageLoad()  

            }); 
        });
    });
});
