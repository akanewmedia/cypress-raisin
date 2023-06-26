import { buildSelector } from "../utils/actions";

export class LoginComponent {
  private container: any;
  private usernameInput: any;
  private passwordInput: any;
  private loginButton: any;
  constructor() {
    this.container = ('.pc-login');
    this.usernameInput = buildSelector(this.container,'input.username');
    this.passwordInput = buildSelector(this.container,'input.password');
    this.loginButton = buildSelector(this.container,'button.login');
  }

  async enterUsername(username: string): Promise<void> {
    cy.get(this.usernameInput).type(username)
    // return this.usernameInput.sendKeys(username);
  }

  async enterPassword(password: string): Promise<void> {
    cy.get(this.passwordInput).type(password)

    // return this.passwordInput.sendKeys(password);
  }

  async clearUsername(): Promise<void> {
    cy.get(this.usernameInput).clear()
    // return this.usernameInput.clear();
  }

  async clearPassword(): Promise<void> {
    cy.get(this.passwordInput).clear()
    // return this.passwordInput.clear();
  }

  async clickLoginButton(): Promise<void> {
    cy.get(this.loginButton).click()
    ////return this.loginButton.click();
  }

  async isPresent() {
    cy.get(this.container).should('be.visible')
    // return this.container.isPresent();
  }
}
