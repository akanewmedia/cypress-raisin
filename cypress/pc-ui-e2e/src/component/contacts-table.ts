import { buildSelector } from '../utils/actions';

export class ContactsTable {
  constructor() {
    this.container = buildSelector('.list-container');
    this.selectionHeader = buildSelector('.mat-sort-header-content');
    this.nameHeader = buildSelector(this.container, '.table-column', this.selectionHeader);
    this.rows = buildSelector(this.container,'tbody tr.mat-row');
    this.nameRow = ('.identity .identity__name')
  }
  //.list-container .table-column .mat-sort-header-content
  readonly container: any;
  readonly selectionHeader: any;
  readonly nameHeader: any;
  readonly nameRow:any
  readonly rows: any;

  getContacts(): any {
    cy.get(this.rows);
  }

  verifyFirstRow(name){
    cy.get(this.rows).eq(0).within(()=>{
      cy.get(this.nameRow).first().should('contains.text', name)
    })
  }

  verifyLastAdded(name){
    cy.get(this.rows).eq(0).within(()=>{
      cy.get(this.nameRow).last().should('contains.text', name)
    })
  }
  

   sortByName() {
    cy.contains(this.nameHeader, "Name").click();
  }

   getRowNameValue(row: any) {
    cy.get(row + '.mat-column-name.mat-cell')
    //return row.$('.mat-column-name.mat-cell').getText();
  }

   clickRowSelectCheckButton(row) {
    cy.get(`tbody tr:nth-child(${row}) .mat-column-select .mat-checkbox` ).click()
  }

   clickRowEditButton() {
    cy.get(this.rows).eq(0).within(()=>{
      cy.get('.mat-column-action.mat-cell ' + '.edit-button').click()
    })    
  }

   clickRowDeleteButton() {
    cy.get('.mat-column-action' + ' .delete-button').first().click()
  }

   clickEmailButton(row: any) {
    cy.get(row + '.mat-column-action.mat-cell' + '.action-icon-button.email-button').click()
    // return browser.actions().mouseMove(row
    //       .$('.mat-column-action.mat-cell')
    //       .$('.action-icon-button.email-button')).click().perform();
  }

   isRowPresentByName(search: string) {
    cy.get('.mat-column-name.mat-cell' + search).should('exist')
    // element(
    //   by.cssContainingText('.mat-column-name.mat-cell', search)
    // );
    // return searchItem.isPresent();
  }

   clickRowCaptainToggleButton(row: any) {
    cy.get(row + '.mat-column-captain' + '.mat-slide-toggle').click()
    // return browser.actions().mouseMove(row
    //   .$('.mat-column-captain')
    //   .$('.mat-slide-toggle'))
    //   .click().perform();
  }

   getRowCaptainToggleValue(row: any) {
    cy.get(row + '.mat-column-captain .mat-slide-toggle-input' + 'aria-checked')
    //return row.$('.mat-column-captain .mat-slide-toggle-input').getAttribute("aria-checked");
  }
}
