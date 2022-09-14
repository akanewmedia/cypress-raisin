//The information regarding the libraries
import { clickElement, elementByClass, enterText } from "../utils/actions";

export class ReturningParticipant {
  container: any;
  username: any;
  password: any;
  loginButton: any;
  loginViaFacebookButton: any;
  forgotDetails: any;
  createAccountButton: any;
  constructor() {
    this.container = elementByClass('.returning-participant');
    this.username = elementByClass(this.container, '#username');
    this.password = elementByClass(this.container, '#password');
    this.loginButton = elementByClass(this.container, '.btn-login');
    this.loginViaFacebookButton = elementByClass(this.container, '.fb-login-button');
    this.forgotDetails = elementByClass(this.container, '.btn-link.btn-flow[key="subttl_ForgotLogin"]');
    this.createAccountButton = elementByClass(this.container, '.returning-participant-newUser');
  }

  clickForgotDetails() {
    clickElement(this.forgotDetails);
  }

  createAccount() {
    clickElement(this.createAccountButton, true);
  }

  loginViaFacebook() {
    clickElement(this.loginViaFacebookButton);
  }

  login() {
    clickElement(this.loginButton);
  }

  enterUsername(username) {
    enterText(this.username, username);
  }

  enterPassword(password) {
    enterText(this.password, password);
  }

  enterUsernameAndPassword(username, password) {
    this.enterUsername(username);
    this.enterPassword(password);
  }

  verifyReturnParticipantIsDisplayed() {
    // expect(this.username.isDisplayed()).true;
    // expect(this.password.isDisplayed()).true;
    // expect(this.createAccountButton.isDisplayed()).true;
    // expect(this.loginButton.isDisplayed()).true;
  }
}