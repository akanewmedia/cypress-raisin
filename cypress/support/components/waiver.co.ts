//The information regarding the libraries
import { buildSelector, setCheckboxChecked } from "../utils/actions";

export class Waiver {
  container: any;
  waiverText: any;
  acceptCheckbox: any;
  constructor() {
    this.container = buildSelector('rx-waiver');
    this.waiverText = buildSelector(this.container, '.waiver-content-container');
    this.acceptCheckbox = buildSelector(this.container, '#chkWaiver');
  }

  selectWaiverAcceptance(accepted) {
    setCheckboxChecked(this.acceptCheckbox, accepted);
  }

  verifyWaiverIsDisplayed() {
    // expect(this.container.isDisplayed()).true;
  }
}
