import { PageSetup } from "../../../support/utils/pageSetup";
import { PledgeRxfNavBarComponent } from "../../../support/components/pledgeRxfNavbar.co";
import { EnitytDetails } from "../../../support/components/entityDetails.co";
import { DonationSearchPage } from "../../../support/pages/Pledge/donationSearch";
import * as specificData from '../../../data/Pledge/VerifyOldCustomPart.json'
import { RegisterComponent } from "../../../support/components/register.co";

//The information regarding the Library
const using = require('jasmine-data-provider');
let pageSetup: PageSetup = new PageSetup();

const data = pageSetup.getData('Pledge', specificData);
const events = pageSetup.getEvents(pageSetup.getEnvironment().multipledge, data.events);

const donationSearchPO = new DonationSearchPage();
const registerCO = new RegisterComponent();
const navbarCO = new PledgeRxfNavBarComponent();
const entityDetailsCO = new EnitytDetails();


// TODO: This file needs to be broken apart
describe('Scenario -> Multi Pledge group navigation: ', () => {
    using(events, event => {

        describe('Tests New and Old Custom Parts', () => {
            //doSetup(event);
            it('Should visit NEW custom part and verify if Registartion Items are visible', () => {
                pageSetup.goToEvent(data.newCustomPart);
                pageSetup.waitForPageLoad()
                cy.url().should('include', data.newCustomPart)
                // click Register
                navbarCO.register();
                // Verify if reg items are present
                cy.get(registerCO.container).should('be.visible')
                // clears cache
                pageSetup.cleanupPage()
            });

            it('Should visit OLD custom part and verify if Registartion Items are visible', () => {
                pageSetup.goToEvent(data.oldCustomPart);
                pageSetup.waitForPageLoad()
                cy.url().should('include', data.oldCustomPart)
                // click Register
                navbarCO.register();
                // Verify if reg items are present
                cy.get(registerCO.container).should('be.visible')
                // clears cache
                pageSetup.cleanupPage()
            });

        });

    });
});
