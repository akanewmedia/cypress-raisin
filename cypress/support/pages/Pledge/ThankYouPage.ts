import { clickElement, elementByClass, elementById } from '../../utils/actions';

export class ThankYouPage {
  container: any;
  thankYouMessageContainer: any;
  transactionNumber: any;
  systemContentContainer: any;
  startFundraisingButton: any;
  goToProfileButton: any;
  constructor() {
    this.container = elementById('#base-page-top');
    this.thankYouMessageContainer = elementById(this.container, 'rx-base-page');
    this.transactionNumber = elementByClass(this.thankYouMessageContainer, '.page-content-20000');

    this.systemContentContainer = elementByClass('.system-content');
    this.startFundraisingButton = elementByClass(this.systemContentContainer, '.start-fundraising-btn');
    this.goToProfileButton = elementByClass(this.systemContentContainer, '.sponsor-finish-btn');
  }
  verifyTransactionNumber(data) {
    //Transaction submission may take long, so we delay then we check if container is displayed
    expect(this.transactionNumber.getText()).contains(data.transactionNumberStartsWith);
  }
  verifyTransactionNumberContains(code) {
    expect(this.transactionNumber.getText()).contains(code);
  }
  verifySuccessfulTransaction(data) {
    expect(this.transactionNumber.getText()).not.contains(data.unsuccessfulTransactionMessage);
  }
  startFundraising() {
    clickElement(this.startFundraisingButton);
  }

  verifiyStartFundraisingIsPresent() {
    // TODO: need better cjeck that the bitton is present
    // expect(this.startFundraisingButton.isPresent()).true;
  }

  goToProfile() {
    this.goToProfileButton.click();
  }
}
