//The information regarding the libraries
import { enterText, clickElement, buildSelector } from "../utils/actions";

// export class Attendee {
//   accordian: any;
//   details: any;
//   firstName: any;
//   lastName: any;
//   email: any;
//   constructor(private container: any) {
//     this.accordian = buildSelector(this.container, '.plusOrMinus');
//     this.details = buildSelector(this.container, '.mat-expansion-panel-content');
//     this.firstName = buildSelector(this.details, 'input#firstName');
//     this.lastName = buildSelector(this.details, 'input#lastName');
//     this.email = buildSelector(this.details, 'input#email');
//   }

//   updateFirstName(firstName) {
//     enterText(this.firstName, firstName);
//   }

//   updateLastName(lastName) {
//     enterText(this.lastName, lastName);
//   }

//   updateEmail(email) {
//     enterText(this.email, email);
//   }
// }

export class Attendees {
  container: any;
  attendeeSections: any;
  attendeeAccordians: any;
  updateButton: any;
  updateSuccessMessage: any;
  skipStepButton: any;
  accordian: any;
  details: any;
  firstName: any;
  lastName: any;
  email: any;
  constructor() {
    this.container = buildSelector('.manage-attendees-container');
    this.attendeeSections = buildSelector(this.container, 'section.section-border');
    this.attendeeAccordians = buildSelector('.mat-expansion-panel');
    this.updateButton = buildSelector(this.container, 'button.btn-flow');
    this.updateSuccessMessage = buildSelector(this.container, 'div.bg-success div.text-success');
    this.skipStepButton = buildSelector(this.container, '#skipThisStep');
    this.accordian = buildSelector('.plusOrMinus');
    this.details = buildSelector('.mat-expansion-panel-content');
    this.firstName = buildSelector(this.details, 'input#firstName');
    this.lastName = buildSelector(this.details, 'input#lastName');
    this.email = buildSelector(this.details, 'input#email');
  }  

  updateAttendee(sectionNumber, attendeeNumber, details) {
    cy.get(this.attendeeSections).eq(sectionNumber).within(()=> {
      cy.get(this.attendeeAccordians).eq(attendeeNumber).within(()=>{
        cy.get(this.accordian).click()
        this.updateAttendeeDetails(details);     
      })      
    })
    
  }

  updateAttendeeDetails(details) {
    this.updateFirstName(details.firstName);
    this.updateLastName(details.lastName);
    this.updateEmail(details.email);
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

  skipStepClick() {
    clickElement(this.skipStepButton);
  }

  clickUpdate() {
    clickElement(this.updateButton);
  }
}
