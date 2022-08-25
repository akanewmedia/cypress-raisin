

class PledgeNavBarComponent {

  constructor() {
    this.container = element.all(by.css('.navbar-default')).first();
    this.pcNavbarButton = element.all(by.css('.nav')).first().$('li[data-pgid="3"]');
    this.navbarActions = this.container.element(by.css('.login-actions'));
    this.registerButton = this.navbarActions.element(by.css('li[data-pgid="2"]'));
    this.donateButton = this.navbarActions.$('li[data-pgid="3"]');
    this.loginButton = this.navbarActions.$('li a[href*="login.aspx"]');
    this.logoutButton = this.navbarActions.$('li a[href*="logout.aspx"]');
    this.menu = this.container.$('#nav');
  }

    register() {
        cy.get(this.registerButton).click();
        //clickElement(this.registerButton, true);
      }
    
      donate() {
        cy.get(this.donateButton).click();
        //clickElement(this.donateButton, true);
      }
      pcDonate() {
        cy.get(this.pcNavbarButton).click();
        //clickElement(this.pcNavbarButton, true);
      }
      login() {
        cy.get(this.loginButton).click();
        //clickElement(this.loginButton);
      }
    
      logout() {
        cy.get(this.logoutButton).click();
        //clickElement(this.logoutButton);
      }
    
      isLoggedIn() {        
        return this.logoutButton.isPresent();
      }
    
      isLoggedOut() {
        return this.loginButton.isPresent();
      }
}

export default new PledgeNavBarComponent()