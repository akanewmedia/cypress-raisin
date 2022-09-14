import { buildSelector, clickElement, elementByClass, elementById } from "../utils/actions";

export class FlowPage {
  continueButton: any;
  backButton: any;
  constructor() {
    this.continueButton = buildSelector('#btnSubmit');
    this.backButton = buildSelector('.btn-flow.btn-back');

  }
  continue() {
    clickElement(this.continueButton, true);
  }
  goBack() {
    clickElement(this.backButton);
  }
}