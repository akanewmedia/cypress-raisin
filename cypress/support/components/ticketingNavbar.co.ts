import { clickElement, elementByClass, elementById, enterText } from "../utils/actions";

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
    this.container = elementByClass('header.site-header');
    this.loginButton = elementById(this.container, '#btnLogin');
    this.navbar = elementByClass(this.container, '#nav.nav.navbar-nav');
    this.buyTicketButton = elementByClass(this.navbar, 'li[data-pgid="64"]');
    this.sponsorshipsButton = elementByClass(this.navbar, 'li[data-pgid="65"]');
    this.donateButton = elementByClass(this.navbar, 'li[data-pgid="66"]');
    this.loginDropdown = elementByClass('rx-login-button .login-button.dropdown');
    this.loginDropdownButton = elementByClass(this.loginDropdown, 'button');
    this.cartButton = elementByClass(('rx-shopping-cart-button'), 'button.btn');
    this.logoutButton = elementByClass(this.loginDropdown, 'li.menu-link-logout a');
    this.loginDialog = elementByClass('rx-login .login-panel');
    this.username = elementByClass(this.loginDialog, 'input.username');
    this.password = elementByClass(this.loginDialog, 'input.password');
    this.loginButtonFromDialog = elementByClass(this.loginDialog, 'button.btn-login');
    this.volunteerMenuItemLnk = elementByClass(this.navbar, 'li[data-pgid="81"][data-mid="80"] a');
    this.mobileNavbarCollapseToggle = elementByClass(this.container, 'button.navbar-toggle');
  }

  clickNavButton(button) {
    // TODO: Check if is mobile
    // if (browser.params.isMobile) {
    //   clickElement(this.mobileNavbarCollapseToggle);
    // }
    clickElement(button);
  }

  openCart() {
    clickElement(this.cartButton);
  }

  clickLogin() {
    this.loginButton.click();
  }

  openLoginButtonDropdown() {
    clickElement(this.loginDropdownButton);
  }

  clickOnBuyTickets() {
    this.clickNavButton(this.buyTicketButton);
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
    expect(this.username.isDisplayed()).true;
    enterText(this.username, username);
  }

  enterPassword(password) {
    expect(this.password.isDisplayed()).true;
    enterText(this.password, password);
  }

  enterUsernameAndPassword(username, password) {
    this.enterUsername(username);
    this.enterPassword(password);
  }

  clickOnLogin() {
    expect(this.loginButtonFromDialog.isDisplayed()).true;
    this.loginButtonFromDialog.click();
  }

  clickOnVolunteerMenuItem() {
    this.clickNavButton(this.volunteerMenuItemLnk);
  }
}
