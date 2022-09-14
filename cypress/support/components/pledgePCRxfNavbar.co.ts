//The information regarding the libraries
import { elementByClass, elementById } from "../utils/actions";
/**
 * Represents the RXF Navbar while logged in to PC
 */
export class PledgePCRxfNavBarComponent {
  container: any;
  registerButton: any;
  donateButton: any;
  loginButton: any;
  logoutButton: any;
  menu: any;
  menuAction: any;
  constructor() {
    this.container = elementByClass('div.rfx-header__actions');
    this.menuAction = elementByClass(this.container, '.nav.nav-pills');
    this.registerButton = elementByClass(this.menuAction, 'li[data-pgid="2"]');
    this.donateButton = elementByClass(this.menuAction, 'li[data-pgid="3"]');
    this.loginButton = elementByClass(this.menuAction, 'li a[href*="login.aspx"]');
    this.logoutButton = elementByClass(this.menuAction, 'li a[href*="logout.aspx"]');
    this.menu = elementById(this.container, '#nav');
  }

  register() {
    this.registerButton.click();
  }

  donate() {
    this.donateButton.click();
  }

  login() {
    this.loginButton.click();
  }

  logout() {
    this.logoutButton.click();
  }

  isLoggedIn() {
    return this.logoutButton.isPresent();
  }
}
