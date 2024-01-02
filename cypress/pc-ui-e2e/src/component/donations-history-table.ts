import { buildSelector, selectDropDownOption } from '../utils/actions';

export class DonationsHistoryTable {
  readonly container: any;
  readonly selectionHeader: any;
  readonly eventDropDown: any;
  readonly nameHeader: any;
  readonly amountHeader: any;
  readonly dateHeader: any;
  readonly thankedHeader: any;
  readonly receiptIssuedHeader: any;
  readonly messageHeader: any;
  readonly rows: any;
  readonly tableHeader: any;
  readonly myDonationsButton: any;
  readonly teamDonationsButton: any;
  readonly nameRow:any;
  readonly amountRow: any;
  readonly dateRow: any;

  constructor() {
    this.container = ('.donation-history');
    this.tableHeader = buildSelector(this.container, '.data-table-card__header');
    this.myDonationsButton = buildSelector(this.tableHeader, '.my-donations-button');
    this.teamDonationsButton = buildSelector(this.tableHeader,'.team-donations-button');
    this.selectionHeader = buildSelector(this.container ,'.mat-column-select.mat-mdc-header-cell')
    this.eventDropDown = buildSelector(this.container,'.mat-mdc-select');
    this.nameHeader = buildSelector(this.container, '.mat-column-name.mat-mdc-header-cell');
    this.amountHeader = buildSelector(this.container,'.mat-column-amount.mat-mdc-header-cell');
    this.dateHeader = buildSelector(this.container,'.mat-column-date.mat-mdc-header-cell');
    this.thankedHeader = buildSelector(this.container, '.mat-column-thanked.mat-mdc-header-cell');
    this.receiptIssuedHeader = buildSelector(this.container,'.mat-column-receiptIssued.mat-mdc-header-cell');
    this.messageHeader = buildSelector(this.container,'.mat-column-message.mat-mdc-header-cell');
    this.rows = buildSelector(this.container, 'tbody tr.mat-mdc-row');
    this.nameRow = buildSelector('.mat-column-name.mat-mdc-cell')
    this.amountRow = buildSelector('.mat-column-amount.mat-mdc-cell')
    this.dateRow = buildSelector('td.mat-column-date')
  }

  selectEvent(type: string){
    selectDropDownOption(this.eventDropDown, type);
  }

  getDonations() {
    cy.get(this.rows);
  }

  sortByName(){
    cy.get(this.nameHeader).click();
  }

  sortByAmount(){
    cy.get(this.amountHeader).click();
  }

  sortByDate(){
    cy.get(this.dateHeader).click();
  }

  sortByThanked(){
    cy.get(this.thankedHeader).click();
  }

  sortByReceiptIssued(){
    cy.get(this.receiptIssuedHeader).click();
  }

  sortByMessage(){
    cy.get(this.messageHeader).click();
  }

  verifyNameAndEmailFirstRow(name){
    cy.get(this.rows).eq(0).within(()=>{
      cy.get(this.nameRow).first().should('contains.text', name)
    })
  }

  verifyAmountFirstRow(name){
    cy.get(this.rows).eq(0).within(()=>{
      cy.get(this.amountRow).first().should('contains.text', name)
    })
  }

  verifyDateFirstRow(name){
    cy.get(this.rows).eq(0).within(()=>{
      cy.get(this.dateRow).first().should('contains.text', name)
    })
  }

  getRowNameValue(row: any) {
    cy.get(row + '.mat-column-name.mat-mdc-cell')
    // return row.$('.mat-column-name.mat-mdc-cell').getText();
  }

  getRowAmountValue(row: any) {
    cy.get(row + '.mat-column-amount.mat-mdc-cell')
    //return row.$('.mat-column-amount.mat-mdc-cell').getText();
  }

  getRowDateValue(row: any) {
    cy.get(row + '.mat-column-date.mat-mdc-cell')
    //return row.$('.mat-column-date.mat-mdc-cell').getText();
  }

  clickReissueTaxReceiptButton(){
    cy.get('.mat-column-receiptIssued.mat-mdc-cell button.action-btn').first().click()
    // return row
    //   .$('.mat-column-receiptIssued.mat-mdc-cell button.action-btn')
    //   .click();
  }

  isRowReissueTaxReceiptButtonVisible() {
    cy.get('.mat-column-receiptIssued .action-btn').should('be.visible')
    //return row.$('.mat-column-receiptIssued .action-btn').isDisplayed();
  }

  isRowReissueTaxReceiptButtonPresent(row: any) {
    cy.get(row + '.mat-column-receiptIssued .action-btn').should('be.visible')
    //return row.$('.mat-column-receiptIssued .action-btn').isPresent();
  }

  clickMyDonationsButton(){
    cy.get(this.myDonationsButton).click();
    //return this.myDonationsButton.click();
  }

  clickTeamDonationsButton(){
    cy.get(this.teamDonationsButton).click();
    //return this.teamDonationsButton.click();
  }
}
