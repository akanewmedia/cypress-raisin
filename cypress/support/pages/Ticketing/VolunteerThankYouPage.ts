import { buildSelector } from "../../utils/actions";

export class VolunteerThankYouPage {
  thankYouMessageContainer: any;
  thankYouMessage: any;
  constructor() {
    this.thankYouMessageContainer = buildSelector('.page-content-20000');
    this.thankYouMessage = buildSelector(this.thankYouMessageContainer, '.row .column h1');
  }

  verifyVolunteerThankYouMessage(thankYouMessage) {
    cy.contains(this.thankYouMessage, thankYouMessage)
  }
}
