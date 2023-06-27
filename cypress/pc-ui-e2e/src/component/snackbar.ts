import { buildSelector, clickLink } from "../utils/actions";

export class SnackbarCO {
  container: any;
  snackBarContainer: any;
  messageContainer: any;

  constructor() {
    this.container = ('.cdk-overlay-container');
    this.snackBarContainer = buildSelector(this.container,'.mat-snack-bar-container');
    this.messageContainer = buildSelector(this.container,'.snack-bar-message-container');
  }

  async closeSnackBar(): Promise<void> {
    clickLink('.snack-bar-button-close')
    //return element(by.css('.snack-bar-button-close')).click();
  }

  validateSnackBarMessage(data){
    cy.get(this.messageContainer).should('contain.text', data )
  }

  // async waitforSnackBar(timeout: number = 1000): Promise<void> {
  //   return browser.wait(
  //     ExpectedConditions.elementToBeClickable(element(by.css('.snack-bar-button-close'))),
  //     timeout
  //   );
  // }
}
