import { TicketSuccess } from "../../components/ticketSuccess.co";
import { buildSelector, logConstituent} from "../../utils/actions";

export class ThankYouPage {
  thankYouMessageContainer: any;
  transactionNumber: any;
  ticketSuccessButtons: any;

  constructor() {
    this.thankYouMessageContainer = buildSelector('#base-page-top .page-content-20000');
    this.transactionNumber = buildSelector(this.thankYouMessageContainer, '.row .column');
    this.ticketSuccessButtons = new TicketSuccess();
  }

  verifyTransactionNumber(data) {
    logConstituent()
    cy.contains(this.transactionNumber, data.transactionNumberStartsWith)
  }
  clickOnDownloadInvoiceButton() {
    this.ticketSuccessButtons.downloadInvoice();
  }
  clickOnManageAttendeesButton() {
    this.ticketSuccessButtons.manageAttendees();
  }
  downloadTicketButtonPresence() {
    cy.get(this.ticketSuccessButtons.downloadTicketsButton).should('be.visible')
  }
  manageAttendeesButtonPresence() {
    cy.get(this.ticketSuccessButtons.manageAttendeesButton).should('be.visible')
  }
  downloadInvoiceButtonPresense() {
    cy.get(this.ticketSuccessButtons.printInvoiceButton).should('be.visible')
  }
}
