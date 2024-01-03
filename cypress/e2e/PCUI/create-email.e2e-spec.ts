import { Sidebar } from '../../pc-ui-e2e/src/component/sidebar.component';
import { SnackbarCO } from '../../pc-ui-e2e/src/component/snackbar';
import { CreateEmailPage } from '../../pc-ui-e2e/src/page/create-email.page';
import { MyContactsPage } from '../../pc-ui-e2e/src/page/my-contacts.page';
import { PageSetup } from "../../support/utils/pageSetup";
import * as specificData from '../../data/Pledge/base.json'
import { LoginPage } from '../../pc-ui-e2e/src/page/login.page'


let loginPage: LoginPage;
let sidebar: Sidebar;
let createEmailPage: CreateEmailPage;
let snackbarCO: SnackbarCO;
let myContactsPage: MyContactsPage;

loginPage = new LoginPage();
sidebar = new Sidebar();
createEmailPage = new CreateEmailPage();
myContactsPage = new MyContactsPage();
snackbarCO = new SnackbarCO();

const using = require('jasmine-data-provider');
let pageSetup: PageSetup = new PageSetup();

const data = pageSetup.getData('Pledge', specificData);
const events = pageSetup.getEvents(pageSetup.getEnvironment().multipledge, data.events);

describe('create a new email:', () => {
  using(events, event => {

    before(() => {
      pageSetup.cleanupPage()
      pageSetup.goToEvent(event);
      pageSetup.waitForPageLoad()
      loginPage.login('DaveAutoTestCaptain', 'Akaaka1!')
    });


    it('should go to email', () => {
      sidebar.clickEmailPanel();
      sidebar.clickCreateEmailLink();
      cy.get(createEmailPage.container).should('exist')
      cy.get(createEmailPage.header).should('have.text', 'E-mail')
    });

    it('should select Thank You template', () => {
      createEmailPage.selectType('Thank You');
      cy.wait(3000);
      cy.get(createEmailPage.templateTypeDropDown).should('contain.text', 'Thank You')

    });

    it('should click and view organization message', () => {
      createEmailPage.clickOrgMsgButton();
      cy.get(createEmailPage.orgMsg).should('contain.text', 'This is an Organization Test Message!')
    });

    it('should change the template and save it as a new template', () => {
      createEmailPage.enterSubject('new subject');
      cy.wait(1000);
      createEmailPage.enterMessage('new message');
      createEmailPage.clickSaveAsButton();
      cy.get(createEmailPage.saveTemplateOverlay).should('exist')
      createEmailPage.enterTemplateName('new template');
    });

    it('it should enter invalid email and check send button is disabled', () => {
      createEmailPage.enterSendTo('c.litvin@akanewmedia.com');
      createEmailPage.enterSendTo('noemail');
      createEmailPage.enterSubject('new subject');
      createEmailPage.enterMessage('new message');
      createEmailPage.scrollToSendEmailButton();
      cy.get(createEmailPage.sendButton).should('be.disabled')
    });

    it('should go to my contacts', () => {
      sidebar.clickEmailLink();
      sidebar.clickMyContactsLink();
      cy.get(myContactsPage.container).should('exist')
      cy.get(myContactsPage.header).should('have.text', 'My Contacts')
    });

    it('it should select the first 2 rows to email', () => {
      myContactsPage.contactsListComponent.contactsTable.clickRowSelectCheckButton(0);
      myContactsPage.contactsListComponent.contactsTable.clickRowSelectCheckButton(1);
      myContactsPage.contactsListComponent.clickEmailSelectedButton();
      cy.wait(1000);
      cy.get(createEmailPage.container).should('exist')
      cy.get(createEmailPage.header).should('have.text', 'E-mail')
      createEmailPage.selectType('English 1');
    });

    it('it should click on the + email pop up and add users', () => {
      createEmailPage.clickAddReceipentsButton();
      createEmailPage.addRecipientsPopup.selectType('All');
      createEmailPage.addRecipientsPopup.sortByName()
      createEmailPage.addRecipientsPopup.clickRowSelectCheckButton(1);
      createEmailPage.addRecipientsPopup.clickRowSelectCheckButton(2);
      createEmailPage.addRecipientsPopup.clickAddButton();
      cy.wait(2000)
      createEmailPage.clickSendEmailButton();
      cy.get(snackbarCO.messageContainer).should('contain.text', 'Email queued to 3 contact(s). Status will update shortly.')
    });
  })
});
