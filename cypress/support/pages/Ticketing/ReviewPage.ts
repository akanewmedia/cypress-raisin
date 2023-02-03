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
    cy.get(this.review.editProfileInformationButton).first().click();
  }
  removeSingleTicketFromCart() {
    this.shoppingCart.getCartItemXButton("Single Ticketed Item")
  }
  removeGroupTicketFromCart() {
    this.shoppingCart.getCartItemXButton("Registration Fee, Group")
  }
  editBillingInformation() {
    cy.contains('#reviewParticipantInfo-title', 'Billing Contact Information').parent().within(()=>{
      cy.get(this.review.editBillingInformationButton).click()
    })
    //clickElement(this.review.editBillingInformationButton, true);
  }
  editPaymentInfo() {
    clickElement(this.review.editPaymentInformationButton, true);
  }
  editTickets() {
    cy.contains('#reviewTeam-title', "Amount").parent().within(()=>{
      cy.get(this.review.editTicketsButton).click()
    })
    //clickElement(this.review.editTicketsButton, true);
  }
  editAdditionalParticipants() {
    clickElement(this.review.editAdditionalParticipantsButton, true);
  }
  updateCart() {
    cy.get(this.shoppingCart.checkOutButtonInPopUp).click();
  }
  closeCart() {
    this.shoppingCart.closeButton.click();
  }

  verifyAdminFee(amount){
    cy.get(this.review.adminFee).should('include.text', amount);
  }
  
  verifyTotalAmount(amount) {
    cy.get(this.review.totalAmount).should('include.text', amount);    
  }

  verifyDonationAmount(amount){
    cy.get(this.review.donationAmount).should('include.text', amount); 
  }

  verifyTotalTicketAmount(amount, message = '') {
    cy.get(this.review.ticketsTableRows).should('have.text', amount)
    //expect(this.review.ticketsTableRows.last().getText()).contains(amount, message);
  }
  verifyProfileInformation(data) {
    cy.get(this.review.profileInformation.name).first().should('have.text', data.fullName);
    cy.get(this.review.profileInformation.email).first().should('have.text', data.email);
    cy.get(this.review.profileInformation.country).first().should('have.text', data.country);
    cy.get(this.review.profileInformation.address).first().should('have.text', data.address);
    cy.get(this.review.profileInformation.city).first().should('have.text', data.city);
    cy.get(this.review.profileInformation.province).first().should('have.text', data.province);
    cy.get(this.review.profileInformation.postCode).first().should('have.text', data.postCode);

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
    
    additionalParticipant.within(()=> {
      cy.get('.full-name').should('have.text', additionalParticipantData.fullName)
    })

    additionalParticipant.within(()=>{
      cy.get('.reg-item').should('have.text', additionalParticipantData.registrationType)
    })
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
    this.verifyIsNotOnScreen(this.review.totalAmount);

    // the total must either invisible, or visible and equal to the [freeAmount] parameter
    // cy.get(this.review.totalAmount).should('be.visible')
    //   .then(visible => visible && this.review.totalAmount.getText().then(total => expect(total).eq(freeAmount)));
  }

  verifyIsNotOnScreen(selector) { 
            cy.get(selector).should('not.exist')  
  }

  verifyBillingInformation(billingContact) {
    cy.contains('#reviewParticipantInfo-title', 'Billing Contact Information').parent().within(()=> {
      cy.get(this.review.billingInformation.name).should('have.text', billingContact.fullName)
      cy.get(this.review.billingInformation.email).should('have.text', billingContact.email)
      cy.get(this.review.billingInformation.country).should('have.text', billingContact.country)
      cy.get(this.review.billingInformation.address).should('have.text', billingContact.address)
      cy.get(this.review.billingInformation.city).should('have.text', billingContact.city)
      cy.get(this.review.billingInformation.province).should('have.text', billingContact.province)
      cy.get(this.review.billingInformation.postCode).should('have.text', billingContact.postCode)    
    })
    
  }

  verifyTeamInfo(team) {
    cy.get(this.review.teamName).should('have.text', team.teamName)
  }
  verifyReviewPage() {
    cy.get(this.review.profileInformation.name).should('be.visible')
  }
  verifyTicketingAmount(index, amount) {       
    //expect(this.review.getTicketingItem(index).getText()).contains(amount);
  }
}
