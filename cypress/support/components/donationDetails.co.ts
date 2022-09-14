import { clearInput, clickElement, elementByClass, elementById, elementsByClass, enterMatInput, enterText, scrollToElement, setFocus } from "../utils/actions";
import { getNextAvailableDate, getNextDate, getNextMonthDate } from "../utils/dateUtils";

export class DonationMatrix {
  container: any;
  title: any;
  donationAmountsContainer: any;
  amountField: any;
  selectedAmount: any;
  donationAmountButtons: any;
  errorMessage: any;
  otherAmount: any;

  constructor() {
    this.container = elementByClass('.rx-matrix-container');
    this.title = elementById(this.container, 'h3');
    this.donationAmountsContainer = elementByClass(this.container, '.donation-matrix-other-amount');

    this.otherAmount = elementByClass(this.donationAmountsContainer, '.donation-matrix-other-amount .globalized-number-input input');
    this.amountField = elementByClass(this.donationAmountsContainer, '.globalized-number input');
    this.selectedAmount = elementByClass('.mat-button-toggle-checked', this.container);
    this.donationAmountButtons = elementsByClass('.donation-matrix-button', this.container);
    this.errorMessage = elementByClass(this.container, '.mat-error');
  }

  /**
   * Returns the selected amount
   * @returns {*}
   */
  getSelectedAmount() {
    return this.selectedAmount.getText();
  }

  getSelectedMatrixValue() {
    return elementByClass(this.container, '.donation-matrix-button.selected').text();
  }

  clickOtherAmount() {
    return this.otherAmount.isPresent()
      .then((isButtonPresent) => {
        if (isButtonPresent) {
          return clickElement(this.otherAmount);
        }
      });
  }

  /**
   * Selects an amount in the matrix
   * if the value is not in the matrix, types a custom amount
   * @param {string} value - the amount to select
   * @returns {promise.Promise<any>}
   */
  selectAmount(value) {
    const button = this.container.get('button').contains(value);
    return button.isPresent()
      .then((isButtonPresent) => {
        if (isButtonPresent) {
          clickElement(button);
        } else {
          enterText(this.amountField, value);
        }
      })
      .catch(() => {
        enterText(this.amountField, value);
      });
  }

  /*
   *@desc Function which specifially clicks a donation matrix button given the value to select
   *@param value - the value to select
   */
  selectDonationMatrixAmount(value) {
    const button = this.container.get('button').contains(value);
    scrollToElement(button);
    clickElement(button);
  }

  /**
   * Verifies the correct donation matrix button is selected
   * @param value - the value that is expected to be selected
   */
  verifySelectedDonationMatrixAmount(value) {
    expect(this.getSelectedAmount()).contains(value);
  }

  /**
   * Enters the value into the other amount textbox
   * @param {*} data - the data that contains .donationAmount
   */
  enterOtherAmount(data) {
    clickElement(this.otherAmount);
    return enterMatInput(this.otherAmount, data.donationAmount);
  }

  /**
   * Clears the other amount textbox
   */
  clearCustomAmount() {
    setFocus(this.otherAmount);
    clearInput(this.otherAmount);
  }
}

/**
 * Represents the "Choose Your Donation" step
 */
export class DonationDetails {
  container: any;
  donationMatrix: DonationMatrix;
  donationTypeGroup: any;
  selectedDonationType: any;
  donationFrequencyGroup: any;
  selectedDonationFrequency: any;
  coverAdminFeeCheckbox: any;
  startDateFooter: any;

  constructor() {
    this.container = elementByClass('.choose-donation');
    this.donationMatrix = new DonationMatrix();
    this.donationTypeGroup = this.container, '.mat-button-toggle-group.donation-type');
    this.selectedDonationType = this.donationTypeGroup, '.mat-button-toggle-checked');
    this.donationFrequencyGroup = elementByClass('.donation-frequency', this.container);
    this.selectedDonationFrequency = this.donationFrequencyGroup, '.mat-button-toggle-checked');
    this.coverAdminFeeCheckbox = this.container, '.mat-checkbox-inner-container');
    this.startDateFooter = elementByClass('.donations-step-footer-container');
  }

  /*
   *@desc Function which specifially clicks a donation type tab given the value to select
   *@param value - the value to select
   */
  selectDonationType(value) {
    const button = this.donationTypeGroup.get('.mat-button-toggle').contains(value);
    clickElement(button);
  }

  /**
   * Verifies the correct donation type is selected
   * @param value - the type that is expected to be selected
   */
  verifySelectedDonationType(value) {
    expect(this.selectedDonationType.getText()).contains(value);
  }

  /*
   *@desc Function which specifially clicks a donation frequency button given the value to select
   *@param value - the value to select
   */
  selectDonationFrequency(value) {
    const button = this.donationFrequencyGroup.get('button').contains(value);
    clickElement(button);
  }

  /**
   * Verifies the correct donation frequency is selected
   * @param value - the frequency that is expected to be selected
   */
  verifySelectedDonationFrequency(value) {
    const button = this.donationFrequencyGroup.get('button').contains(value);
    expect(button.getText()).contains(value);
  }

  /**
   * Selects an amount from the donation matrix; 
   * if the value is not in the matrix, types a custom amount
   * @param {string} value - the amount to select
   */
  selectDonationAmount(value) {
    this.donationMatrix.selectAmount(value);
  }

  /**
   * Clicks on the other amount field
   *
   * @memberof DonationDetails
   */
  clickOtherAmount() {
    this.donationMatrix.clickOtherAmount()
  }

  /*
   *@desc Function which specifially clicks a donation matrix button given the value to select
   *@param value - the value to select
   */
  selectDonationMatrixAmount(value) {
    this.donationMatrix.selectDonationMatrixAmount(value);
  }

  /**
   * Verifies the correct donation matrix button is selected
   * @param value - the value that is expected to be selected
   */
  verifySelectedDonationMatrixAmount(value) {
    this.donationMatrix.verifySelectedDonationMatrixAmount(value);
  }

  /*
   *@desc Method to get the text values from all the donation matrix buttons
   *@returns {string []} donationMatrixValues - the text values of the donation matrix buttons, eg. ['$1', '$2']
   */
  getDonationMatrixValues() {
    scrollToElement(this.container);
    return this.donationMatrix.donationAmountButtons.getText();
  }

  /**
   * Enters the value into the other amount textbox
   * @param {*} data - the data that contains .donationAmount
   */
  enterOtherAmount(data) {
    return this.donationMatrix.enterOtherAmount(data);
  }

  /**
   * Clears the other amount textbox
   */
  clearCustomAmount() {
    return this.donationMatrix.clearCustomAmount();
  }

  /**
   * Clicks on the cover admin fee checkbox
   */
  clickCoverAdminFee() {
    return clickElement(this.coverAdminFeeCheckbox);
  }

  /**
   * Verifies the message regarding the start date of a recurring donation (next month)
   * @param {string} message - the start of the message
   * @param {string} lang - the BCP 47 language code
   * @param {number} startDay - the first payment day of the month
   */
  verifyStartDateMessageNextMonthDate(message, lang, startDay) {
    console.log(startDay);
    expect(this.startDateFooter.getText()).contains(message);
    expect(this.startDateFooter.getText()).contains(getNextMonthDate(lang, startDay));
  }

  /**
   * Verifies the message regarding the start date of a recurring donation (next available date)
   * @param {string} message - the start of the message
   * @param {string} lang - the BCP 47 language code
   * @param {number[]} startDays - the first payment day of the month
   */
  verifyStartDateMessageNextAvailableDate(message, lang, startDays) {
    expect(this.startDateFooter.getText()).contains(message);
    expect(this.startDateFooter.getText()).contains(`${getNextAvailableDate(lang, startDays)}`);
  }

  /**
   * Verifies the message regarding the start date of a recurring donation (tomorrow)
   * @param {string} message - the start of the message
   * @param {string} lang - the BCP 47 language code
   */
  verifyStartDateMessageNextDate(message, lang) {
    expect(this.startDateFooter.getText()).contains(message);
    expect(this.startDateFooter.getText()).contains(getNextDate(lang));
  }
}
