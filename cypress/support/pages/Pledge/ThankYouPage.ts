import { buildSelector, clickElement, elementByClass, elementById } from '../../utils/actions';

export class ThankYouPage {
  container: any;
  thankYouMessageContainer: any;
  transactionNumber: any;
  systemContentContainer: any;
  startFundraisingButton: any;
  goToProfileButton: any;
  constructor() {
    this.container = buildSelector('#base-page-top');
    this.thankYouMessageContainer = buildSelector(this.container, 'rx-base-page');
    this.transactionNumber = buildSelector(this.thankYouMessageContainer, '.page-content-20000');

    this.systemContentContainer = buildSelector('.system-content');
    this.startFundraisingButton = buildSelector(this.systemContentContainer, '.start-fundraising-btn');
    this.goToProfileButton = buildSelector(this.systemContentContainer, '.sponsor-finish-btn');
  }
  verifyTransactionNumber(data) {
    //Transaction submission may take long, so we delay then we check if container is displayed
    
    cy.contains(this.transactionNumber, data.transactionNumberStartsWith, {timeout:10000})
    //expect(this.transactionNumber.getText()).contains(data.transactionNumberStartsWith);
  }
  verifyTransactionNumberContains(code) {
    cy.contains(this.transactionNumber, code)
    //expect(this.transactionNumber.getText()).contains(code);
  }
  verifySuccessfulTransaction(data) {
    cy.get(data.transactionNumberStartsWith).should('not.have.text', data.transactionNumberStartsWith)
    //expect(this.transactionNumber.getText()).not.contains(data.unsuccessfulTransactionMessage);
  }
  startFundraising() {
    clickElement(this.startFundraisingButton);
  }

  verifiyStartFundraisingIsPresent() {
    // TODO: need better cjeck that the bitton is present
    // expect(this.startFundraisingButton.isPresent()).true;
  }

  goToProfile() {
    cy.get(this.goToProfileButton).click();
  }
}
