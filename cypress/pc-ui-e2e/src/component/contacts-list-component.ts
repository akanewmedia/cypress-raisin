import { ContactsTable } from './contacts-table';
import { buildSelector } from '../utils/actions';
import { EditContactModal } from './edit-contact-modal.component';

export class ContactsListComponent {
  container: any;
  // header: any;
  search: any;
  // typeDropDown: any;
  buttonSearchClear: any;
  // selectAllCheckbox: any;
  emailAllButton: any;
  emailSelectedButton: any;
  emailThankButton: any;
  newEmailButton: any;
  // selectSingleCheckbox: any;
  contactsTable: ContactsTable;
  confirmDeleteBox: any;
  editContactModal: EditContactModal;

  constructor(baseContainer: any) {
    this.container = baseContainer;
    this.search = buildSelector(this.container, '.search input.filter[id="dataTableFilter"]');
    this.buttonSearchClear = buildSelector(this.container, 'search__clear.mat-icon-button');
    this.emailAllButton = buildSelector(this.container,'.email-all-button');
    this.emailSelectedButton = buildSelector(this.container,'.email-selected-button');
    this.emailThankButton = buildSelector(this.container,'.email-thank-button');
    this.newEmailButton = buildSelector(this.container,'.new-email-button');
    this.confirmDeleteBox = ('.mat-mdc-dialog-container ');
    this.contactsTable = new ContactsTable();
    this.editContactModal = new EditContactModal();
  }

  async isVisible() {
    cy.get(this.container).should('be.visible')
    // await scrollElemFinderIntoView(this.container);
    // return this.container.isDisplayed();
  }

  async getRowNameValue(row: any){
    cy.get(row + '.mat-column-name.mat-mdc-cell')
    //return row.$('.mat-column-name.mat-mdc-cell').getText();
  }

  async clickButtonSearchClear(): Promise<void> {
    cy.get(this.buttonSearchClear).click()
    // await scrollElemFinderIntoView(this.buttonSearchClear);
    // return this.buttonSearchClear.click();
  }

  async clickEmailAllButton(): Promise<void> {
    cy.get(this.emailAllButton).click()
    // await scrollElemFinderIntoView(this.emailAllButton);
    // return this.emailAllButton.click();
  }

  async clickEmailSelectedButton(): Promise<void> {
    cy.get(this.emailSelectedButton).click()
    // await scrollElemFinderIntoView(this.emailSelectedButton);
    // return this.emailSelectedButton.click();
  }

  async clickEmailThankButton(): Promise<void> {
    cy.get(this.emailThankButton).click()
    // await scrollElemFinderIntoView(this.emailThankButton);
    // return this.emailThankButton.click();
  }

  async clickConfirmYes(): Promise<void> {
    cy.contains(this.confirmDeleteBox + '.mdc-button', "Yes").click()
    // return browser.actions().mouseMove(this.confirmDeleteBox.$('.mat-flat-button'))
    //   .click().perform();
  }

  async clickConfirmNo(): Promise<void> {
    cy.get(this.confirmDeleteBox + '.mat-stroked-button').click()
    // return browser.actions().mouseMove(this.confirmDeleteBox.$('.mat-stroked-button'))
    //   .click().perform();
  }

  async clickNewEmailButton(): Promise<void> {
    cy.get(this.newEmailButton).click()
    // return browser.actions().mouseMove(this.newEmailButton)
    //   .click().perform();
  }

  async enterSearch(input: string): Promise<void> {
    cy.get(this.search).clear().type(input)
    // await scrollElemFinderIntoView(this.search);
    // clearInputWithBackspace(this.search);
    // return this.search.sendKeys(input);
  }

  async clickDeleteSelectedButton(): Promise<void> {
    cy.get(this.container + '.delete-selected-button').click()
    // return browser.actions().mouseMove(this.container.$('.delete-selected-button'))
    //   .click().perform();
  }
}
