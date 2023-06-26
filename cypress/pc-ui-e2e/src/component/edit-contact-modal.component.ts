import { buildSelector } from '../utils/actions';

export class EditContactModal {
  readonly container: any;
  readonly header: any;
  readonly closeModalButton: any;
  readonly firstName: any;
  readonly lastName: any;
  readonly emailAddress: any;
  readonly phoneNumber: any;
  readonly cancelModalButton: any;
  readonly saveModalButton: any;
  constructor() {
    this.container = ('.mat-dialog-container');
    this.header = buildSelector(this.container,'.modal-header__inner');
    this.closeModalButton = buildSelector(this.container, '.mat-icon-button');
    this.firstName = buildSelector(this.container,'.mat-input-element[formcontrolname="firstName"]');
    this.lastName = buildSelector(this.container,'.mat-input-element[formcontrolname="lastName"]');
    this.emailAddress = buildSelector(this.container, '.mat-input-element[formcontrolname="email"]'
    );
    this.phoneNumber = buildSelector(this.container, '.mat-input-element[formcontrolname="phone"]');
    this.cancelModalButton = buildSelector(this.container, '.btn-cancel');
    this.saveModalButton = buildSelector(this.container,'.mat-flat-button');
  }

  async isPresent() {
    cy.get(this.container).should('exist')
    // return this.container.isPresent();
  }

  // async waitForModalToClose(timeout: number = 1000): Promise<any> {
  //   return browser.wait(
  //     ExpectedConditions.stalenessOf(this.container),
  //     timeout
  //   );
  // }

  async isVisible() {
    cy.get(this.container).should('be.visible')
    //return this.container.isDisplayed();
  }

  async enterContactInfo(
    first: string,
    last: string,
    email: string,
    phone: string
  ): Promise<void> {
    this.enterFirstName(first);
    this.enterLastName(last);
    this.enterEmailAddress(email);
    return this.enterPhoneNumber(phone);
  }

  async enterFirstName(input: string): Promise<void> {
    cy.get(this.firstName).clear().type(input)
    // await this.firstName.clear();
    // return this.firstName.sendKeys(input);
  }

  async enterLastName(input: string): Promise<void> {
    cy.get(this.lastName).clear().type(input)

    // await this.lastName.clear();
    // return this.lastName.sendKeys(input);
  }

  async enterEmailAddress(input: string): Promise<void> {
    cy.get(this.emailAddress).clear().type(input)

    // await this.emailAddress.clear();
    // return this.emailAddress.sendKeys(input);
  }

  async enterPhoneNumber(input: string): Promise<void> {
    cy.get(this.phoneNumber).clear().type(input)

    // await this.phoneNumber.clear();
    // return this.phoneNumber.sendKeys(input);
  }

  async clickCloseModalButton(): Promise<void> {
    cy.get(this.closeModalButton).click();
  }

  async clickCancelModalButton(): Promise<void> {
    cy.get(this.cancelModalButton).click();
  }

  async clickSaveModalButton(): Promise<void> {
    cy.get(this.saveModalButton).click();
  }
}
