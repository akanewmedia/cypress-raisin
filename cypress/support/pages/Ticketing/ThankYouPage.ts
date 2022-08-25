import { TicketSuccess } from "../../components/ticketSuccess.co";
import { elementByClass } from "../../utils/actions";

export class ThankYouPage {
  thankYouMessageContainer: any;
  transactionNumber: any;
  ticketSuccessButtons: any;

  constructor() {
    this.thankYouMessageContainer = elementByClass('#base-page-top .page-content-20000');
    this.transactionNumber = elementByClass(this.thankYouMessageContainer, '.row .column');
    this.ticketSuccessButtons = new TicketSuccess();
  }

  verifyTransactionNumber(data) {
    expect(this.transactionNumber.getText()).contains(data.transactionNumberStartsWith);
  }
  clickOnDownloadInvoiceButton() {
    this.ticketSuccessButtons.downloadInvoice();
  }
  clickOnManageAttendeesButton() {
    this.ticketSuccessButtons.manageAttendees();
  }
  downloadTicketButtonPresence() {
    expect(this.ticketSuccessButtons.downloadTicketsButton.isDisplayed()).true;
  }
  manageAttendeesButtonPresence() {
    expect(this.ticketSuccessButtons.manageAttendeesButton.isDisplayed()).true;
  }
  downloadInvoiceButtonPresense() {
    expect(this.ticketSuccessButtons.printInvoiceButton.isDisplayed()).true;
  }
}
