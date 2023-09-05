import { Sidebar } from '../../pc-ui-e2e/src/component/sidebar.component';
import { SnackbarCO } from '../../pc-ui-e2e/src/component/snackbar';
import { CreateEmailPage } from '../../pc-ui-e2e/src/page/create-email.page';
import { FollowUpsPage } from '../../pc-ui-e2e/src/page/follow-ups.page';
import { PageSetup } from "../../support/utils/pageSetup";
import { LoginPage } from '../../pc-ui-e2e/src/page/login.page'
import * as specificData from '../../data/Pledge/base.json'

let loginPage: LoginPage;
let sidebar: Sidebar = new Sidebar();
let createEmailPage: CreateEmailPage = new CreateEmailPage();
let snackbarCO: SnackbarCO = new SnackbarCO();
let followUpsPage: FollowUpsPage = new FollowUpsPage();

loginPage = new LoginPage();

const using = require('jasmine-data-provider');
let pageSetup: PageSetup = new PageSetup();

const data = pageSetup.getData('Pledge', specificData);
const events = pageSetup.getEvents(pageSetup.getEnvironment().multipledge, data.events);

describe('send email from follow ups:', () => {

  using(events, event => {
    before(() => {
      pageSetup.cleanupPage()
      pageSetup.goToEvent(event);
      pageSetup.waitForPageLoad()
      loginPage.login('DaveAutoTestCaptain', 'Akaaka1!')
    });

    it('should go to follow-ups', () => {
      sidebar.clickFollowUpsLink();      
      cy.get(followUpsPage.header).should('be.visible')          
      cy.get(followUpsPage.header).should('contain.text', 'Follow Ups')
    });
  
    it('search for smith01 and should find them thanked', () => {
      // sidebar.clickFollowUpsLink();
      followUpsPage.enterContactSearch('smith01');      
      followUpsPage.getContactsTable().getRowNameValue(0).should('contain.text', 'Bobby Smith01') 
      followUpsPage.getContactsTable().getStatus(0).should('contain.text', 'Thanked') 
    });
  
    it('search for smith02 and send email, should auto populate follow up template', () => {
      sidebar.clickFollowUpsLink();
      followUpsPage.enterContactSearch('smith02');      
      followUpsPage.getContactsTable().getRowNameValue(0).should('contain.text', 'Bobby Smith02')  
      followUpsPage.getContactsTable().clickEmailButton(0);
      cy.get(createEmailPage.header).should('be.visible')    
      cy.get(createEmailPage.header).should('contain.text', 'E-mail')  
      cy.get(createEmailPage.templateTypeDropDown).should('contain.text', 'Follow-Up')  
    });
  
    it('search for smith03 and send email, should auto populate follow up template and send email', () => {
      sidebar.clickFollowUpsLink();
      followUpsPage.enterContactSearch('smith03');
      followUpsPage.getContactsTable().getRowNameValue(0).should('contain.text', 'Bobby Smith03')  
      followUpsPage.getContactsTable().clickEmailButton(0);
      cy.get(createEmailPage.header).should('be.visible')    
      cy.get(createEmailPage.header).should('contain.text', 'E-mail')  
      cy.get(createEmailPage.templateTypeDropDown).should('contain.text', 'Follow-Up')  
      createEmailPage.clickSendEmailButton();      
      cy.get(snackbarCO.messageContainer).should('contain.text', 'Email queued to 1 contact(s). Status will update shortly.')      
      snackbarCO.closeSnackBar();
    });

  });
});
