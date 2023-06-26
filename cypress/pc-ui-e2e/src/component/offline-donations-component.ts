import { buildSelector, clearInputWithBackspace, selectDropDownOption} from '../utils/actions';

export class OfflineDonationsComponent {
  readonly container: any;
  readonly rows: any;
  readonly addDonationButton: any;
  public get addDonationDialog(): any {
    return $('.add-donation.mat-dialog-content');
  }
  public get confirmationDialog(): any {
    return $('pc-confirmation-dialog');
  }

  constructor() {
    this.container = buildSelector('.offline-donations-container');
    this.rows = buildSelector('tbody tr.mat-row');
    this.addDonationButton = buildSelector('.page-header button');  //NEEDS FIX, WON'T WORK
  }

  async getRowNameValue(row: any) {
    cy.get(row + '.mat-column-name.mat-cell');
  }

  async getRowAmountValue(row: any){
    cy.get(row+'.mat-column-amount.mat-cell')
    // return row.$('.mat-column-amount.mat-cell').getText();
  }

  async clickRowUpdateButton(row: any): Promise<void> {
    cy.get(row + 'button.mat-icon-button[aria-label="Edit"]').click()
    // return row
    //   .$('button.mat-icon-button[aria-label="Edit"]')
    //   .click();
  }

  async clickRowDeleteButton(row: any): Promise<void> {
    cy.get(row + 'button.mat-icon-button[aria-label="Remove"]').click()

    // return row
    //   .$('button.mat-icon-button[aria-label="Remove"]')
    //   .click();
  }

  // async waitForAddDonationDialogElement(): Promise<void> {
  //   await waitForElement(this.addDonationDialog);
  // }

  // async waitForConfirmationDialogElement(): Promise<void> {
  //   await waitForElement(this.confirmationDialog);
  // }

  async populateAddDonationDialogForm(
    values: {
      amount: string;
      paymentSource: string;
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      country: string;
      addressLine1: string;
      city: string;
      province: string;
      postalCode: string;
    }) {
    await this.populateFormField(this.addDonationDialog.$(`#amount`), values.amount);
    await this.populateFormField(this.addDonationDialog.$(`#paymentSource`), values.paymentSource, 'dropdown');
    await this.populateFormField(this.addDonationDialog.$(`#firstName`), values.firstName);
    await this.populateFormField(this.addDonationDialog.$(`#lastName`), values.lastName);
    await this.populateFormField(this.addDonationDialog.$(`#email`), values.email);
    await this.populateFormField(this.addDonationDialog.$(`#phone`), values.phone);
    await this.populateFormField(this.addDonationDialog.$(`#country`), values.country, 'dropdown');
    await this.populateFormField(this.addDonationDialog.$(`#addressLine1`), values.addressLine1);
    await this.populateFormField(this.addDonationDialog.$(`#city`), values.city);
    await this.populateFormField(this.addDonationDialog.$(`#province`), values.province, 'dropdown');
    await this.populateFormField(this.addDonationDialog.$(`#postalCode`), values.postalCode);
  }

  async populateFormField(element: any, value: any, fieldType: string = 'textbox') {
    // await waitForElement(element);
    // await scrollElemFinderIntoView(element);
    if (fieldType === 'dropdown') {
      selectDropDownOption(element, `${value}`);
    } else if (fieldType === 'textbox') {
      clearInputWithBackspace(element);
      await element.sendKeys(`${value}`);
    }
  }

  async submitAddDonationDialog(): Promise<void> {
    // await waitForElementToBeClickable(this.addDonationDialog.$('button.continue'));
    cy.get(this.addDonationDialog + 'button.continue').click()
    //return this.addDonationDialog.$('button.continue').click();
  }

  async submitConfirmationDialog(): Promise<void> {
    // await waitForElementToBeClickable(this.confirmationDialog.$('button.mat-flat-button'));
   cy.get(this.confirmationDialog + 'button.mat-flat-button').click();
  }
}
