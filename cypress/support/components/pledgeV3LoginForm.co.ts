import { buildSelector ,enterText } from "../utils/actions";

/**
 * Represents the login portion of the login page in Pledge V3. Including the Facebook login button.
 */
export class PledgeV3LoginFormComponent {
  container: any;
  username: any;
  password: any;
  raisinLoginBtn: any;
  facebookLoginBtn: any;
  facebookLogoutBtn: any;
  constructor() {
    // this selects the div that surrounds the username, password and FB login controls
    this.container = buildSelector('.container [id$=pnlLogin]');
    //
    this.username = buildSelector(this.container, '[id$=txtUserName]');
    this.password = buildSelector(this.container, '[id$=txtPassword]');
    this.raisinLoginBtn = buildSelector(this.container, '[id$=btnLogin]');
    this.facebookLoginBtn = buildSelector(this.container, '[id$=fbButton]');
    this.facebookLogoutBtn = buildSelector(this.container, '[id$=FacebookLoginButton_loggedInDiv] .fb-tooltip span');
  }

  /**
   * Enters the username
   * @param username
   */
  enterUsername(username) {
    enterText(this.username, username);
  }

  /**
   * Enters the password
   * @param password
   */
  enterPassword(password) {
    enterText(this.password, password);
  }

  /**
   * Enters both the username and password
   * @param username
   * @param password
   */
  enterUsernameAndPassword(username, password) {
    this.enterUsername(username);
    this.enterPassword(password);
  }

  /**
   * Presses the Raisin login button
   */
  pressRaisinLoginBtn() {
    this.raisinLoginBtn.click();
  }

  /**
   * Presses the Facebook login button
   */
  pressFacebookLoginBtn() {
    this.facebookLoginBtn.click();
  }

  /**
   * Presses the "Not you?" facebook button, which will log you out.
   */
  pressFacebookLogoutBtn() {
    this.facebookLogoutBtn.click();
  }

  isLoggedInToFacebook() {
    return this.facebookLoginBtn.isPresent();
  }
}
