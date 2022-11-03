import { CardInformation } from "../../components/cardInformation.co";
import { Profile } from "../../components/profile.co";
import { Address } from "../../components/address.co";

//The information regarding the libraries
import { buildSelector, clickElement } from "../../utils/actions";
export class PaymentPage {
  container: any;
  creditCardButton: any;
  paypalButton: any;
  visaCheckoutButton: any;
  invoiceButton: any;
  invoice: any;

  profileInformation: any;
  addressInformation: any;
  cardInformation: any;

  constructor() {
    this.container = buildSelector('form.system-content');
    this.creditCardButton = buildSelector(this.container, '#credit-card-payment + label.payment-title');
    this.paypalButton = buildSelector(this.container, '#paypal + label.payment-title');
    this.visaCheckoutButton = buildSelector(this.container, '#visa-checkout + label.payment-title');
    this.invoiceButton = buildSelector(this.container, '#invoice + label.payment-title');
    this.invoice = buildSelector(this.container, 'rx-invoice');
    this.cardInformation = new CardInformation();
    this.profileInformation = new Profile(this.invoice);
    this.addressInformation = new Address(this.invoice);
  }

  clickPayPalButton() {
    this.paypalButton.click();
  }

  clickInvoiceButton() {
    clickElement(this.invoiceButton);
  }

  /**
   * Changes the value of the 'Same as purchaser' checkbox in Billing Information
   * @param {boolean} checked - If true, the checkbox gets checked. Otherwise, it gets unchecked, showing the Billing Info form.
   */
  selectSameAsPurchaser(checked) {
    this.profileInformation.selectSameAsPurchaser(checked);
  }

  verifyTheBillingInfoFieldsDisplayed() {
    expect(this.profileInformation.firstName.isDisplayed()).true;
  }

  verifyTheBillingInfoFieldsNotDisplayed() {
    cy.get(this.profileInformation.firstName).should('not.be.visible')
  }

  verifySameAsPurchaserisChecked() {
    expect(this.profileInformation.sameAsPurchaserCheckbox.isSelected()).true;
  }

  verifySameAsPurchaserisNotChecked() {
    expect(this.profileInformation.sameAsPurchaserCheckbox.isSelected()).toBeFalsy();
  }

  verifyCreditCardIsDisplayed() {
    cy.get(this.cardInformation.creditCardHolderName).should('be.visible')
  }

  verifyPaymentFieldsPresent() {
    cy.get(this.cardInformation.creditCardNumber).should('be.visible')
    cy.get(this.cardInformation.creditCardHolderName).should('be.visible')
    cy.get(this.cardInformation.creditCardExpiryMonth).should('be.visible')
    cy.get(this.cardInformation.creditCardExpiryYear).should('be.visible')
  }

  enterCardDetails(card: any) {
    this.cardInformation.enterCardNumber(card.number);
    this.cardInformation.enterCardHolderName(card.cardHolderName);
    this.cardInformation.selectCardExpiryDate(card.expiryMonth, card.expiryYear);

    if (card.cvv) {
      this.cardInformation.enterCardCvv(card.cvv);
    }
  }

  fillInMandatoryFieldsBilling(data: any) {
    this.profileInformation.enterFirstName(data.firstName);
    this.profileInformation.enterLastName(data.lastName);
    this.profileInformation.enterEmail(data.email);
    this.addressInformation.enterAddress(data.address);
    this.addressInformation.enterCity(data.city);
    this.addressInformation.selectProvince(data.province);
    this.addressInformation.enterPostCode(data.postCode);
  }

}