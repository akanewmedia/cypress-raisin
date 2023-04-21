import { buildSelector, clickElement, elementByClass, elementById } from "../utils/actions";
import { VolunteerThankYouPage } from "./Pledge/VolunteerThankYouPage";

const thankYouPO = new VolunteerThankYouPage();

export class FlowPage {
  continueButton: any;
  backButton: any;
  constructor() {
    this.continueButton = buildSelector('#btnSubmit');
    this.backButton = buildSelector('.btn-flow.btn-back');

  }
  continue() {
    thankYouPO.getConstituent()
    clickElement(this.continueButton, true);
    cy.wait(1000)
  }
  goBack() {
    clickElement(this.backButton);
  }
}