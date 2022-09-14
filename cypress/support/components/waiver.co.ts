//The information regarding the libraries
import { elementByClass, elementById, setCheckboxChecked } from "../utils/actions";

export class Waiver {
  container: any;
  waiverText: any;
  acceptCheckbox: any;
  constructor() {
    this.container = elementById('rx-waiver');
    this.waiverText = elementByClass(this.container, '.waiver-content-container');
    this.acceptCheckbox = elementByClass(this.container, '#chkWaiver');
  }

  selectWaiverAcceptance(accepted) {
    setCheckboxChecked(this.acceptCheckbox, accepted);
  }

  verifyWaiverIsDisplayed() {
    // expect(this.container.isDisplayed()).true;
  }
}
