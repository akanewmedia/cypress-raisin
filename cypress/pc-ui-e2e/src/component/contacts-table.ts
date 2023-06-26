import { buildSelector } from '../utils/actions';

export class ContactsTable {
  constructor() {
    this.container = buildSelector('.list-container');
    this.selectionHeader = buildSelector(this.container,'.mat-header-row');
    this.nameHeader = buildSelector('.table-column', this.selectionHeader);
    this.rows = buildSelector(this.container,'tbody tr.mat-row');
  }
  readonly container: any;
  readonly selectionHeader: any;
  readonly nameHeader: any;

  readonly rows: any;

  getContacts(): any {
    cy.get(this.rows);
  }

  async sortByName(): Promise<void> {
    cy.get(this.nameHeader).click();
  }

  async getRowNameValue(row: any) {
    cy.get(row + '.mat-column-name.mat-cell')
    //return row.$('.mat-column-name.mat-cell').getText();
  }

  async clickRowSelectCheckButton(row: any): Promise<void> {
    cy.get(row + '.mat-column-select' + '.mat-checkbox' ).click()
    //return row.$('.mat-column-select').$('.mat-checkbox').click();
  }

  async clickRowEditButton(row: any): Promise<void> {
    cy.get(row+ '.mat-column-action.mat-cell' + '.action-icon-button.edit-button').click()
    // return row
    //   .$('.mat-column-action.mat-cell')
    //   .$('.action-icon-button.edit-button')
    //   .click();
  }

  async clickRowDeleteButton(row: any): Promise<void> {
    cy.get(row + '.mat-column-action.mat-cell' + '.action-icon-button.delete-button').click()
    // return browser.actions().mouseMove(row
    //   .$('.mat-column-action.mat-cell')
    //   .$('.action-icon-button.delete-button'))
    //   .click().perform();;
  }

  async clickEmailButton(row: any): Promise<void> {
    cy.get(row + '.mat-column-action.mat-cell' + '.action-icon-button.email-button').click()
    // return browser.actions().mouseMove(row
    //       .$('.mat-column-action.mat-cell')
    //       .$('.action-icon-button.email-button')).click().perform();
  }

  async isRowPresentByName(search: string) {
    cy.get('.mat-column-name.mat-cell' + search).should('exist')
    // element(
    //   by.cssContainingText('.mat-column-name.mat-cell', search)
    // );
    // return searchItem.isPresent();
  }

  async clickRowCaptainToggleButton(row: any): Promise<void> {
    cy.get(row + '.mat-column-captain' + '.mat-slide-toggle').click()
    // return browser.actions().mouseMove(row
    //   .$('.mat-column-captain')
    //   .$('.mat-slide-toggle'))
    //   .click().perform();
  }

  async getRowCaptainToggleValue(row: any) {
    cy.get(row + '.mat-column-captain .mat-slide-toggle-input' + 'aria-checked')
    //return row.$('.mat-column-captain .mat-slide-toggle-input').getAttribute("aria-checked");
  }
}
