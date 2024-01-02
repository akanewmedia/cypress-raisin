import { buildSelector, elementByClass, selectDropDownOption } from '../utils/actions';

export class AddRecipientsPopup {
  constructor() {
    this.container = buildSelector('pc-recipient-list');
    this.selectionHeader = buildSelector(this.container,'.modal-header');
    this.nameHeader = buildSelector(this.container,'.mat-sort-header-content');
    this.rows = buildSelector(this.container,'tbody tr.mat-row');
    this.addButton = buildSelector(this.container,'.mdc-button');
    this.typeDropDown = buildSelector(this.container,'.mat-mdc-select');
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

  selectType(type: string){
    selectDropDownOption(this.typeDropDown, type);
  }

  sortByName(){
    cy.contains(this.nameHeader, "Name").click()
  }
  clickAddButton(){
    cy.contains(this.addButton, 'Add recipients').click();
  }

  getRowNameValue(row: any) {
    cy.get('.mat-column-name.mat-mdc-cell' + row)
  }

  clickRowSelectCheckButton(row: any){
    cy.get(`tbody tr:nth-child(${row}) .mat-column-select .mat-mdc-checkbox` ).click();
  }

  isRowPresentByName(search: string){
    cy.get('.mat-column-name.mat-mdc-cell' + search).should('exist')
    // const searchItem = element(
    //   by.cssContainingText('.mat-column-name.mat-mdc-cell', search)
    // );
    // return searchItem.isPresent();
  }
}
