import { buildSelector, elementByClass, elementsByClass } from "../utils/actions";

export class AdditionalParticipantReview {
  additionalParticipantInfo: any;
  fullName: any;
  regItem: any;
  constructor(container) {
    this.additionalParticipantInfo = container;
    this.fullName = buildSelector(this.additionalParticipantInfo, '.full-name');
    this.regItem = buildSelector(this.additionalParticipantInfo, '.reg-item');
  }
}

export class Review {
  container: any;
  profileInformation: ReviewProfile;
  teamInformation: any;
  editProfileInformationButton: any;
  ticketingInformation: any;
  ticketsTableRows: any;
  editTicketsButton: any;
  paymentInformation: any;
  cardType: any;
  cardNumber: any;
  cardHolderName: any;
  expiryDate: any;
  payPalText: any;
  editPaymentInformationButton: any;
  amountInformation: any;
  adminFee: any;
  totalAmount: any;
  donationAmount: any;
  editAmountButton: any;
  teamName: any;
  billingInformation: ReviewProfile;
  editBillingInformationButton: any;
  registrationInformation: any;
  additionalParticipants: any;
  additionalParticipantsContainer: any;
  editAdditionalParticipantsButton: any;
  constructor() {
    this.container = buildSelector('.review');
    this.profileInformation = new ReviewProfile(buildSelector('rx-participant-info'));
    this.teamInformation = buildSelector(this.container, 'rx-team-info');
    this.editProfileInformationButton = buildSelector('.btn-flow--reverse');
    this.ticketingInformation = buildSelector(this.container, 'rx-ticketing-info');
    this.ticketsTableRows = buildSelector('.shopping-items tr:last-child span');
    this.editTicketsButton = buildSelector('.btn-flow--reverse');
    this.paymentInformation = buildSelector(this.container, 'rx-payment-info');
    this.cardType = buildSelector(this.paymentInformation, '.review-cardType');
    this.cardNumber = buildSelector(this.paymentInformation, '.review-creditCardNumberMasked');
    this.cardHolderName = buildSelector(this.paymentInformation, '.review-cardHolderName');
    this.expiryDate = buildSelector(this.paymentInformation, '.review-cardExpirationDate');
    this.payPalText = buildSelector(this.paymentInformation, '.review-paypal');
    this.editPaymentInformationButton = buildSelector(this.paymentInformation, '.btn-flow--reverse');
    this.amountInformation = buildSelector(this.container, 'rx-amount-info');
    this.adminFee = buildSelector(this.amountInformation, '#amountinfo-adminfee')
    this.totalAmount = buildSelector(this.amountInformation, '.review-totalAmount');
    this.donationAmount = buildSelector('.amount-info > .panel > .panel-collapse > .panel-body > :nth-child(2) > :nth-child(2) > div')
    this.editAmountButton = buildSelector(this.amountInformation, 'div.edit-link a.btn-flow--reverse');
    this.teamName = buildSelector(this.teamInformation, '.review-teamName');
    this.ticketingInformation = new ReviewProfile(buildSelector(this.container, 'rx-ticketing-info'));
    this.billingInformation = new ReviewProfile(buildSelector(this.container, 'rx-participant-info[ng-reflect-is-billing="true"]'));
    this.editBillingInformationButton = buildSelector('.edit-link a');
    this.registrationInformation = buildSelector(this.container, 'rx-registration-info');
    this.additionalParticipants = buildSelector(this.registrationInformation, 'div[ng-repeat="ap in .additionalParticipants"]');
    this.additionalParticipantsContainer = buildSelector(this.container, '.additional-participants-review-container');
    this.editAdditionalParticipantsButton = buildSelector(this.additionalParticipantsContainer, '.edit-additional-participants-btn');
  }

  getAdditionalParticipant(index) {
    return cy.get('.review' + ' .additional-participants-review-container' + ' .additional-participant').eq(index)
  }  
  

  getTicketingItem(index) {
    return elementsByClass(this.ticketingInformation, 'table tr').get(index + 1);
  }
}

export class ReviewProfile {
  container: any;
  name: any;
  email: any;
  country: any;
  address: any;
  city: any;
  province: any;
  postCode: any;
  phone: any;
  fundraisingGoal: any;
  username: any;
  taxReceipt: any;
  constructor(container) {
    this.container = container;
    this.name = buildSelector('.review-participantName');
    this.email = buildSelector('.review-email');
    this.country = buildSelector('.review-country');
    this.address = buildSelector('.review-address');
    this.city = buildSelector('.review-city');
    this.province = buildSelector('.review-province');
    this.postCode = buildSelector('.review-postalCode');
    this.phone = buildSelector(this.container, '.review-phone');
    this.fundraisingGoal = buildSelector(this.container, '.review-fundraisingGoal');
    this.username = buildSelector(this.container, '.review-username');
    this.taxReceipt = buildSelector(this.container, '.review-taxReceipt');
  }
}
