import { clickElement } from "../utils/actions";

export class FlowPage {

  constructor() {
    this.continueButton = cy.get('#btnSubmit');
    this.backButton = cy.get('.btn-flow.btn-back');

  }
  continue() {    
    clickElement(this.continueButton, true);
  }
  goBack() {    
    clickElement(this.backButton);
  }
}