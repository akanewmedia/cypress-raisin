//The information regarding the libraries
import { clickElement, elementByClass, elementById, enterText } from "../utils/actions";

//Locators
export class CreateAccount {
  container: any;
  proceedAsGuestButton: any;
  username: any;
  password: any;
  createAccountButton: any;
  constructor() {
    this.container = elementById('rx-create-account');
    this.proceedAsGuestButton = elementByClass(this.container, 'a.continue');
    this.username = elementByClass(this.container, 'input.username');
    this.password = elementByClass(this.container, 'input.password');
    this.createAccountButton = elementByClass(this.container, '.btn-login');
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

