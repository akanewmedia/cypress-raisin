//The information regarding the libraries

import { clickElement, elementByClass } from "../utils/actions";

export class TicketSuccess {
  container: any;
  tickets: any;
  attendees: any;
  invoice: any;
  downloadTicketsButton: any;
  manageAttendeesButton: any;
  printInvoiceButton: any;
  constructor() {
    this.container = elementByClass('rx-ticket-success-view');
    this.tickets = elementByClass(this.container, '#ticketsBox');
    this.attendees = elementByClass(this.container, '#attendeesBox');
    this.invoice = elementByClass(this.container, '#invoiceBox');
    this.downloadTicketsButton = elementByClass(this.tickets, '#btnPrintTickets');
    this.manageAttendeesButton = elementByClass(this.attendees, '#btnManageAttendees');
    this.printInvoiceButton = elementByClass(this.invoice, '#btnPrintInvoice');
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
