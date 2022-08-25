//The information regarding the libraries
import { clickElement, enterText } from "../utils/actions";
export class StoreItem {
  container: any;
  quantity: any;
  plusButton: any;
  minusButton: any;
  amount: any;
  constructor(item) {
    this.container = item;
    this.quantity = this.container.$('.qty-wrap');
    this.plusButton = this.quantity.$('.btnPlus');
    this.minusButton = this.quantity.$('.btnMinus');
    this.amount = this.quantity.$('.ui-input-text')
  }

  addItem() {
    // actions.waitForElementToBeClickable(this.plusButton);
    clickElement(this.plusButton, true, 500);
  }

  removeItem() {
    // actions.waitForElementToBeClickable(this.minusButton);
    clickElement(this.minusButton, true, 500);
  }
}

export class Store {

  items: any;
  promoCode: any;
  promoCodeApplyButton: any;
  total: any;
  constructor(private container: any) {
    this.items = this.container.$$('div.row-store')
    this.promoCode = this.container.$('#promoCode');
    this.promoCodeApplyButton = this.container.$('.promo-code');
    this.total = this.container.$('.store-item-total');
  }

  addItem(index) {
    new StoreItem(this.items.get(index)).addItem();
  }

  removeItem(index) {
    new StoreItem(this.items.get(index)).removeItem();
  }

  enterPromoCode(code) {
    enterText(this.promoCode, code);
    // actions.waitForElementToBeClickable(this.promoCodeApplyButton);
    clickElement(this.promoCodeApplyButton);
  }
}
