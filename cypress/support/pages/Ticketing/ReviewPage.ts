import { clickElement } from "../../utils/actions";
import { Review } from "../../components/review.co";
import { ShoppingCart } from "../../components/shoppingCart.co";

//The information regarding the libraries
export class ReviewPage {
  review: Review;
  shoppingCart: any;
  constructor() {
    this.review = new Review()
    this.shoppingCart = new ShoppingCart();
  }
  editInformation() {
    clickElement(this.review.editProfileInformationButton, true);
  }
  removeSingleTicketFromCart() {
    this.shoppingCart.getCartItemXButton(0).click();
  }
  removeGroupTicketFromCart() {
    this.shoppingCart.getCartItemXButton(1).click();
  }
  editBillingInformation() {
    clickElement(this.review.editBillingInformationButton, true);
  }
  editPaymentInfo() {
    clickElement(this.review.editPaymentInformationButton, true);
  }
  editTickets() {
    clickElement(this.review.editTicketsButton, true);
  }
  editAdditionalParticipants() {
    clickElement(this.review.editAdditionalParticipantsButton, true);
  }
  updateCart() {
    this.shoppingCart.checkOutButtonInPopUp.click();
  }
  closeCart() {
    this.shoppingCart.closeButton.click();
  }
  verifyTotalAmount(amount) {
    cy.get(this.review.totalAmount).should('have.text','$'+ amount);    
  }
  verifyTotalTicketAmount(amount, message = '') {
    expect(this.review.ticketsTableRows.last().getText()).contains(amount, message);
  }
  verifyProfileInformation(data) {
    cy.get(this.review.profileInformation.name).should('have.text', data.fullName);
    cy.get(this.review.profileInformation.email).should('have.text', data.email);
    cy.get(this.review.profileInformation.country).should('have.text', data.country);
    cy.get(this.review.profileInformation.address).should('have.text', data.address + ' ');
    cy.get(this.review.profileInformation.city).should('have.text', data.city);
    cy.get(this.review.profileInformation.province).should('have.text', data.province);
    cy.get(this.review.profileInformation.postCode).should('have.text', data.postCode);

    // expect(this.review.profileInformation.name.getText()).eq(data.fullName);
    // expect(this.review.profileInformation.email.getText()).eq(data.email);
    // expect(this.review.profileInformation.country.getText()).eq(data.country);
    // expect(this.review.profileInformation.address.getText()).eq(data.address);
    // expect(this.review.profileInformation.city.getText()).eq(data.city);
    // expect(this.review.profileInformation.province.getText()).eq(data.province);
    // expect(this.review.profileInformation.postCode.getText()).eq(data.postCode);
  }
  verifyAdditionalParticipantsInformation(data, dataIndex = 0, reviewIndex = 0) {
    const additionalParticipant = this.review.getAdditionalParticipant(reviewIndex);
    const additionalParticipantData = data.additionalParticipants[dataIndex];
    expect(additionalParticipant.fullName.getText()).eq(additionalParticipantData.fullName);
    expect(additionalParticipant.regItem.getText()).eq(additionalParticipantData.registrationType);
  }

  /**
   * Verifies all profile information, not just the mandatory fields
   * @param data
   */
  verifyAllProfileInformation(data) {
    this.verifyProfileInformation(data);
    cy.contains('.review .sr-only', "Phone Number " + data.phoneNumber)
    ///cy.get(this.review.profileInformation.phone).should('have.text', data.phoneNumber)
    //expect(this.review.profileInformation.phone.getText()).eq(data.phoneNumber);
    // TODO: add survey once it is implemented
  }

  verifyPaymentInformation(card) {
    cy.get(this.review.cardType).should('have.text', ' ' + card.verification.type + ' ');
    cy.get(this.review.cardNumber).should('have.text', card.verification.number);
    cy.get(this.review.cardHolderName).should('have.text', card.cardHolderName);
    cy.get(this.review.expiryDate).should('have.text', card.verification.expiryDate);

    // expect(this.review.cardType.getText()).eq(card.verification.type);
    // expect(this.review.cardNumber.getText()).eq(card.verification.number);
    // expect(this.review.cardHolderName.getText()).eq(card.cardHolderName);
    // expect(this.review.expiryDate.getText()).eq(card.verification.expiryDate);
  }

  verifyPayPalInformation(paypalText) {
    expect(this.review.payPalText.getText()).eq(paypalText);
  }

  /**
   * Verifies that no credit card info was captured, and checks the total amount against the passed in value.
   * @param freeAmount - defaulted to $0.00
   */
  verifyNoPaymentInformation(freeAmount = '$0.00') {
    this.verifyIsNotOnScreen(this.review.cardType);
    this.verifyIsNotOnScreen(this.review.cardNumber);
    this.verifyIsNotOnScreen(this.review.cardHolderName);
    this.verifyIsNotOnScreen(this.review.expiryDate);

    // the total must either invisible, or visible and equal to the [freeAmount] parameter
    this.review.totalAmount.isPresent()
      .then(visible => visible && this.review.totalAmount.getText().then(total => expect(total).eq(freeAmount)));
  }

  verifyIsNotOnScreen(selector) {
    selector.isPresent().then(isPresent => {
      if (isPresent) {
        expect(selector.isDisplayed()).false;
      }
    });
  }
  verifyBillingInformation(billingContact) {
    expect(this.review.billingInformation.name.getText()).eq(billingContact.fullName);
    expect(this.review.billingInformation.email.getText()).eq(billingContact.email);
    expect(this.review.billingInformation.country.getText()).eq(billingContact.country);
    expect(this.review.billingInformation.address.getText()).eq(billingContact.address);
    expect(this.review.billingInformation.city.getText()).eq(billingContact.city);
    expect(this.review.billingInformation.province.getText()).eq(billingContact.province);
    expect(this.review.billingInformation.postCode.getText()).eq(billingContact.postCode);
  }

  verifyTeamInfo(team) {
    expect(this.review.teamName.getText()).eq(team.teamName);
  }
  verifyReviewPage() {
    expect(this.review.profileInformation.name.isDisplayed()).true;
  }
  verifyTicketingAmount(index, amount) {       
    //expect(this.review.getTicketingItem(index).getText()).contains(amount);
  }
}
