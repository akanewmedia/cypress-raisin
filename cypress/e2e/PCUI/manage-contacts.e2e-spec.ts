import { Sidebar } from '../../pc-ui-e2e/src/component/sidebar.component';
import { SnackbarCO } from '../../pc-ui-e2e/src/component/snackbar';
import { MyContactsPage } from '../../pc-ui-e2e/src/page/my-contacts.page';
import { } from '../../pc-ui-e2e/src/utils/actions';
import { LoginPage } from '../../pc-ui-e2e/src/page/login.page';
import { PageSetup } from '../../support/utils/pageSetup';
import * as specificData from '../../pc-ui-e2e/mock/data/edit-page/edit-my-page.json'

let sidebar: Sidebar = new Sidebar();
let myContactsPage: MyContactsPage = new MyContactsPage();
let snackbarCO: SnackbarCO = new SnackbarCO();
let loginPage: LoginPage = new LoginPage()
let pageSetup: PageSetup = new PageSetup();

const using = require('jasmine-data-provider');

const data = pageSetup.getData('Pledge', specificData);
const events = pageSetup.getEvents(pageSetup.getEnvironment().multipledge, data.events);


describe('add a new contact and sort, edit contact then delete:', () => {

  using(events, event => {

    before(() => {
      pageSetup.cleanupPage()
      pageSetup.goToEvent(event);
      pageSetup.waitForPageLoad()
      loginPage.login(data.user.username, data.user.password)
    });

     


    it('should go to my contacts', () => {
      sidebar.clickEmailLink();
      cy.wait(1000);
      sidebar.clickMyContactsLink();
      cy.get(myContactsPage.container).should('be.visible')
      cy.get(myContactsPage.header).should('contain.text', 'My Contacts')
    });

    it('should sort contacts', () => {
      myContactsPage.contactsListComponent.contactsTable.verifyFirstRow('Bobby Smith')
      myContactsPage.sortTableByName();
      myContactsPage.contactsListComponent.contactsTable.verifyFirstRow('Victor Volunteer')
    });

    it('should click on add contact and add new contact',  () => {
      const number = new Date().getTime();
      myContactsPage.clickAddNewContact();
      myContactsPage.contactsListComponent.editContactModal.enterContactInfo(
        'Simon',
        'George',
        `Simon${number}@akanewmedia.com`,
        '555-555-5555'
      );
      myContactsPage.contactsListComponent.editContactModal.clickSaveModalButton();
      snackbarCO.validateSnackBarMessage('Contact saved');
    });

    it('should find contact',  () => {
      myContactsPage.enterSearch('Bobby')
      myContactsPage.contactsListComponent.contactsTable.verifyFirstRow('Bobby Smith')
    });

    it('should click on edit contact button, make changes and save changes',  () => {
      const number = new Date().getTime();

      myContactsPage.enterSearch('Simon');
      cy.wait(1000)
      myContactsPage.contactsListComponent.contactsTable.clickRowEditButton();
      cy.get(myContactsPage.contactsListComponent.editContactModal.container).should('be.visible')
      myContactsPage.contactsListComponent.editContactModal.enterContactInfo(
        'Hoang777',
        'Le',
        `Hoang${number}@akanewmedia.com`,
        '777-777-7777'
      );
      myContactsPage.contactsListComponent.editContactModal.clickSaveModalButton()
      cy.wait(1500)
      cy.reload()
      myContactsPage.enterSearch('Hoang777');
    });    

    it('it should delete contact',  () => {

      myContactsPage.enterSearch('Hoang');
      cy.wait(1000)
      myContactsPage.contactsListComponent.contactsTable.clickRowDeleteButton();
      myContactsPage.contactsListComponent.clickConfirmYes();
      snackbarCO.validateSnackBarMessage('1 contact(s) deleted.');
    });        
  });
});
