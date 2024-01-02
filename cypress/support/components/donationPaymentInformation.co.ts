import { clickElement, buildSelector, enterMatInput, selectDropDownOption } from "../utils/actions";

/**
 * Represents the "Enter Payment & Complete Donation" step
 */
export class DonationPaymentInformation {
  container: any;
  creditCardPaymentMethod: any;
  debitCardPaymentMethod: any;
  paymentTypeGroup: any;
  txtCardNumber: any;
  txtCVV: any;
  txtCardHolderName: any;
  creditCardExpirationMonth: any;
  creditCardExpirationYear: any;
  transactionFailed: any;
  transactionFailedMessage: any;
  transactionSuccessful: any;
  constructor() {
    this.container = buildSelector('.gd-complete-donation');

    // payment method
    this.creditCardPaymentMethod = buildSelector(this.container, 'mat-button-toggle-group[name="paymentType"]  mat-button-toggle[value="0"]');
    this.debitCardPaymentMethod = buildSelector(this.container, 'mat-button-toggle-group[name="paymentType"]  mat-button-toggle[value="debit"]');
    this.paymentTypeGroup = buildSelector(this.container, 'mat-button-toggle-group[name="paymentType"]');

    // card details
    this.txtCardNumber = buildSelector(this.container, '.credit-card-number');
    this.txtCardHolderName = buildSelector(this.container, '.credit-card-holder-name');
    this.creditCardExpirationMonth = buildSelector(this.container, '.credit-card-expiry-month');
    this.creditCardExpirationYear = buildSelector(this.container, '.credit-card-expiry-year');
    this.txtCVV = buildSelector(this.container,'.credit-card-cvv');

    // transaction
    this.transactionFailed = buildSelector(this.container, '.error-notification');
    this.transactionFailedMessage = buildSelector(this.transactionFailed, '.mat-mdc-card-content');
    this.transactionSuccessful = buildSelector(this.container, 'transactionSuccessful');
  }

  /**
   * Populates the entire form. Ensure all fields are present on the form for your event.
   * Any fields that are not in your data set will be skipped.
   * @param {*} cardData - the form data for credit card info
   */
  populateAllFields(cardData) {
    if (!cardData) {
      console.warn('No credit card data found, skipping...');
      return;
    }
    enterMatInput(this.txtCardNumber, cardData.number);
    enterMatInput(this.txtCardHolderName, cardData.cardHolderName);
    selectDropDownOption(this.creditCardExpirationMonth, cardData.expiryMonth);
    selectDropDownOption(this.creditCardExpirationYear, cardData.expiryYear);

    if (cardData.cvv) {
      enterMatInput(this.txtCVV, cardData.cvv);
    }
  }

  verifyAllFields(cardData) {
    expect(this.txtCardNumber.getAttribute('value')).eq(cardData.number);
    expect(this.txtCardHolderName.getAttribute('value')).eq(cardData.cardHolderName);
    expect(this.creditCardExpirationMonth.getAttribute('value')).eq(cardData.expiryMonth);
    expect(this.creditCardExpirationYear.getAttribute('value')).eq(cardData.expiryYear);

    if (cardData.cvv) {
      expect(this.txtCVV.getAttribute('value')).eq(cardData.cvv);
    }
  }

  /*
   *@desc Function which specifially clicks a payment type tab given the value to select
   *@param value - the value to select
   */
  selectPaymentType(value) {
    const button = this.paymentTypeGroup.get('button').contains(value);
    clickElement(button);
  }
}