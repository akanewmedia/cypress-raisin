//The information regarding the libraries
import { buildSelector, clickElement } from '../../utils/actions';

export class TransactionFailed {
  container: any;
  messageContainer: any;
  failedTitle: any;
  transactionNumber: any;
  backToReview: any;
  constructor() {
    this.container = buildSelector('#base-page-top');
    this.messageContainer = buildSelector(this.container, 'rx-page-content.page-content-20000');
    this.failedTitle = buildSelector(this.messageContainer, 'h1');
    this.transactionNumber = buildSelector(this.messageContainer, 'b');
    this.backToReview = buildSelector(this.container, '.btn-review-transaction');
  }

  verifyTransactionFailed() {
    cy.contains(this.failedTitle, 'Unsuccessful')
  }
  verifyTransactionNumber(data) {
    cy.contains(this.transactionNumber, data.transactionNumberStartsWith)
  }
  goBackToReview() {
    clickElement(this.backToReview);
  }
}
