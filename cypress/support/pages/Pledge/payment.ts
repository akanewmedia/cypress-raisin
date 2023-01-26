import { CardInformation } from '../../components/cardInformation.co'
import { Store } from '../../components/store.co';
import { enterText, clickElement, elementByClass, elementById, buildSelector } from '../../utils/actions'
import { isEmpty } from 'lodash';

export class PaymentPage {
  container: any;
  donationContainer: any;
  donationAmount: any;
  creditCardButton: any;
  paypalButton: any;
  registrationFeeContainer: any;
  registrationFeeText: any;
  registrationFeeDiscountTextContainer: any;
  registrationFeeDiscountText: any;
  registrationFeePromoCodeContainer: any;
  registrationFeePromoCode: any;
  registrationFeePromoCodeApplyButton: any;
  store: any;
  storePromoCode: any;
  storePromoCodeApplyButton: any;
  total: any;
  storePromoCodeLabel: any;
  cardInformationCO: CardInformation;

  constructor() {
    this.container = buildSelector('.flow-step');

    this.donationContainer = buildSelector(this.container, '#donationSection');
    this.donationAmount = buildSelector(this.donationContainer, '.input-amount');

    this.creditCardButton = buildSelector(this.container, '#credit-card-payment + label.payment-title');
    this.paypalButton = buildSelector(this.container, '#paypal + label.payment-title');
    this.registrationFeeContainer = buildSelector(this.container, '.registration-fee');
    this.registrationFeeText = buildSelector(this.registrationFeeContainer, '[class*="-xs-4"] > strong');
    this.registrationFeeDiscountTextContainer = buildSelector(this.registrationFeeContainer, '.registration-discount');
    this.registrationFeeDiscountText = buildSelector(this.registrationFeeDiscountTextContainer, '.registration-discount-amount');
    this.registrationFeePromoCodeContainer = buildSelector(this.registrationFeeContainer, '.registration-promo-code');
    this.registrationFeePromoCode = buildSelector(this.registrationFeePromoCodeContainer, '.promoCodeToApply');
    this.registrationFeePromoCodeApplyButton = buildSelector(this.registrationFeePromoCodeContainer, '.btn-promoCodeApply');
    this.store = buildSelector(this.container, 'section.store');
    this.storePromoCode = buildSelector(this.store, '#promoCode');
    this.storePromoCodeApplyButton = buildSelector(this.store, '.btn-flow[key="m_btn_PromoCodeApply"]');
    this.total = buildSelector(this.store, 'div[aria-labelledby="store-items-total"]');
    this.storePromoCodeLabel = buildSelector(this.store, '#store-promoCode-totalDiscount-title');

    this.cardInformationCO = new CardInformation();
  }

  donate(amount) {
    //scrollToElement(this.donationAmount);
    enterText(this.donationAmount, amount);
    clickElement(this.donationContainer);
  }

  /**
   * Removes the amount from the donation textbox in the flow
   */
  clearDonation() {
    //scrollToElement(this.donationAmount);
    cy.get(this.donationAmount).clear()
    
    // enterText(this.donationAmount, ' ');
    // clickElement(this.donationContainer);
  }

  buyItem(index) {
    //scrollToElement(this.store);
    new Store(this.store).addItem(index);
  }

  /**
   * Removes a store item from the payment
   * @param storeItemIndex
   */
  removeStoreItem(storeItemIndex) {
    new Store(this.store).removeItem(storeItemIndex);
  }

  /**
   * Does an expect on the promo code label that shows up at the bottom on of the screen
   * when you apply a promo code.
   */
  verifyStorePromoCodeApplied() {
    expect(this.storePromoCodeLabel.isDisplayed).true;
  }

  verifyTotalAmount(amount) {
    cy.get(new Store(this.store).total).should('include.text', amount)
    //expect(new Store(this.store).total.getText()).contains(amount);
  }

  /**
   * Does an expect on the registration fee text
   * @param amount
   */
  verifyRegFeeAmount(amount) {
    cy.contains(this.registrationFeeText, amount)
    //expect(this.registrationFeeText.getText()).contains(amount);
  }

  /**
   * Does an expect on the registration fee discount text
   * @param amount
   */
  verifyRegFeeDiscountAmount(amount) {
    if (isEmpty(amount)) {
      cy.get(this.registrationFeeDiscountText).should('not.exist')
    } else {
      cy.get(this.registrationFeeDiscountText).should('have.text', amount)
    }
  }

  /**
   * Enters the amount into the registration fee promo textbox at the top of the page
   * @param code
   */
  enterRegFeePromoCode(code) {
    enterText(this.registrationFeePromoCode, code);
    clickElement(this.registrationFeePromoCodeApplyButton);
    cy.wait(500);
  }

  enterStorePromoCode(code) {
    new Store(this.store).enterPromoCode(code);
  }

  verifyCreditCardIsDisplayed() {
    cy.get(this.cardInformationCO.creditCardHolderName).should('be.visible')
    // expect(this.cardInformationCO.creditCardHolderName.isDisplayed()).true;
  }
  verifyPaymentFieldsPresent() {
    cy.get(this.cardInformationCO.creditCardNumber).should('be.visible')
    cy.get(this.cardInformationCO.creditCardHolderName).should('be.visible')
    cy.get(this.cardInformationCO.creditCardExpiryMonth).should('be.visible')
    cy.get(this.cardInformationCO.creditCardExpiryYear).should('be.visible')

    // expect(this.cardInformationCO.creditCardNumber.isPresent()).true;
    // expect(this.cardInformationCO.creditCardHolderName.isPresent()).true;
    // expect(this.cardInformationCO.creditCardExpiryMonth.isPresent()).true;
    // expect(this.cardInformationCO.creditCardExpiryYear.isPresent()).true;
  }

  enterCardDetails(card) {
    this.cardInformationCO.enterCardNumber(card.number);
    this.cardInformationCO.enterCardHolderName(card.cardHolderName);
    this.cardInformationCO.selectCardExpiryDate(card.expiryMonth, card.expiryYear);
    

    if (card.cvv) {
      this.cardInformationCO.enterCardCvv(card.cvv);
    }
  }

  // TODO: Not functional
  // verifyCardDetailsEntered(cardData) {
  //     expect(this.cardInformationCO.txtCardNumber.getAttribute('value')).eq(cardData.number);
  //     expect(this.cardInformationCO.txtCardHolderName.getAttribute('value')).eq(cardData.cardHolderName);
  //     expect(this.cardInformationCO.creditCardExpirationMonth.getAttribute('value')).eq(cardData.expiryMonth);
  //     expect(this.cardInformationCO.creditCardExpirationYear.getAttribute('value')).eq(cardData.expiryYear);

  //     if (cardData.cvv) {
  //         expect(this.cardInformationCO.creditCardCvv.getAttribute('value')).eq(cardData.cvv);
  //     }
  // }

  pressPaypalBtn() {
    this.paypalButton.click();
  }
}
