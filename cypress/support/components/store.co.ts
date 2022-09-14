//The information regarding the libraries
import { clickElement, elementByClass, elementById, elementsByClass, enterText } from "../utils/actions";
export class StoreItem {
  container: any;
  quantity: any;
  plusButton: any;
  minusButton: any;
  amount: any;
  constructor(item) {
    this.container = item;
    this.quantity = elementByClass(this.container, '.qty-wrap');
    this.plusButton = elementByClass(this.quantity, '.btnPlus');
    this.minusButton = elementByClass(this.quantity, '.btnMinus');
    this.amount = elementByClass(this.quantity, '.ui-input-text')
  }

  addItem() {
    clickElement(this.plusButton, true);
  }

  removeItem() {
    clickElement(this.minusButton, true);
  }
}

export class Store {

  items: any;
  promoCode: any;
  promoCodeApplyButton: any;
  total: any;
  constructor(private container: any) {
    this.items = elementsByClass(this.container, 'div.row-store');
    this.promoCode = elementById(this.container, '#promoCode');
    this.promoCodeApplyButton = elementByClass(this.container, '.promo-code');
    this.total = elementByClass(this.container, '.store-item-total');
  }

  addItem(index) {
    new StoreItem(this.items.get(index)).addItem();
  }

  removeItem(index) {
    new StoreItem(this.items.get(index)).removeItem();
  }

  enterPromoCode(code) {
    enterText(this.promoCode, code);
    clickElement(this.promoCodeApplyButton);
  }
}
