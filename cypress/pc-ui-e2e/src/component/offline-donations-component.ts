import { buildSelector, clearInputWithBackspace, selectDropDownOption} from '../utils/actions';

export class OfflineDonationsComponent {
  readonly container: any;
  readonly rows: any;
  readonly addDonationButton: any;
  offlineDonationForm:any
  addDonationDialog: any
  confirmationDialog: any 

  constructor() {
    this.addDonationDialog = ('.add-donation.mat-dialog-content ')
    this.confirmationDialog = ('pc-confirmation-dialog ')
    this.container = buildSelector('.offline-donations-container ');
    this.rows = buildSelector('tbody tr.mat-row');
    this.addDonationButton = buildSelector(this.container + '.page-header button');  //NEEDS FIX, WON'T WORK
    this.offlineDonationForm = buildSelector('.cdk-overlay-pane mat-dialog-container')
  }

  clickAddDonation(){
    cy.contains(this.addDonationButton, "Add donation").click()
  }

  clickSubmitAddDonation(){
    cy.contains('.add-donation__actions button', "Add donation").click()
  }

  clickUpdateDonation(){
    cy.contains('.add-donation__actions button', "Update donation").click()
  }

  verifyOfflineDonationRequiredFieldErrors(data) {
    const getTexts = ($errors) => {
      return Cypress._.map($errors, 'innerText')
    }
    cy.get(this.offlineDonationForm + '.mat-mdc-form-field-subscript-wrapper .error-message').should('exist').then(getTexts).should('deep.equal', data)
  }

  getRowNameValue(value:string) {
    cy.get(this.rows).eq(0).within(() =>{
      cy.get('.mat-column-name.mat-cell').should('contain.text', value)
    })
  }

  getRowAmountValue(value:string){
    cy.get(this.rows).eq(0).within(() =>{
      cy.get('.mat-column-amount.mat-cell').should('contain.text', value)
    })
  }

  async clickRowUpdateButton(): Promise<void> {
    cy.get(this.rows).eq(0).within(() =>{
      cy.get('button.mat-icon-button[aria-label="Edit"]').click()
    })
  }
  

  async clickRowDeleteButton(): Promise<void> {
    cy.get(this.rows).eq(0).within(() =>{
      cy.get('button.mat-icon-button[aria-label="Remove"]').click()
    })
  }

  // async waitForAddDonationDialogElement(): Promise<void> {
  //   waitForElement(this.addDonationDialog);
  // }

  // async waitForConfirmationDialogElement(): Promise<void> {
  //   waitForElement(this.confirmationDialog);
  // }

  populateAddDonationDialogForm(
    values: {
      amount: string;
      paymentSource: string;
      title:string
      firstName: string;
      middleName: string;
      lastName: string;
      email: string;
      emailType: string
      phoneType:string
      phoneNumber: string;
      phoneExtension:string
      gender:string
      addressType:string
      companyName:string
      country: string;
      addressLine1: string;
      city: string;
      province: string;
      postalCode: string;
      attribute1: string
      attribute2: string
      attribute3: string
      attribute4: string
      attribute5: string
      correspondenceLanguage:string
      dateOfBirth:string
    }) {
    this.populateFormField((this.addDonationDialog + '#amount'), values.amount);
    this.populateFormField((this.addDonationDialog + '#paymentSource'), values.paymentSource, 'dropdown');
    this.populateFormField((this.addDonationDialog + '#title'), values.title, 'dropdown');
    this.populateFormField((this.addDonationDialog + '#firstName'), values.firstName);
    this.populateFormField((this.addDonationDialog + '#middleName'), values.middleName);
    this.populateFormField((this.addDonationDialog + '#lastName'), values.lastName);
    this.populateFormField((this.addDonationDialog + '#email'), values.email);
    this.populateFormField((this.addDonationDialog + '#emailType'), values.emailType, 'dropdown');
    this.populateFormField((this.addDonationDialog + '#phoneType'), values.phoneType, 'dropdown');
    this.populateFormField((this.addDonationDialog + '#phone'), values.phoneNumber);
    this.populateFormField((this.addDonationDialog + '#phoneExtension'), values.phoneExtension);
    this.populateFormField((this.addDonationDialog + '#gender'), values.gender, 'dropdown');
    this.populateFormField((this.addDonationDialog + `#country`), values.country, 'dropdown');
    this.populateFormField((this.addDonationDialog + `#addressLine1`), values.addressLine1);
    this.populateFormField((this.addDonationDialog + `#companyName`), values.companyName);
    //this.populateFormField((this.addDonationDialog + `#addressType`), values.addressType, 'dropdown');
    this.populateFormField((this.addDonationDialog + `#city`), values.city);
    this.populateFormField((this.addDonationDialog + `#attribute1`), values.attribute1);
    this.populateFormField((this.addDonationDialog + `#attribute2`), values.attribute2);
    this.populateFormField((this.addDonationDialog + `#attribute3`), values.attribute3);
    this.populateFormField((this.addDonationDialog + `#attribute4`), values.attribute4);
    this.populateFormField((this.addDonationDialog + `#attribute5`), values.attribute5);
    this.populateFormField((this.addDonationDialog + `#province`), values.province, 'dropdown');
    this.populateFormField((this.addDonationDialog + `#postalCode`), values.postalCode);
    this.populateFormField((this.addDonationDialog + `#correspondenceLanguage`), values.correspondenceLanguage, 'dropdown');
    //this.selectDate(this.addDonationDialog + `.mat-datepicker-toggle`);
    this.clickCheckbox((this.addDonationDialog + `#optOut mat-checkbox`));
    this.clickCheckbox((this.addDonationDialog + `#optOutToShare mat-checkbox`));    
  }

  // updateOfflineDonation(
  //   values: {
  //     amount: string;
  //     firstName: string;
  //     lastName: string;
  //     email: string;
  //     phoneNumber: string;
  //     addressLine1: string;
  //     city: string;
  //     postalCode: string;
  //   }) {
  //   this.populateFormField((this.addDonationDialog + '#amount'), values.amount);
  //   this.populateFormField((this.addDonationDialog + '#firstName'), values.firstName);
  //   this.populateFormField((this.addDonationDialog + '#lastName'), values.lastName);
  //   this.populateFormField((this.addDonationDialog + '#email'), values.email);
  //   this.populateFormField((this.addDonationDialog + '#phone'), values.phoneNumber);
  //   this.populateFormField((this.addDonationDialog + `#addressLine1`), values.addressLine1);
  //   this.populateFormField((this.addDonationDialog + `#city`), values.city);
  //   this.populateFormField((this.addDonationDialog + `#postalCode`), values.postalCode);
  // }

  selectDate(element: any){
    cy.get(element).click().then(()=>{
      cy.get('div .mat-calendar-body-today').click()
    })
  }

  clickCheckbox(element){
    cy.get(element).click()
  }

  populateFormField(element: any, value: any, fieldType: string = 'textbox') {
    // waitForElement(element);
    // scrollElemFinderIntoView(element);
    if (fieldType === 'dropdown') {
      selectDropDownOption(element, `${value}`);
    } else if (fieldType === 'textbox') {
      ///clearInputWithBackspace(element);
      cy.get(element).clear().type(`${value}`);
    }
  }

  async submitAddDonationDialog(): Promise<void> {
    // waitForElementToBeClickable(this.addDonationDialog.$('button.continue'));
    cy.get(this.addDonationDialog + 'button.continue').click()
    //return this.addDonationDialog.$('button.continue').click();
  }

  async submitConfirmationDialog(): Promise<void> {
    // waitForElementToBeClickable(this.confirmationDialog.$('button.mat-flat-button'));
   cy.get(this.confirmationDialog + 'button.mat-flat-button').click();
  }
}
