import { elementById, enterText } from '../../../utils/actions';

/**
 * Represents the Facebook login page/form
 */
export class FacebookLoginForm {
  container: any;
  email: any;
  pass: any;
  loginBtn: any;

  /**
   * Sets all the selectors. This should be called once the Facebook login modal is actually shown.
   * Otherwise the selectors will be null;
   */
  bindSelectors() {
    this.container = elementById('#loginform');
    this.email = elementById(this.container, '#email');
    this.pass = elementById(this.container, '#pass');
    this.loginBtn = elementById(this.container, '#loginbutton');
  }

  /**
   * Enters the email address in the facebook login form using data.facebook.email
   * @param data
   */
  enterEmail(data) {
    enterText(this.email, data.facebook.email);
  }

  /**
   * Enters the password in the facebook login form using data.facebook.password
   * @param data
   */
  enterPassword(data) {
    enterText(this.pass, data.facebook.password);
  }

  /**
   * Presses the login button
   */
  pressLoginBtn() {
    this.loginBtn.click();
  }
}
