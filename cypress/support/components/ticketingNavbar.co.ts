import { buildSelector, clickElement, enterText } from "../utils/actions";

export class TicketingNavBar {
  container: any;
  loginButton: any;
  navbar: any;
  buyTicketButton: any;
  sponsorshipsButton: any;
  donateButton: any;
  loginDropdown: any;
  loginDropdownButton: any;
  cartButton: any;
  logoutButton: any;
  loginDialog: any;
  username: any;
  password: any;
  loginButtonFromDialog: any;
  volunteerMenuItemLnk: any;
  mobileNavbarCollapseToggle: any;
  constructor() {
    this.container = buildSelector('header.site-header');
    this.loginButton = buildSelector(this.container, '#btnLogin');
    this.navbar = buildSelector(this.container, '#nav.nav.navbar-nav');
    this.buyTicketButton = buildSelector(this.navbar, 'li[data-pgid="64"]');
    this.sponsorshipsButton = buildSelector(this.navbar, 'li[data-pgid="65"]');
    this.donateButton = buildSelector(this.navbar, 'li[data-pgid="66"]');
    this.loginDropdown = buildSelector('rx-login-button .login-button.dropdown');
    this.loginDropdownButton = buildSelector(this.loginDropdown, 'button');
    this.cartButton = buildSelector('rx-shopping-cart-button', 'button.btn');
    this.logoutButton = buildSelector(this.loginDropdown, 'li.menu-link-logout a');
    this.loginDialog = buildSelector('rx-login .login-panel');
    this.username = buildSelector(this.loginDialog, 'input.username');
    this.password = buildSelector(this.loginDialog, 'input.password');
    this.loginButtonFromDialog = buildSelector(this.loginDialog, 'button.btn-login');
    this.volunteerMenuItemLnk = buildSelector(this.navbar, 'li[data-pgid="81"][data-mid="80"] a');
    this.mobileNavbarCollapseToggle = buildSelector(this.container, 'button.navbar-toggle');
  }

  clickNavButton(button) {
    // TODO: Check if is mobile
    // if (browser.params.isMobile) {
    //   clickElement(this.mobileNavbarCollapseToggle);
    // }
    clickElement(button);
  }

  openCart() {
    cy.get(this.cartButton).click()
  }

  clickLogin() {
    this.loginButton.click();
  }

  openLoginButtonDropdown() {
    clickElement(this.loginDropdownButton);
  }

  clickOnBuyTickets() {
    cy.get(this.buyTicketButton).click()
  }

  clickOnSponsorships() {
    this.clickNavButton(this.sponsorshipsButton);
  }

  clickOnDonate() {
    this.clickNavButton(this.donateButton);
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

  logout() {
    clickElement(this.loginDropdownButton);
    clickElement(this.logoutButton, false);
  }

  enterUsername(username) {
    cy.get(this.username).should('exist')
    enterText(this.username, username);
  }

  enterPassword(password) {
    cy.get(this.password).should('be.visible')
    enterText(this.password, password);
  }

  enterUsernameAndPassword(username, password) {
    this.enterUsername(username);
    this.enterPassword(password);
  }

  clickOnLogin() {
    cy.get(this.loginButtonFromDialog).should('be.visible')
    cy.get(this.loginButtonFromDialog).click();
  }

  clickOnVolunteerMenuItem() {
    this.clickNavButton(this.volunteerMenuItemLnk);
  }
}
