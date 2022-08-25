import { elementById } from "../../utils/actions";

/**
 * Represents the volunteer thank you page
 */
export class VolunteerThankYouPage {
  container: any;
  thankYouMessageContainer: any;
  thankYouMessageHeader: any;
  constructor() {
    this.container = elementById('#base-page-top');
    this.thankYouMessageContainer = elementById('div.is-container.is-builder.is-content-800');
    this.thankYouMessageHeader = elementById(this.thankYouMessageContainer, 'h1 span');
  }

  /**
   * Checks the text on the page to see if the submission was successful
   * @param data
   */
  checkSuccessful(data) {
    expect(this.thankYouMessageHeader.getText()).contains(data.successfulVolunteerText);
  }
}
