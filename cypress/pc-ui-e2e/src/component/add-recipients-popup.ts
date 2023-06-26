import { buildSelector, elementByClass, selectDropDownOption } from '../utils/actions';

export class AddRecipientsPopup {
  constructor() {
    this.container = buildSelector('pc-recipient-list');
    this.selectionHeader = buildSelector(this.container,'.modal-header');
    this.nameHeader = buildSelector(this.container,'.mat-sort-header-button');
    this.rows = buildSelector(this.container,'tbody tr.mat-row');
    this.addButton = buildSelector(this.container,'.mat-flat-button');
    this.typeDropDown = buildSelector(this.container,'.mat-select');
  }
  readonly container: any;
  readonly selectionHeader: any;
  readonly nameHeader: any;
  readonly addButton: any;
  readonly rows: any;
  readonly typeDropDown: any;

  getContacts(): any {
    cy.get(this.rows);
  }

  async selectType(type: string): Promise<void> {
    selectDropDownOption(this.typeDropDown, type);
  }

  async sortByName(): Promise<void> {
    cy.get(this.nameHeader).click();
  }
  async clickAddButton(): Promise<void> {
    cy.get(this.addButton).click();
  }

  async getRowNameValue(row: any) {
    cy.get('.mat-column-name.mat-cell' + row)
  }

  async clickRowSelectCheckButton(row: any): Promise<void> {
    cy.get('.mat-checkbox' + row).click();
  }

  async isRowPresentByName(search: string){
    cy.get('.mat-column-name.mat-cell' + search).should('exist')
    // const searchItem = element(
    //   by.cssContainingText('.mat-column-name.mat-cell', search)
    // );
    // return searchItem.isPresent();
  }
}
