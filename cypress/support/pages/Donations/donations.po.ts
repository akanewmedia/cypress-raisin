import { buildSelector, elementByClass, elementsByClass, pressEsc, pressTab, scrollToTop, waitForElementToBeVisible } from '../../utils/actions';
import { DonationStepper } from '../../components/donationStepper.co'
import { DonationSuccessComponent } from '../../components/donationSuccess.co'
import { DonationDetails } from '../../components/donationDetails.co';
import { TributeInformation } from '../../components/donationTributeInformation.co';
import { DonationDonorInformation } from '../../components/donationDonorInformation.co';
import { DonationPaymentInformation } from '../../components/donationPaymentInformation.co';

/**
 * Representation of the Donations page
 */
export class DonationsPage {

  top: any;
  container: any;
  stepper: DonationStepper;
  donationDetails: DonationDetails;
  tributeInformation: TributeInformation;
  donorInformation: DonationDonorInformation;
  paymentInformation: DonationPaymentInformation;
  success: DonationSuccessComponent;

  constructor() {
    this.top = buildSelector('.page-content-20000');
    this.container = buildSelector('.base-page');
    this.stepper = new DonationStepper();
    this.donationDetails = this.stepper.donationDetails;
    this.tributeInformation = this.stepper.tributeInformation;
    this.donorInformation = this.stepper.donorInformation;
    this.paymentInformation = this.stepper.paymentInformation;
    this.success = new DonationSuccessComponent();
  }

  waitForDonationsContainerToBeLoaded() {
    return waitForElementToBeVisible('.donations-container');
  }

  waitForDonationsHomeWidgetToBeLoaded() {
    return waitForElementToBeVisible('.quick-donate-widget-container');
  }

  // private waitForDonationsElementToBeLoaded(cssClass: string) {
  //   return waitForElementToBeVisible(elementByClass(cssClass));
  // }


  /**
   * Scrolls back to the top of the page
   */
  scrollToTop() {
    scrollToTop();
  }

  isStepDisplayed(index) {
    return this.stepper.isStepDisplayed(index);
  }

  getTouchUIValue() {
    return this.donorInformation.getTouchUIValue();
  }

  /*
   *@desc Function which specifially clicks a donation type tab given the value to select
   *@param value - the value to select
   */
  selectDonationType(value) {
    this.donationDetails.selectDonationType(value);
  }

  /**
   * Verifies the correct donation type is selected
   * @param value - the type that is expected to be selected
   */
  verifySelectedDonationType(value) {
    this.donationDetails.verifySelectedDonationType(value);
  }

  /*
   *@desc Function which specifially clicks a donation frequency button given the value to select
   *@param value - the value to select
   */
  selectDonationFrequency(value) {
    this.donationDetails.selectDonationFrequency(value);
  }

  /**
   * Verifies the correct donation frequency is selected
   * @param value - the frequency that is expected to be selected
   */
  verifySelectedDonationFrequency(value) {
    this.donationDetails.verifySelectedDonationFrequency(value);
  }

  /**
   * Selects an amount from the donation matrix; 
   * if the value is not in the matrix, types a custom amount
   * @param {string} value - the amount
   */
  selectDonationAmount(value) {
    this.donationDetails.enterOtherAmount(value);
  }

  /**
   * Clicks on the other amount field
   */
  clickOtherAmount() {
    this.donationDetails.clickOtherAmount();
  }

  /**
   * Clicks on the other amount field
   */
  clearOtherAmount() {
    this.donationDetails.clearCustomAmount();
    cy.wait(2000)
  }

  /*
   *@desc Function which specifially clicks a donation matrix button given the value to select
   *@param value - the value to select
   */
  selectDonationMatrixAmount(value) {
    this.donationDetails.selectDonationMatrixAmount(value);
  }

  /**
   * Waits for the donations matric to show up and verifies the values
   *
   * @param {*} matrixValues
   * @memberof DonationsPage
   */
  verifyDonationMatrix(matrixValues) {
    waitForElementToBeVisible(this.donationDetails.container);
    expect(this.getDonationMatrixAmounts()).eq(matrixValues);
  }

  /**
   * Verifies the correct donation matrix button is selected
   * @param value - the value that is expected to be selected
   */
  verifySelectedDonationMatrixAmount(value) {
    this.donationDetails.verifySelectedDonationMatrixAmount(value);
  }

  /*
   *@desc Method to get the text values from all the donation matrix buttons
   *@returns {string []} donationMatrixValues - the text values of the donation matrix buttons, eg. ['$1', '$2']
   */
  getDonationMatrixAmounts(data= null) {
    return this.donationDetails.getDonationMatrixValues(data);
  }

  /**
   * Verifies the message regarding the start date of a recurring donation (next month)
   * @param {string} message - the start of the message
   * @param {string} lang - the BCP 47 language code
   * @param {number} startDay - the first payment day of the month
   */
  verifyStartDateMessageNextMonthDate(message, lang, startDay) {
    // There is an issue in the date conversion that will be fixed later
    //console.log('There is an issue in the date conversion that will be fixed later', message, lang, startDay);
    return this.donationDetails.verifyStartDateMessageNextMonthDate(message, lang, startDay);
  }

  /**
   * Verifies the message regarding the start date of a recurring donation (next available date)
   * @param {string} message - the start of the message
   * @param {string} lang - the BCP 47 language code
   * @param {number[]} startDays - the payment days of the month
   */
  verifyStartDateMessageNextAvailableDate(message, lang, startDays) {
    // There is an issue in the date conversion that will be fixed later
    console.log('There is an issue in the date conversion that will be fixed later', message, lang, startDays);
    return this.donationDetails.verifyStartDateMessageNextAvailableDate(message, lang, startDays);
  }

  /**
   * Verifies the message regarding the start date of a recurring donation (tomorrow)
   * @param {string} message - the start of the message
   * @param {string} lang - the BCP 47 language code
   */
  verifyStartDateMessageNextDate(message, lang) {
    return this.donationDetails.verifyStartDateMessageNextDate(message, lang);
  }

  /**
   * Presses the continue button
   */
  continue() {
    return this.stepper.clickContinue();
  }

  setFocusContinue() {
    return this.stepper.setFocusContinue();
  }

  /**
   * Verifies if all required field error messages are present only
   * @param {string[]} requiredFieldsValidationMessages - the validation messages
   */
  verifyRequiredFieldErrors(requiredFieldsValidationMessages) {
    const getTexts = ($errors) => {
      return Cypress._.map($errors, 'innerText')
    }
    cy.get(this.container + ' .mat-form-field-subscript-wrapper .error-message').should('exist').then(getTexts).should('deep.equal', requiredFieldsValidationMessages)


    // const validationMessages = cy.get(this.container + ' .mat-form-field-subscript-wrapper .error-message');
    // return validationMessages.invoke('attr', 'innerText').then(errors => {
    //   // console.log('verifyRequiredFieldErrors', errors);
    //   cy.get(errors).should('have.text', requiredFieldsValidationMessages);
    // });
  }
  verifyDonationAmountError() {
    cy.wait(1000)
    cy.get(this.container+ ' .donation-amount-error').should('exist')    
  }
  /**
   * Verifies if all required field error messages are present using rx-errors
   * @param {string[]} requiredFieldsValidationMessages - the validation messages
   */
  verifyFieldErrors(requiredFieldsValidationMessages) {
    const validationMessages = elementsByClass('.raisin-errors .error-message', this.container);
    return validationMessages.getText().then(errors => {
      console.log('verifyFieldErrors', errors);
      expect(errors).eq(requiredFieldsValidationMessages);
    });
  }

  /**
   * Verifies there are no required field error messages present
   */
  verifyNoValidationMessages() {
    const validationMessages = cy.get(this.container+ ' .raisin-errors .error-message');
    expect(validationMessages).eq([]);
  }

  /**
   * Verifies the transaction failed block containing the expected error message is present
   * @param {string} [errorMessage] - the expected error message
   */
  verifyTransactionFailed(errorMessage) {
    // expect(this.paymentInformation.transactionFailed.isDisplayed()).true;
    if (errorMessage) {
      cy.get(this.paymentInformation.transactionFailedMessage).should('have.text', errorMessage);
    }
  }

  /**
   * Verifies the transaction successful block is present
   */
  verifyTransactionSuccessful() {
    cy.wait(3000);
    cy.get(this.success.successMessage).should('be.visible')
  }

  /**
   * Tab out of a field to force blur on input
   *
   * @memberof DonationsPage
   */
  tabOutOfCurrentField() {
    return pressTab();
  }

  /**
   * Press the Escape key
   *
   * @memberof DonationsPage
   */
  pressEscKey() {
    return pressEsc();
  }
}
