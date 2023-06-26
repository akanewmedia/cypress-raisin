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
    this.header = buildSelector(this.container,'.page-header');
    this.addNewContact = buildSelector(this.header,'.add-contact-btn');
  }

  async clickAddNewContact(): Promise<void> {
    cy.get(this.addNewContact).click();
  }
  async sortTableByName(): Promise<void> {
    return this.contactsListComponent.contactsTable.sortByName();
  }

  async clickButtonSearchClear(): Promise<void> {
    return this.contactsListComponent.clickButtonSearchClear();
  }

  async enterSearch(contact: string): Promise<void> {
    return this.contactsListComponent.enterSearch(contact);
  }
}
