import { Attendees } from "../../components/attendees.co";
import { Review } from "../../components/review.co";
import { ShoppingCart } from "../../components/shoppingCart.co";
export class AttendeesPage {
  attendees: Attendees;
  review: Review;
  shoppingCart: ShoppingCart;

  constructor() {
    this.attendees = new Attendees();
    this.review = new Review();
    this.shoppingCart = new ShoppingCart();
  }

  verifyManageAttendeesDisplayed() {
    expect(this.attendees.container.isDisplayed()).true;
  }
  verifySkipThisStepButtonDisplayed() {
    expect(this.attendees.skipStepButton.isDisplayed()).true;
  }
  verifyNumberOfAttendees(numberOfAttendees) {
    this.attendees.attendeeAccordians.count().then(count => {
      expect(count).eq(numberOfAttendees);
    });
  }
  skipStepClick() {
    this.attendees.skipStepClick();
  }
  updateAttendee(sectionNumber, attendeeNumber, details) {
    this.attendees.updateAttendee(sectionNumber, attendeeNumber, details);
  }
  clickUpdate() {
    this.attendees.clickUpdate();
  }
  verifySuccessMessage(successMessage) {
    expect(this.attendees.updateSuccessMessage.getText()).eq(successMessage);
  }
  editInformation() {
    this.review.editProfileInformationButton.click();
  }
  removeSingleTicketFromCart() {
    this.shoppingCart.getCartItemXButton(0).click();
  }
  removeGroupTicketFromCart() {
    this.shoppingCart.getCartItemXButton(1).click();
  }
  editPaymentInfo() {
    this.review.editPaymentInformationButton.click();
  }
  editTickets() {
    this.review.editTicketsButton.click();
  }
  updateCart() {
    this.shoppingCart.checkOutButtonInPopUp.click();
  }
  closeCart() {
    this.shoppingCart.closeButton.click();
  }
  verifyTotalAmount(amount) {
    expect(this.review.totalAmount.getText()).contains(amount);
  }
  verifyTotalTicketAmount(amount) {
    expect(this.review.ticketsTableRows.last().getText()).contains(amount);
  }
  verifyProfileInformation(data) {
    expect(this.review.profileInformation.name.getText()).eq(data.fullName);
    expect(this.review.profileInformation.email.getText()).eq(data.email);
    expect(this.review.profileInformation.country.getText()).eq(data.country);
    expect(this.review.profileInformation.address.getText()).eq(data.address);
    expect(this.review.profileInformation.city.getText()).eq(data.city);
    expect(this.review.profileInformation.province.getText()).eq(data.province);
    expect(this.review.profileInformation.postCode.getText()).eq(data.postCode);
  }
  /**
   * Verifies all profile information, not just the mandatory fields
   * @param data
   */
  verifyAllProfileInformation(data) {
    this.verifyProfileInformation(data);
    expect(this.review.profileInformation.phone.getText()).eq(data.phoneNumber);
    // TODO: add survey once it is implemented
  }
  verifyPaymentInformation(card) {
    expect(this.review.cardType.getText()).eq(card.verification.type);
    expect(this.review.cardNumber.getText()).eq(card.verification.number);
    expect(this.review.cardHolderName.getText()).eq(card.cardHolderName);
    expect(this.review.expiryDate.getText()).eq(card.verification.expiryDate);
  }
  /**
   * Verifies that no credit card info was captured, and checks the total amount against the passed in value.
   * @param freeAmount - defaulted to $0.00
   */
  //Changing to isDisplayed instead of isPresent as we use ngShow rather than ngIf, so isPresent is always true
  verifyNoPaymentInformation(freeAmount = '$0.00') {
    expect(this.review.cardType.isDisplayed()).toBeFalsy();
    expect(this.review.cardNumber.isDisplayed()).toBeFalsy();
    expect(this.review.cardHolderName.isDisplayed()).toBeFalsy();
    expect(this.review.expiryDate.isDisplayed()).toBeFalsy();
    // the total must either invisible, or visible and equal to the [freeAmount] parameter
    this.review.totalAmount.isPresent().then(visible =>
      visible && this.review.totalAmount.getText().then(total => expect(total).eq(freeAmount)));
  }
  verifyBillingInformation(data) {
    expect(this.review.billingInformation.name.getText()).eq(data.fullName);
    expect(this.review.billingInformation.email.getText()).eq(data.email);
    expect(this.review.billingInformation.country.getText()).eq(data.country);
    expect(this.review.billingInformation.address.getText()).eq(data.address);
    expect(this.review.billingInformation.city.getText()).eq(data.city);
    expect(this.review.billingInformation.province.getText()).eq(data.province);
    expect(this.review.billingInformation.postCode.getText()).eq(data.postCode);
  }
  verifyTeamInfo(team) {
    expect(this.review.teamName.getText()).eq(team.teamName);
  }
  verifyReviewPage() {
    expect(this.review.profileInformation.name.isDisplayed()).true;
  }
  verifyTicketingAmount(index, amount) {
    expect(this.review.getTicketingItem(index).getText()).contains(amount);
  }
}