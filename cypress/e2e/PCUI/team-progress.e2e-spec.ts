import { Sidebar } from '../../pc-ui-e2e/src/component/sidebar.component';
import { SnackbarCO } from '../../pc-ui-e2e/src/component/snackbar';
import { CreateEmailPage } from '../../pc-ui-e2e/src/page/create-email.page';
import { TeamProgressPage } from '../../pc-ui-e2e/src/page/team-progress.page';
import { PageSetup } from "../../support/utils/pageSetup";
import * as specificData from '../../data/Pledge/base.json'
import { LoginPage } from '../../pc-ui-e2e/src/page/login.page'

let loginPage: LoginPage;
let sidebar: Sidebar = new Sidebar();
let createEmailPage: CreateEmailPage = new CreateEmailPage();
let snackbarCO: SnackbarCO = new SnackbarCO();
let teamProgressPage: TeamProgressPage = new TeamProgressPage();

loginPage = new LoginPage();

const using = require('jasmine-data-provider');
let pageSetup: PageSetup = new PageSetup();

const data = pageSetup.getData('Pledge', specificData);
const events = pageSetup.getEvents(pageSetup.getEnvironment().multipledge, data.events);

describe('team progress functionality + send emails:', () => {  
  using(events, event => {
  before(() => {
    pageSetup.cleanupPage()
    pageSetup.goToEvent(event);
    pageSetup.waitForPageLoad()
    loginPage.login('DaveAutoTestCaptain', 'Akaaka1!')
  });
  
  it('should go to team-progress', () => {
    sidebar.clickTeamExpandLink();
    sidebar.clickTeamProgressPageLink();        
    cy.get(teamProgressPage.header).should('contain.text', 'Team Progress')
  });

  it('select one team members and send email', () => {
    teamProgressPage.contactsListComponent.contactsTable.clickEmailButton(0);        
    cy.get(teamProgressPage.header).should('be.visible')    
    cy.get(createEmailPage.header).should('contain.text', 'E-mail')    
    cy.get(createEmailPage.templateTypeDropDown).should('contain.text', 'E-mail to Teammates')
    createEmailPage.clickSendEmailButton();
    cy.get(snackbarCO.messageContainer).should('contain.text', 'Email queued to 1 contact(s). Status will update shortly.')
  });

  it('select multiple team members and send email', () => {
    sidebar.clickTeamProgressPageLink();
    teamProgressPage.contactsListComponent.contactsTable.clickRowSelectCheckButton(0);
    teamProgressPage.contactsListComponent.contactsTable.clickRowSelectCheckButton(1);
    teamProgressPage.contactsListComponent.contactsTable.clickRowSelectCheckButton(2);
    teamProgressPage.contactsListComponent.contactsTable.clickRowSelectCheckButton(3);
    teamProgressPage.contactsListComponent.clickEmailSelectedButton();        
    cy.get(createEmailPage.container).should('be.visible')    
    cy.get(createEmailPage.header).should('contain.text', 'E-mail')    
    cy.get(createEmailPage.templateTypeDropDown).should('contain.text', 'E-mail to Teammates')
    createEmailPage.clickSendEmailButton();
    cy.get(snackbarCO.messageContainer).should('contain.text', 'Email queued to 4 contact(s). Status will update shortly.')
  });

  it('should toggle captain slider', () => {
    sidebar.clickTeamProgressPageLink();      
    teamProgressPage.contactsListComponent.contactsTable.getRowCaptainToggleLabelValue(0,false);   
    teamProgressPage.contactsListComponent.contactsTable.clickRowCaptainToggleButton(0);
    teamProgressPage.contactsListComponent.contactsTable.getRowCaptainToggleLabelValue(0,true);           
    teamProgressPage.contactsListComponent.contactsTable.clickRowCaptainToggleButton(0);
    teamProgressPage.contactsListComponent.contactsTable.getRowCaptainToggleLabelValue(0,false);   
  })
  });
});