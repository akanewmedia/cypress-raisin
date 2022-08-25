import { elementById, enterText } from '../../../utils/actions';

/**
 * Represents the express checkout Paypal page
 */
export class PayPalLoginPage {
  container: any;
  email: any;
  btnNext: any;
  password: any;
  btnLogin: any;

  /**
   * Binds the selectors. Should be called after u navigate to the Paypal page.
   */
  bindSelectors() {
    // can't be 100% sure what container to use on an external site
    // making the selectors as vague as reasonably possible

    this.container = elementById('#main');
    this.email = elementById(this.container, '#email');
    this.btnNext = elementById(this.container, '#btnNext');
    this.password = elementById(this.container, '#password');
    this.btnLogin = elementById(this.container, '#btnLogin');
  }

  /**
   * Enters the email address
   * @param data
   */
  enterEmail(data) {
    enterText(this.email, data.paypal.email);
  }

  /**
   * Presses the next button at the bottom
   */
  pressNextBtn() {
    this.btnNext.click();
  }

  /**
   * Enters the password
   * @param data
   */
  enterPassword(data) {
    enterText(this.password, data.paypal.password);
  }

  /**
   * Presses the login button at the bottom
   */
  pressLoginBtn() {
    this.btnLogin.click();
  }
}

