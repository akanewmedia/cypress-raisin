//The information regarding the libraries
import { clickElement, elementByClass, elementById } from "../utils/actions";

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
    this.container = elementById('header.site-header');
    this.menuActions = elementByClass(this.container, '.rfx-header__actions .nav.nav-pills');
    this.registerButton = elementByClass(this.menuActions, 'li[data-pgid="2"]');
    this.donateButton = elementByClass(this.menuActions, 'li[data-pgid="3"]');
    this.loginButton = elementByClass(this.menuActions, 'li a[href*="login.aspx"]');
    this.logoutButton = elementByClass(this.menuActions, 'li a[href*="logout.aspx"]');
    this.menu = elementById(this.container, '#nav');
    this.volunteerMenuItemLnk = elementByClass(this.menu, 'li[data-pgid="81"][data-mid="80"] a');
    this.scoreboardMenuItemLnk = elementByClass(this.menu, 'li[data-pgid="75"][data-mid="84"] a');
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
    return this.loginButton.isPresent();
  }

  isLoggedIn() {
    return this.logoutButton.isPresent();
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

