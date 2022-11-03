//The information regarding the libraries
import { buildSelector, clickElement, enterText } from "../utils/actions";

//Locators
export class CreateAccount {
  container: any;
  proceedAsGuestButton: any;
  username: any;
  password: any;
  createAccountButton: any;
  constructor() {
    this.container = buildSelector('rx-create-account');
    this.proceedAsGuestButton = buildSelector(this.container, 'a.continue');
    this.username = buildSelector(this.container, '#username');
    this.password = buildSelector(this.container, '#password');
    this.createAccountButton = buildSelector(this.container, '.btn-login');
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

