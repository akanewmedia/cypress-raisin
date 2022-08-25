import { clickElement, elementByClass, elementById, enterMatInput, selectDropDownOption } from "../utils/actions";

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
    this.container = elementByClass('.gd-complete-donation');

    // payment method
    this.creditCardPaymentMethod = this.container.$('mat-button-toggle-group[name="paymentType"]  mat-button-toggle[value="0"]');
    this.debitCardPaymentMethod = this.container.$('mat-button-toggle-group[name="paymentType"]  mat-button-toggle[value="debit"]');
    this.paymentTypeGroup = this.container.$('mat-button-toggle-group[name="paymentType"]');

    // card details
    this.txtCardNumber = elementByClass('.credit-card-number', this.container);
    this.txtCardHolderName = elementByClass('.credit-card-holder-name', this.container);
    this.creditCardExpirationMonth = elementByClass('.credit-card-expiry-month', this.container);
    this.creditCardExpirationYear = elementByClass('.credit-card-expiry-year', this.container);
    this.txtCVV = elementByClass('.credit-card-cvv', this.container);

    // transaction
    this.transactionFailed = elementByClass('.error-notification', this.container);
    this.transactionFailedMessage = elementByClass('.mat-card-content', this.transactionFailed);
    this.transactionSuccessful = elementById('transactionSuccessful', this.container);
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