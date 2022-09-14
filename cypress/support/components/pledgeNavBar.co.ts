import { elementByClass, elementById, clickElement, buildSelector } from '../utils/actions';

export class PledgeNavBarComponent {
  container: any;
  pcNavbarButton: any;
  navbarActions: any;
  registerButton: any;
  donateButton: any;
  loginButton: any;
  logoutButton: any;
  menu: any;

  constructor() {
    this.container = buildSelector('.navbar-default');
    this.pcNavbarButton = buildSelector('.nav li[data-pgid="3"]');
    this.navbarActions = buildSelector(this.container, '.login-actions');
    this.registerButton = buildSelector(this.navbarActions, 'li[data-pgid="2"]');
    this.donateButton = buildSelector(this.navbarActions, 'li[data-pgid="3"]');
    this.loginButton = buildSelector(this.navbarActions, 'li a[href*="login.aspx"]');
    this.logoutButton = buildSelector(this.navbarActions, 'li a[href*="logout.aspx"]');
    this.menu = buildSelector(this.container, '#nav');
  }

  register() {
    // cy.get(this.registerButton).click();
    clickElement(this.registerButton);
  }

  donate() {
    // cy.get(this.donateButton).click();
    clickElement(this.donateButton);
  }
  pcDonate() {
    // cy.get(this.pcNavbarButton).click();
    clickElement(this.pcNavbarButton);
  }
  login() {
    // cy.get(this.loginButton).click();
    clickElement(this.loginButton);
  }

  logout() {
    // cy.get(this.logoutButton).click();
    clickElement(this.logoutButton);
  }

  isLoggedIn() {
    return this.logoutButton.isPresent();
  }

  isLoggedOut() {
    return this.loginButton.isPresent();
  }
}

export default new PledgeNavBarComponent()