import { ContactsListComponent } from '../component/contacts-list-component';
import { buildSelector } from '../utils/actions';

export class MyContactsPage {
  container: any;
  header: any;
  contactsListComponent: ContactsListComponent;
  addNewContact: any;

  constructor() {
    this.container = buildSelector('.my-contacts');
    this.contactsListComponent = new ContactsListComponent(this.container);
    this.header = buildSelector(this.container,'.page-header h1');
    this.addNewContact = buildSelector(this.header,'.add-contact-btn');
  }

  clickAddNewContact() {
    cy.get(this.addNewContact).click();
  }
  sortTableByName() {
    return this.contactsListComponent.contactsTable.sortByName();
  }

  clickButtonSearchClear() {
    return this.contactsListComponent.clickButtonSearchClear();
  }

  enterSearch(contact: string) {
    return this.contactsListComponent.enterSearch(contact);
  }
}
