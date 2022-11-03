//The information regarding the libraries

import { buildSelector, clickElement } from "../utils/actions";

export class TicketSuccess {
  container: any;
  tickets: any;
  attendees: any;
  invoice: any;
  downloadTicketsButton: any;
  manageAttendeesButton: any;
  printInvoiceButton: any;
  constructor() {
    this.container = buildSelector('rx-ticket-success-view');
    this.tickets = buildSelector(this.container, '#ticketsBox');
    this.attendees = buildSelector(this.container, '#attendeesBox');
    this.invoice = buildSelector(this.container, '#invoiceBox');
    this.downloadTicketsButton = buildSelector(this.tickets, '#btnPrintTickets');
    this.manageAttendeesButton = buildSelector(this.attendees, '#btnManageAttendees');
    this.printInvoiceButton = buildSelector(this.invoice, '#btnPrintInvoice');
  }

  downloadTickets() {
    clickElement(this.downloadTicketsButton);
  }
  manageAttendees() {
    clickElement(this.manageAttendeesButton);
  }
  printInvoice() {
    clickElement(this.printInvoiceButton);
  }
}
