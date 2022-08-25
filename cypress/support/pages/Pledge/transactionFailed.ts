//The information regarding the libraries
import { clickElement, elementByClass, elementById } from '../../utils/actions';

export class TransactionFailed {
  container: any;
  messageContainer: any;
  failedTitle: any;
  transactionNumber: any;
  backToReview: any;
  constructor() {
    this.container = elementById('#base-page-top');
    this.messageContainer = elementById(this.container, 'rx-page-content.page-content-20000');
    this.failedTitle = elementById(this.messageContainer, 'h1');
    this.transactionNumber = elementById(this.messageContainer, 'b');
    this.backToReview = elementByClass(this.container, '.btn-review-transaction');
  }

  verifyTransactionFailed() {
    expect(this.failedTitle.getText()).contains('Unsuccessful');
  }
  verifyTransactionNumber(data) {
    expect(this.transactionNumber.getText()).contains(data.transactionNumberStartsWith);
  }
  goBackToReview() {
    clickElement(this.backToReview);
  }
}
