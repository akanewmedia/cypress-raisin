import { ShoppingCart } from "../../components/shoppingCart.co";
import { buildSelector } from "../../utils/actions";

export class BuyItemsPage {
  shoppingCart: ShoppingCart;
  items: any;
  plusButton: any;
  addToCartButton: any;

  constructor() {
    this.shoppingCart = new ShoppingCart();
    this.items = '.event-item'
    this.plusButton = '.item-container rx-item-qty-button .btn-item-qty.btn-add'
    this.addToCartButton = 'button.btn-add-cart'
  }

  // getPlusButton(index) {
  //   cy.get(this.items).eq(index).within(()=>{
  //     cy.get('.item-container rx-item-qty-button .btn-item-qty.btn-add')
  //   })
  //   //return elementByClass(this.items.get(index), '.item-container rx-item-qty-button .btn-item-qty.btn-add');
  // }
  getItemText(index) {
    cy.get(this.items).eq(index).within(()=> {
      cy.get('h2').invoke('text')
    })
    //return elementsByClass(this.items.get(index), 'h2').text();
  }
  clickOnAddToCartButton() {
    this.addToCartButton.click();
  }
  clickOnKeepShoppingButton() {
    this.shoppingCart.clickOnKeepShoppingButton();
  }
  clickOnPlusButtonForSingleItem() {
    cy.contains('h2', 'Single Ticketed Item').parent().within(()=> {
      cy.get(this.plusButton).click()
    })
    //this.plusButton.first.click();
  }
  clickOnPlusButtonForGroupItem() {
    cy.contains('h2', 'Registration Fee, Group').parent().within(()=> {
      cy.get(this.plusButton).click()
    })
  }
  clickOnPlusButtonForNonTicketedItem() {
    cy.contains('h2', 'Non-Ticketed Item').parent().within(()=> {
      cy.get(this.plusButton).click()
    })
  }
  clickOnAddToCartInBuyItemsPage() {
    cy.get(this.addToCartButton).click();
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
    cy.get(this.shoppingCart.emptyCartText).should('have.text', expectedText)
  }
  verifyAmountInCart(expectedAmount) {
    cy.get(this.shoppingCart.verifyAmount).invoke('text').then((text) => {
      expect(text.replace(/\u00a0/g, ' ')).equal(expectedAmount)
    })
  }
  fillInDonationAmount(amount) {
    this.shoppingCart.setDonationAmount(amount);
  }
  fillInAndApplyPromoCode(code) {
    this.shoppingCart.setAndApplyPromoCode(code);
  }
}