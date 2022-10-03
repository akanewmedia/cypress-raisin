//The information regarding the libraries
import { buildSelector, clickElement, elementByClass, elementById, elementsByClass, enterText } from "../utils/actions";
export class StoreItem {
  container: any;
  quantity: any;
  plusButton: any;
  minusButton: any;
  amount: any;
  constructor(item) {
    this.container = item;
    this.quantity = buildSelector(this.container, '.qty-wrap');
    this.plusButton = buildSelector(this.quantity, '.btnPlus');
    this.minusButton = buildSelector(this.quantity, '.btnMinus');
    this.amount = buildSelector(this.quantity, '.ui-input-text')
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
    this.items = buildSelector(this.container, 'div.row-store');
    this.promoCode = buildSelector(this.container, '#promoCode');
    this.promoCodeApplyButton = buildSelector(this.container, '.promo-code');
    this.total = buildSelector(this.container, '.store-item-total');
  }

  addItem(index) {
    cy.get(this.items).eq(index).find('.btnPlus').click()    
  }

  removeItem(index) {
    cy.get(this.items).eq(index).find('.btnMinus').click() 
  }

  enterPromoCode(code) {
    enterText(this.promoCode, code);
    clickElement(this.promoCodeApplyButton);
  }
}
