import { ContactsListComponent } from '../component/contacts-list-component';
import { ContactsTable } from '../component/contacts-table';
import { buildSelector, clearInputWithBackspace, elementByClass } from '../utils/actions';

export class FollowUpsPage {
  container: any;
  header: any;
  contactsListComponent: ContactsListComponent;

  constructor() {
    this.container = buildSelector('.follow-ups-component');
    this.contactsListComponent = new ContactsListComponent(this.container);
    this.header = buildSelector(this.container, '.page-header');
  }

  async isVisible() {
    // scrollElemFinderIntoView(this.container);
    cy.get(this.container).should('be.visible');
    // return this.container.isDisplayed();
  }

  getContactsTable(): ContactsTable {
    // scrollElemFinderIntoView(this.contactsListComponent.contactsTable.container);
    return this.contactsListComponent.contactsTable;
  }

  async enterContactSearch(input: string): Promise<void> {
    // await scrollElemFinderIntoView(this.container);
    clearInputWithBackspace(this.contactsListComponent.search);
    cy.get(this.contactsListComponent.search).type(input);
  }
}
