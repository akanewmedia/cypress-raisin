//The information regarding the libraries
import { elementByClass, enterText } from "../utils/actions";

//Locators
export class LoginModalBox {
  containerbody: any;
  containerfooter: any;
  username: any;
  password: any;
  login: any;
  constructor() {

    this.containerbody = elementByClass('.modal-body');
    this.containerfooter = elementByClass('.modal-footer');
    this.username = elementByClass(this.containerbody, '#LoginUsername');
    this.password = elementByClass(this.containerbody, '#LoginPassword');
    this.login = elementByClass(this.containerfooter, 'button.btn-login');

  }

  clickOnLoginButton() {
    this.login.click();
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

