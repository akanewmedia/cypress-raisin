//The information regarding the libraries
import { enterText, clickElement } from "../utils/actions";

export class Attendee {
  accordian: any;
  details: any;
  firstName: any;
  lastName: any;
  email: any;
  constructor(private container: any) {
    this.accordian = this.container.$('.plusOrMinus');
    this.details = this.container.$('.mat-expansion-panel-content');
    this.firstName = this.details.$('input#firstName');
    this.lastName = this.details.$('input#lastName');
    this.email = this.details.$('input#email');
  }

  updateFirstName(firstName) {
    enterText(this.firstName, firstName);
  }

  updateLastName(lastName) {
    enterText(this.lastName, lastName);
  }

  updateEmail(email) {
    enterText(this.email, email);
  }
}

export class Attendees {
  container: any;
  attendeeSections: any;
  attendeeAccordians: any;
  updateButton: any;
  updateSuccessMessage: any;
  skipStepButton: any;
  constructor() {
    this.container = $('.manage-attendees-container');
    this.attendeeSections = this.container.$$('section.section-border');
    this.attendeeAccordians = this.container.$$('.mat-expansion-panel');
    this.updateButton = this.container.$('button.btn-flow');
    this.updateSuccessMessage = this.container.$('div.bg-success div.text-success');
    this.skipStepButton = this.container.$('#skipThisStep');
  }

  updateAttendee(sectionNumber, attendeeNumber, details) {
    const attendee = new Attendee(this.attendeeSections.get(sectionNumber).$$('.mat-expansion-panel').get(attendeeNumber));
    clickElement(attendee.accordian);
    this.updateAttendeeDetails(attendee, details);
  }

  updateAttendeeDetails(attendee, details) {
    attendee.updateFirstName(details.firstName);
    attendee.updateLastName(details.lastName);
    attendee.updateEmail(details.email);
  }

  skipStepClick() {
    clickElement(this.skipStepButton);
  }

  clickUpdate() {
    clickElement(this.updateButton);
  }
}
