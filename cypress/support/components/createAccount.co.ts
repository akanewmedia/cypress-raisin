//The information regarding the libraries
import { clickElement, enterText } from "../utils/actions";
//Locators
export class CreateAccount {
  container: any;
  proceedAsGuestButton: any;
  username: any;
  password: any;
  createAccountButton: any;
  constructor() {
    this.container = $('rx-create-account');
    this.proceedAsGuestButton = this.container.$('a.continue');
    this.username = this.container.$('input.username');
    this.password = this.container.$('input.password');
    this.createAccountButton = this.container.$('.btn-login');
  }

  clickOnProceedAsGuestButton() {
    return clickElement(this.proceedAsGuestButton);
  }

  clickOnCreateAccountButton() {
    return clickElement(this.createAccountButton);
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
}

