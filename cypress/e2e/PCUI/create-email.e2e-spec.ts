import { Sidebar } from '../../pc-ui-e2e/src/component/sidebar.component';
import { SnackbarCO } from '../../pc-ui-e2e/src/component/snackbar';
import { CreateEmailPage } from '../../pc-ui-e2e/src/page/create-email.page';
import { pressEsc } from '../../pc-ui-e2e/src/utils/actions';
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
      pageSetup.goToEvent(event);
      pageSetup.waitForPageLoad()
      loginPage.login('DaveAutoTestCaptain', 'Akaaka1!')
    });


    it('should go to email', () => {
      sidebar.clickEmailPanel();
      sidebar.clickCreateEmailLink();
      cy.get(createEmailPage.container).should('exist')
      cy.get(createEmailPage.header).should('have.text' , 'E-mail')
      // expect(createEmailPage.container.isPresent()).toBeTruthy();
      // expect(createEmailPage.header.getText()).toContain('E-mail');
    });

    it('should select Thank You template', () => {
      createEmailPage.selectType('Thank You');
      cy.wait(3000);
      cy.get(createEmailPage.templateTypeDropDown).should('contain.text', 'Thank You')
      // expect(createEmailPage.templateTypeDropDown.getText()).toContain(
      //   'English 1'
      // );

      // browser.sleep(1000);
      // createEmailPage.subjectField.getAttribute('textContent').then((value) => {
      //   expect(value).toContain('Test Subject 1');
      // });

      // expect(getKendoEditorContent(createEmailPage.messageField)).toContain(
      //   '<b> THis is a test body Numero <u>1</u></b>'
      // );
    });

    it('should click and view organization message', () => {
      createEmailPage.clickOrgMsgButton();
      cy.get(createEmailPage.orgMsg).should('contain.text', 'This is an Organization Test Message!')
      // expect(createEmailPage.orgMsg.getText()).toContain(
      //   'THis is a test org message 1'
      // );
    });

    it('should change the template and save it as a new template', async () => {
      createEmailPage.enterSubject('new subject');
      cy.wait(1000);
      createEmailPage.enterMessage('new message');
      createEmailPage.clickSaveAsButton();
      cy.get(createEmailPage.saveTemplateOverlay).should('exist')
      //expect(createEmailPage.saveTemplateOverlay.isPresent()).toBeTruthy();
      createEmailPage.enterTemplateName('new template');

      cy.get(createEmailPage.saveTemplateSaveButton).should('exist')
      //expect(createEmailPage.saveTemplateSaveButton.isPresent()).toBeTruthy();
      pressEsc();

    });

    it('it should enter invalid email and check send button is disabled', () => {
      createEmailPage.enterSendTo('c.litvin@akanewmedia.com');
      createEmailPage.enterSendTo('noemail');
      createEmailPage.enterSubject('new subject');
      createEmailPage.enterMessage('new message');
      createEmailPage.scrollToSendEmailButton();
      cy.get(createEmailPage.sendButton).should('be.disabled')
      //expect(createEmailPage.sendButton.isEnabled()).toBeFalsy();
    });

    it('should go to my contacts', () => {
      sidebar.clickEmailLink();
      sidebar.clickMyContactsLink();
      cy.get(myContactsPage.container).should('exist')
      //expect(myContactsPage.container.isPresent()).toBeTruthy();
      cy.get(myContactsPage.header).should('have.text', 'My Contacts')
      //expect(myContactsPage.header.getText()).toContain('My Contacts');
    });

    it('it should select the first 2 rows to email then add 2 more from pop up', async () => {
      await myContactsPage.contactsListComponent.contactsTable.clickRowSelectCheckButton(
        myContactsPage.contactsListComponent.contactsTable.getContacts().get(0)
      );
      await myContactsPage.contactsListComponent.contactsTable.clickRowSelectCheckButton(
        myContactsPage.contactsListComponent.contactsTable.getContacts().get(1)
      );
      await myContactsPage.contactsListComponent.clickEmailSelectedButton();
      cy.wait(1000);
      cy.get(createEmailPage.container).should('exist')
      //expect(createEmailPage.container.isPresent()).toBeTruthy();
      cy.get(createEmailPage.header).should('have.text', 'E-mail')
      //expect(createEmailPage.header.getText()).toContain('E-mail');
      await createEmailPage.selectType('English 1');
      await createEmailPage.clickAddReceipentsButton();
      await createEmailPage.addRecipientsPopup.selectType('All');
      await createEmailPage.addRecipientsPopup.clickRowSelectCheckButton(
        createEmailPage.addRecipientsPopup.getContacts().get(2)
      );
      await createEmailPage.addRecipientsPopup.clickRowSelectCheckButton(
        createEmailPage.addRecipientsPopup.getContacts().get(3)
      );
      await createEmailPage.addRecipientsPopup.clickAddButton();
      cy.wait(5000)
      // await browser.wait(
      //   ExpectedConditions.elementToBeClickable(createEmailPage.sendButton)
      // );
      await createEmailPage.clickSendEmailButton();
      //await waitForElement(snackbarCO.messageContainer);
      cy.get(snackbarCO.messageContainer).should('have.text', 'Email sent to 4 contact(s)')
      // await expect(snackbarCO.messageContainer.getText()).toContain(
      //   'Email sent to 4 contact(s)'
      // );
    });

    it('it should click on the + email pop up and add users', () => {
      cy.get(createEmailPage.container).should('exist')
      cy.get(createEmailPage.header).should('have.text', 'E-mail')
      //expect(createEmailPage.container.isPresent()).toBeTruthy();
      //expect(createEmailPage.header.getText()).toContain('E-mail');
      createEmailPage.selectType('English 1');
      createEmailPage.clickAddReceipentsButton();
      createEmailPage.addRecipientsPopup.selectType('Contacts');
      createEmailPage.addRecipientsPopup.clickRowSelectCheckButton(
        createEmailPage.addRecipientsPopup.getContacts().get(0)
      );
      createEmailPage.addRecipientsPopup.clickRowSelectCheckButton(
        createEmailPage.addRecipientsPopup.getContacts().get(1)
      );
      createEmailPage.addRecipientsPopup.clickAddButton();

      createEmailPage.clickSendEmailButton();
      cy.wait(1000);
      cy.get(snackbarCO.messageContainer).should('have.text', 'Email sent to 2 contact(s)')
      // expect(snackbarCO.messageContainer.getText()).toContain(
      //   'Email sent to 2 contact(s)'
      // );
    });
  })
});
