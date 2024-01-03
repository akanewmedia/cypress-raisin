import { findDropDownOption, selectDropDownOption } from "../../../support/utils/actions";
import { RegisterComponent } from "../../../support/components/register.co";
import { PageSetup } from "../../../support/utils/pageSetup";
import { PledgeRxfNavBarComponent } from "../../../support/components/pledgeRxfNavbar.co";
import { VolunteerRegister } from "../../../support/components/volunteerRegister.co";
import * as specificData from '../../../data/Pledge/MultiPledgeGroupSelection.json'

//The information regarding the Library
const using = require('jasmine-data-provider');
let pageSetup: PageSetup = new PageSetup();

const data = pageSetup.getData('Pledge', specificData);
const events = pageSetup.getEvents(pageSetup.getEnvironment().multipledge, data.events);


const registerCO = new RegisterComponent();
const navbarCO = new PledgeRxfNavBarComponent();
const volunteerRegisterCO = new VolunteerRegister();

describe('Scenario -> Multi Pledge group selection: ', () => {
    using(events, event => {
        before(() => {
            pageSetup.goToEvent(event);
            pageSetup.waitForPageLoad()
            //pageSetup.logoutIfLoggedIn();
        });
        after(() => {
            pageSetup.cleanupPage();
        });        
        describe('Attempting to select an active group', () => {            
            it('Should find the inactive group in the group selector', () => {
                cy.wait(2000)
                navbarCO.register();
                cy.get(registerCO.container).should('be.visible')
                findDropDownOption(registerCO.subEventGroupSelector, data.activeLocation.name).then((option => {
                    cy.get(option).should('exist')
                }));
            });
        });
        describe('Attempting to select expired groups', () => {            
            it('Should NOT find the expired group in the group selector', () => {
                cy.wait(2000)
                navbarCO.register();
                cy.get(registerCO.container).should('be.visible')
                findDropDownOption(registerCO.subEventGroupSelector, data.expiredLocation.name).then(option => {
                    cy.get(option).should('not.exist')
                });
            });
        });
        describe('Attempting to select inactive groups', () => {            
            it('Should NOT find the inactive group in the group selector', () => {
                cy.wait(2000)
                navbarCO.register();
                cy.get(registerCO.container).should('be.visible')
                findDropDownOption(registerCO.subEventGroupSelector, data.inactiveLocation.name).then(option => {
                    cy.get(option).should('not.exist')
                });
            });
        });
        describe('Attempting to select expired groups on the volunteer form', () => {            
            it('Should NOT find the expired group in the group selector', () => {
                cy.wait(2000)
                navbarCO.clickOnVolunteerMenuItem();
                cy.wait(2000)
                cy.get(volunteerRegisterCO.container).should('be.visible')
                findDropDownOption(volunteerRegisterCO.subEventGroupSelector, data.expiredLocation.name).then(option => {
                    cy.get(option).should('not.exist')
                });
            });
        });
        describe('Attempting to select inactive groups on the volunteer form', () => {                
            it('Should NOT find the inactive group in the group selector', () => {
                cy.wait(2000)
                navbarCO.clickOnVolunteerMenuItem();
                cy.wait(2000)
                cy.get(volunteerRegisterCO.container).should('be.visible')
                findDropDownOption(volunteerRegisterCO.subEventGroupSelector, data.inactiveLocation.name).then(option => {
                    cy.get(option).should('not.exist')
                });
            });
        });
    });
});
