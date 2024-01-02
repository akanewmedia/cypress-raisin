import { buildSelector } from '../utils/actions';

export class ContactsTable {
  constructor() {
    this.container = buildSelector('.list-container');
    this.selectionHeader = buildSelector('.mat-sort-header-content');
    this.nameHeader = buildSelector(this.container, '.table-column', this.selectionHeader);
    this.rows = buildSelector(this.container,'tbody tr.mat-mdc-row');
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

   getRowNameValue(row: any) : Cypress.Chainable{
    cy.get(this.rows).eq(row).within(()=>{
      return cy.get('.mat-column-name.mat-cell')
    })    
    return cy.get('.mat-column-name.mat-cell')    
  }

  getStatus(row: any) : Cypress.Chainable{
    cy.get(this.rows).eq(row).within(()=>{
      return cy.get('.mat-column-status')
    })    
    return cy.get('.mat-column-status')    
  }


   clickRowSelectCheckButton(row) {
    cy.get(this.rows).eq(row).within(()=>{
      cy.get('.mat-column-select .mat-mdc-checkbox').click()
    })
  }

   clickRowEditButton() {
    cy.get(this.rows).eq(0).within(()=>{
      cy.get('.mat-column-action .edit-button').click()
    })    
  }

   clickRowDeleteButton() {
    cy.get('.mat-column-action .delete-button').first().click()
  }

   clickEmailButton(row: any) {
    cy.get(this.rows).eq(row).within(()=>{
      cy.get('.action-icon-button.email-button').click()
    })
  }

   isRowPresentByName(search: string) {
    cy.get('.mat-column-name.mat-cell' + search).should('exist')
    // element(
    //   by.cssContainingText('.mat-column-name.mat-cell', search)
    // );
    // return searchItem.isPresent();
  }

   clickRowCaptainToggleButton(row: any) {
    cy.get(this.rows).eq(row).within(()=>{
      cy.get('.mdc-switch').click()
    })
    // return browser.actions().mouseMove(row
    //   .$('.mat-column-captain')
    //   .$('.mat-slide-toggle'))
    //   .click().perform();
  }

   getRowCaptainToggleValue(row: any, bool: boolean) {
    cy.get(this.rows).eq(row).within(()=>{
      if (bool)
      cy.get('.mat-column-captain .mdc-switch').should('be.checked');
      else
      cy.get('.mat-column-captain .mat-mdc-slide-toggle').should('not.be.checked');
    })
    //return row.$('.mat-column-captain .mat-mdc-slide-toggle-input').getAttribute("aria-checked");
  }

  getRowCaptainToggleLabelValue(row: any, bool:boolean) {
    cy.get(this.rows).eq(row).within(()=>{
      if (bool)
      cy.get('.mdc-form-field label span').should('contain.text', "Yes");
      else
      cy.get('.mdc-form-field label span').should('contain.text', "No");
    })
  }
}
