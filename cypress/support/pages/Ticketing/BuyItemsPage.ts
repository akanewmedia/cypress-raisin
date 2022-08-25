import { ShoppingCart } from "../../components/shoppingCart.co";
import { elementByClass, elementsByClass } from "../../utils/actions";

export class BuyItemsPage {
  shoppingCart: ShoppingCart;
  items: any;
  plusButtonForSingleItem: any;
  plusButtonForGroupItem: any;
  plusButtonForNonTicketedItem: any;
  addToCartButton: any;

  constructor() {
    this.shoppingCart = new ShoppingCart();
    this.items = elementsByClass('.event-item');
    this.plusButtonForSingleItem = this.getPlusButton(0);
    this.plusButtonForGroupItem = this.getPlusButton(1);
    this.plusButtonForNonTicketedItem = this.getPlusButton(2);
    this.addToCartButton = $('button.btn-add-cart');
  }

  getPlusButton(index) {
    return elementByClass(this.items.get(index), '.item-container rx-item-qty-button .btn-item-qty.btn-add');
  }
  getItemText(index) {
    return elementsByClass(this.items.get(index), 'h2').text();
  }
  clickOnAddToCartButton() {
    this.addToCartButton.click();
  }
  clickOnKeepShoppingButton() {
    this.shoppingCart.clickOnKeepShoppingButton();
  }
  clickOnPlusButtonForSingleItem() {
    this.plusButtonForSingleItem.click();
  }
  clickOnPlusButtonForGroupItem() {
    this.plusButtonForGroupItem.click();
  }
  clickOnPlusButtonForNonTicketedItem() {
    this.plusButtonForNonTicketedItem.click();
  }
  clickOnAddToCartInBuyItemsPage() {
    this.addToCartButton.click();
  }
  clickOnCheckOutButtonInPopUp() {
    this.shoppingCart.clickOnCheckOutButtonInPopUp();
  }
  verifyTicketsText(expectedText) {
    this.verifyItemsText(expectedText, 3);
  }
  verifySponsorshipsText(expectedText) {
    this.verifyItemsText(expectedText, 2);
  }
  verifyItemsText(expectedText, itemTypeQuantity) {
    for (let i = 0; i < itemTypeQuantity; i++) {
      expect(this.getItemText(i)).eq(expectedText[i]);
    }
  }
  verifyEmptyCartText(expectedText) {
    expect(this.shoppingCart.emptyCartText.getText()).eq(expectedText);
  }
  verifyAmountInCart(expectedAmount) {
    expect(this.shoppingCart.verifyAmount.getText()).eq(expectedAmount);
  }
  fillInDonationAmount(amount) {
    this.shoppingCart.setDonationAmount(amount);
  }
  fillInAndApplyPromoCode(code) {
    this.shoppingCart.setAndApplyPromoCode(code);
  }
}