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

  selectType(type: string){
    selectDropDownOption(this.typeDropDown, type);
  }

  sortByName(){
    cy.get(this.nameHeader).click();
  }
  clickAddButton(){
    cy.contains(this.addButton, 'Add recipients').click();
  }

  getRowNameValue(row: any) {
    cy.get('.mat-column-name.mat-cell' + row)
  }

  clickRowSelectCheckButton(row: any){
    cy.get(`tbody tr:nth-child(${row}) .mat-column-select .mat-checkbox` ).click();
  }

  isRowPresentByName(search: string){
    cy.get('.mat-column-name.mat-cell' + search).should('exist')
    // const searchItem = element(
    //   by.cssContainingText('.mat-column-name.mat-cell', search)
    // );
    // return searchItem.isPresent();
  }
}
