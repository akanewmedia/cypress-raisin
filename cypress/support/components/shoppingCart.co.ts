//The information regarding the libraries

import { clickElement, elementByClass, elementById, elementsByClass, enterText } from "../utils/actions";

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
    this.container = elementByClass('.shopping-cart-view-dialog');
    this.emptyCartText = elementById(this.container, '#empty-cart');
    this.cartButtons = elementByClass(this.container, '.shopping-cart-footer');
    this.verifyAmount = elementByClass(this.container, '.price-row label.cart-label-right');
    this.keepShoppingButton = elementByClass(this.cartButtons, '.btn-keep-shopping span:nth-child(2)');
    this.checkOutButtonInPopUp = elementByClass(this.cartButtons, '.btn-confirm-checkout-cart span:first-child');
    this.itemsContainer = elementByClass(this.container, '#tickets-title-label + div');
    this.cartItems = elementsByClass(this.itemsContainer, 'tbody');
    this.closeButton = elementByClass(this.container, '.mat-dialog-title button.close-modal-button');
    this.donationAmount = elementByClass(this.container, '#txtDonationAmount');
    this.promoCodeInputText = elementByClass(this.container, '#promoCode');
    this.promoCodeApplyButton = elementByClass(this.container, '.btn-promocode');
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