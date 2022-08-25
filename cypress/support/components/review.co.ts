import { elementByClass, elementsByClass } from "../utils/actions";

export class AdditionalParticipantReview {
  additionalParticipantInfo: any;
  fullName: any;
  regItem: any;
  constructor(container) {
    this.additionalParticipantInfo = container;
    this.fullName = elementByClass(this.additionalParticipantInfo, '.full-name');
    this.regItem = elementByClass(this.additionalParticipantInfo, '.reg-item');
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
  totalAmount: any;
  editAmountButton: any;
  teamName: any;
  billingInformation: ReviewProfile;
  editBillingInformationButton: any;
  registrationInformation: any;
  additionalParticipants: any;
  additionalParticipantsContainer: any;
  editAdditionalParticipantsButton: any;
  constructor() {
    this.container = elementByClass('.review');
    this.profileInformation = new ReviewProfile(this.container.get('rx-participant-info').first());
    this.teamInformation = elementByClass(this.container, 'rx-team-info');
    this.editProfileInformationButton = elementByClass(this.profileInformation.container, '.edit-link').get('.btn-flow--reverse');
    this.ticketingInformation = elementByClass(this.container, 'rx-ticketing-info');
    this.ticketsTableRows = elementByClass(this.ticketingInformation, 'table').get('tr');
    this.editTicketsButton = this.ticketingInformation.get('.edit-link').get('.btn-flow--reverse');
    this.paymentInformation = elementByClass(this.container, 'rx-payment-info');
    this.cardType = elementByClass(this.paymentInformation, '.review-cardType');
    this.cardNumber = elementByClass(this.paymentInformation, '.review-creditCardNumberMasked');
    this.cardHolderName = elementByClass(this.paymentInformation, '.review-cardHolderName');
    this.expiryDate = elementByClass(this.paymentInformation, '.review-cardExpirationDate');
    this.payPalText = elementByClass(this.paymentInformation, '.review-paypal');
    this.editPaymentInformationButton = elementByClass(this.paymentInformation, '.edit-link').$('.btn-flow--reverse');
    this.amountInformation = elementByClass(this.container, 'rx-amount-info');
    this.totalAmount = elementByClass(this.amountInformation, '.review-totalAmount');
    this.editAmountButton = elementByClass(this.amountInformation, 'div.edit-link a.btn-flow--reverse');
    this.teamName = elementByClass(this.teamInformation, '.review-teamName');
    this.ticketingInformation = elementByClass(this.container, 'rx-ticketing-info');
    this.billingInformation = new ReviewProfile(elementByClass(this.container, 'rx-participant-info[ng-reflect-is-billing="true"]'));
    this.editBillingInformationButton = elementByClass(this.billingInformation.container, '.edit-link .btn-flow--reverse');
    this.registrationInformation = elementByClass(this.container, 'rx-registration-info');
    this.additionalParticipants = elementByClass(this.registrationInformation, 'div[ng-repeat="ap in .additionalParticipants"]');
    this.additionalParticipantsContainer = elementByClass(this.container, '.additional-participants-review-container');
    this.editAdditionalParticipantsButton = elementByClass(this.additionalParticipantsContainer, '.edit-additional-participants-btn');
  }

  getAdditionalParticipant(index) {
    return new AdditionalParticipantReview(elementsByClass(this.additionalParticipantsContainer, '.additional-participant').get(index));
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
    this.name = elementByClass(this.container, '.review-participantName');
    this.email = elementByClass(this.container, '.review-email');
    this.country = elementByClass(this.container, '.review-country');
    this.address = elementByClass(this.container, '.review-address');
    this.city = elementByClass(this.container, '.review-city');
    this.province = elementByClass(this.container, '.review-province');
    this.postCode = elementByClass(this.container, '.review-postalCode');
    this.phone = elementByClass(this.container, '.review-phone');
    this.fundraisingGoal = elementByClass(this.container, '.review-fundraisingGoal');
    this.username = elementByClass(this.container, '.review-username');
    this.taxReceipt = elementByClass(this.container, '.review-taxReceipt');
  }
}
