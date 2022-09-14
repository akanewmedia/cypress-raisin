import { elementById } from "../../../utils/actions";

/**
 * Represents the express checkout Paypal page
 */
class PayPalReviewPage {
  container: any;
  confirmButtonTop: any;

  /**
   * Binds the selectors. Should be called after u navigate to the Paypal page.
   */
  bindSelectors() {
    // can't be 100% sure what container to use on an external site
    // making the selectors as vague as reasonably possible

    this.container = elementById("#main");
    this.confirmButtonTop = elementById(this.container, '#confirmButtonTop');
  }

  /**
   * Presses the continue button at the bottom
   */
  pressContinueButton() {
    this.confirmButtonTop.click();
  }
}
