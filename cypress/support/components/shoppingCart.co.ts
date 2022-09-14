//The information regarding the libraries

import { buildSelector, clickElement, elementByClass, elementById, elementsByClass, enterText } from "../utils/actions";

export class ShoppingCart {
  container: any;
  emptyCartText: any;
  cartButtons: any;
  verifyAmount: any;
  keepShoppingButton: any;
  checkOutButtonInPopUp: any;
  itemsContainer: any;
  cartItems: any;
  closeButton: any;
  donationAmount: any;
  promoCodeInputText: any;
  promoCodeApplyButton: any;

  constructor() {
    this.container = buildSelector('.shopping-cart-view-dialog');
    this.emptyCartText = buildSelector(this.container, '#empty-cart');
    this.cartButtons = buildSelector(this.container, '.shopping-cart-footer');
    this.verifyAmount = buildSelector(this.container, '.price-row label.cart-label-right');
    this.keepShoppingButton = buildSelector(this.cartButtons, '.btn-keep-shopping span:nth-child(2)');
    this.checkOutButtonInPopUp = buildSelector(this.cartButtons, '.btn-confirm-checkout-cart span:first-child');
    this.itemsContainer = buildSelector(this.container, '#tickets-title-label + div');
    this.cartItems = buildSelector(this.itemsContainer, 'tbody');
    this.closeButton = buildSelector(this.container, '.mat-dialog-title button.close-modal-button');
    this.donationAmount = buildSelector(this.container, '#txtDonationAmount');
    this.promoCodeInputText = buildSelector(this.container, '#promoCode');
    this.promoCodeApplyButton = buildSelector(this.container, '.btn-promocode');
  }

  getCartItemLabel(index) {
    return elementByClass(this.cartItems.get(index), '.cart-item-small-label');
  }
  getCartItemQuantityButtons(index) {
    return elementByClass(this.cartItems.get(index), '.qty-component');
  }
  getCartItemPlusButton(index) {
    return elementByClass(this.getCartItemQuantityButtons(index), '.btn-add');
  }
  getCartItemMinusButton(index) {
    return elementByClass(this.getCartItemQuantityButtons(index), '.btn-remove');
  }
  getCartItemXButton(index) {
    return elementByClass(this.cartItems.get(index), 'button[aria-label="Close"]');
  }
  clickOnKeepShoppingButton() {
    clickElement(this.keepShoppingButton);
  }
  clickOnCheckOutButtonInPopUp() {
    clickElement(this.checkOutButtonInPopUp);
  }
  setDonationAmount(amount) {
    enterText(this.donationAmount, amount);
  }
  setAndApplyPromoCode(code) {
    enterText(this.promoCodeInputText, code);
    this.promoCodeApplyButton.click();
  }
  clickOnPlusButtonForSingleItem() {
    this.getCartItemPlusButton(0).click();
  }
  clickOnMinusButtonForSingleItem() {
    this.getCartItemMinusButton(0).click();
  }
  clickOnPlusButtonForGroupItem() {
    this.getCartItemPlusButton(1).click();
  }
  clickOnMinusButtonForGroupItem() {
    this.getCartItemMinusButton(1).click();
  }
  clearCart() {
    this.itemsContainer.isPresent().then(isPresent => {
      if (isPresent) {
        this.cartItems.count().then(count => {
          for (let index = count - 1; index >= 0; index--) {
            clickElement(this.getCartItemMinusButton(0));
          }
        });
      }
      this.clickOnKeepShoppingButton();
    });
  }
  closeCart() {
    clickElement(this.closeButton);
  }
}