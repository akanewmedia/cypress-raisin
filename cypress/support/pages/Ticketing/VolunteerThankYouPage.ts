import { elementByClass } from "../../utils/actions";

export class VolunteerThankYouPage {
  thankYouMessageContainer: any;
  thankYouMessage: any;
  constructor() {
    this.thankYouMessageContainer = elementByClass('rx-page-content[ng-reflect-region-id="20000"] .is-container.is-builder');
    this.thankYouMessage = elementByClass(this.thankYouMessageContainer, '.row .column h1');
  }

  verifyVolunteerThankYouMessage(thankYouMessage) {
    expect(this.thankYouMessage.getText()).contains(thankYouMessage);
  }
}
