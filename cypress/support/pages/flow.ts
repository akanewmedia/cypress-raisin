import { clickElement, elementByClass, elementById } from "../utils/actions";

export class FlowPage {
  continueButton: any;
  backButton: any;
  constructor() {
    this.continueButton = elementById('#btnSubmit');
    this.backButton = elementByClass('.btn-flow.btn-back');

  }
  continue() {
    clickElement(this.continueButton, true);
  }
  goBack() {
    clickElement(this.backButton);
  }
}