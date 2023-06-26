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
    //this.container = buildSelector(this.container, '.login-actions');
    this.registerButton = buildSelector(this.container, 'li[data-pgid="2"]');
    this.donateButton = buildSelector(this.container, 'li[data-pgid="3"]');
    this.loginButton = buildSelector(this.container, 'li .login-btn');
    this.logoutButton = buildSelector(this.container, 'li a[href*="logout.aspx"]');
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

  isLoggedOut() {
    if(cy.get(this.loginButton).should('be.visible')) {
      return true
    }
    else {
      return false
    }
  }

  isLoggedIn() {
    if(cy.get(this.logoutButton).should('be.visible')) {
      return true
    }
    else {
      return false
    }
  }
}

export default new PledgeNavBarComponent()