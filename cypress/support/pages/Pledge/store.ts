import { Store } from '../../components/store.co';
import { buildSelector, elementByClass, elementById } from '../../utils/actions';

export class StorePage {
  container: any;
  storePromoCode: any;
  storePromoCodeApplyButton: any;
  storePromoCodeLabel: any;
  constructor() {
    this.container = buildSelector('rx-store');
    this.storePromoCode = buildSelector(this.container, '#promoCode');
    this.storePromoCodeApplyButton = buildSelector(this.container, '.btn-flow[key="m_btn_PromoCodeApply"]');
    this.storePromoCodeLabel = buildSelector(this.container, '#store-promoCode-totalDiscount-title');
  }

  buyItem(index) {
    new Store(this.container).addItem(index);
  }

  /**
   * Removes a store item from the payment
   * @param storeItemIndex
   */
  removeStoreItem(storeItemIndex) {
    new Store(this.container).removeItem(storeItemIndex);
  }

  verifyTotalAmount(amount) {
    expect(new Store(this.container).total.getText()).contains(amount);
  }

  enterStorePromoCode(code) {
    new Store(this.container).enterPromoCode(code);
  }

  /**
   * Does an expect on the promo code label that shows up at the bottom on of the screen
   * when you apply a promo code.
   */
  verifyStorePromoCodeApplied() {
    cy.get(this.storePromoCodeLabel).should('be.visible')
  }
}
