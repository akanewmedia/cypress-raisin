import { PageSetup } from "../../../support/utils/pageSetup";
import * as specificData from '../../../data/Pledge/MultiPledgeDonationWhileLoggedInWithPaypal.json'

const using = require('jasmine-data-provider');
let pageSetup: PageSetup = new PageSetup();

const data = pageSetup.getData('Pledge', specificData);
const events = pageSetup.getEvents(pageSetup.getEnvironment().multipledge, data.events);


describe('PROD Domain Masking test ', () => {
    using(events, event => {
        describe(`${event}`, () => {
            it('Should go to a domain masking page', () => {
                cy.visit('https://donate.ottawafoodbank.ca/ui/donations')
                cy.url().should('eq', 'https://donate.ottawafoodbank.ca/ui/donations');
                pageSetup.waitForPageLoad()   
            }); 
        });
    });
});
