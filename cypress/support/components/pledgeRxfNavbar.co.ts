//The information regarding the libraries
import { buildSelector, clickElement, elementByClass, elementById } from "../utils/actions";

export class PledgeRxfNavBarComponent {
  container: any;
  registerButton: any;
  donateButton: any;
  loginButton: any;
  logoutButton: any;
  menu: any;
  volunteerMenuItemLnk: any;
  scoreboardMenuItemLnk: any;
  menuActions: any;
  constructor() {
    this.container = buildSelector('header.site-header');
    this.menuActions = buildSelector(this.container, '.rfx-header__actions .nav.nav-pills');
    this.registerButton = buildSelector(this.menuActions, 'li[data-pgid="2"]');
    this.donateButton = buildSelector(this.menuActions, 'li[data-pgid="3"]');
    this.loginButton = buildSelector(this.menuActions, 'li a[href*="login.aspx"]');
    this.logoutButton = buildSelector(this.menuActions, 'li a[href*="logout.aspx"]');
    this.menu = buildSelector(this.container, '#nav');
    this.volunteerMenuItemLnk = buildSelector(this.menu, 'li[data-pgid="81"][data-mid="80"] a');
    this.scoreboardMenuItemLnk = buildSelector(this.menu, 'li[data-pgid="75"][data-mid="84"] a');
  }

  register() {
    clickElement(this.registerButton);
  }

  donate() {
    // expect(this.donateButton.isDisplayed()).true;
    clickElement(this.donateButton);
  }

  login() {
    clickElement(this.loginButton);
  }

  logout() {
    clickElement(this.logoutButton);
  }

  isLoggedOut() {
    return cy.get(this.logoutButton).should('be.visible')
  }

  isLoggedIn() {
    return cy.get(this.loginButton).should('be.visible')
  }

  /**
   * Clicks on the volunteer menu item
   */
  clickOnVolunteerMenuItem() {
    clickElement(this.volunteerMenuItemLnk);
  }

  /**
   * Clicks on the scoreboard menu item
   */
  clickOnScoreboardMenuItem() {
    clickElement(this.scoreboardMenuItemLnk);
  }
}

