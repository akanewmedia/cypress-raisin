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

  constructor() {
    this.container = ('.donation-history');
    this.tableHeader = buildSelector(this.container, '.data-table-card__header');
    this.myDonationsButton = buildSelector(this.tableHeader, '.my-donations-button');
    this.teamDonationsButton = buildSelector(this.tableHeader,'.team-donations-button');
    this.selectionHeader = buildSelector(this.container ,'.mat-column-select.mat-header-cell')
    this.eventDropDown = buildSelector(this.container,'.mat-select');
    this.nameHeader = buildSelector(this.container, '.mat-column-name.mat-header-cell');
    this.amountHeader = buildSelector(this.container,'.mat-column-amount.mat-header-cell');
    this.dateHeader = buildSelector(this.container,'.mat-column-date.mat-header-cell');
    this.thankedHeader = buildSelector(this.container, '.mat-column-thanked.mat-header-cell');
    this.receiptIssuedHeader = buildSelector(this.container,'.mat-column-receiptIssued.mat-header-cell');
    this.messageHeader = buildSelector(this.container,'.mat-column-message.mat-header-cell');
    this.rows = buildSelector(this.container, 'tbody tr.mat-row');
  }

  async selectEvent(type: string): Promise<void> {
    selectDropDownOption(this.eventDropDown, type);
  }

  getDonations() {
    cy.get(this.rows);
  }

  async sortByName(): Promise<void> {
    cy.get(this.nameHeader).click();
  }

  async sortByAmount(): Promise<void> {
    cy.get(this.amountHeader).click();
  }

  async sortByDate(): Promise<void> {
    cy.get(this.dateHeader).click();
  }

  async sortByThanked(): Promise<void> {
    cy.get(this.thankedHeader).click();
  }

  async sortByReceiptIssued(): Promise<void> {
    cy.get(this.receiptIssuedHeader).click();
  }

  async sortByMessage(): Promise<void> {
    cy.get(this.messageHeader).click();
  }

  async getRowNameValue(row: any) {
    cy.get(row + '.mat-column-name.mat-cell')
    // return row.$('.mat-column-name.mat-cell').getText();
  }

  async getRowAmountValue(row: any) {
    cy.get(row + '.mat-column-amount.mat-cell')
    //return row.$('.mat-column-amount.mat-cell').getText();
  }

  async getRowDateValue(row: any) {
    cy.get(row + '.mat-column-date.mat-cell')
    //return row.$('.mat-column-date.mat-cell').getText();
  }

  async clickReissueTaxReceiptButton(row: any): Promise<void> {
    cy.get(row + '.mat-column-receiptIssued.mat-cell button.action-btn').click()
    // return row
    //   .$('.mat-column-receiptIssued.mat-cell button.action-btn')
    //   .click();
  }

  async isRowReissueTaxReceiptButtonVisible(row: any) {
    cy.get(row + '.mat-column-receiptIssued .action-btn').should('be.visible')
    //return row.$('.mat-column-receiptIssued .action-btn').isDisplayed();
  }

  async isRowReissueTaxReceiptButtonPresent(row: any) {
    cy.get(row + '.mat-column-receiptIssued .action-btn').should('be.visible')
    //return row.$('.mat-column-receiptIssued .action-btn').isPresent();
  }

  async clickMyDonationsButton(): Promise<void> {
    cy.get(this.myDonationsButton).click();
    //return this.myDonationsButton.click();
  }

  async clickTeamDonationsButton(): Promise<void> {
    cy.get(this.teamDonationsButton).click();
    //return this.teamDonationsButton.click();
  }
}
