import { elementById } from "../../../utils/actions";

/**
 * Represents the express checkout Paypal page
 */
export class PayPalExpressCheckoutPage {
  container: any;
  loginBtn: any;

  /**
   * Binds the selectors. Should be called after u navigate to the Paypal page.
   */
  bindSelectors() {
    // can't be 100% sure what container to use on an external site
    this.container = elementById("#main");
    // making the selector as vague as reasonably possible
    this.loginBtn = elementById(this.container, '.baslLoginButtonContainer');
  }

  /**
   * Presses the login button at the top
   */
  pressLoginBtn() {
    this.loginBtn.click();
  }
}
