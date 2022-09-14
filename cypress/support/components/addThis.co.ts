import { elementByClass } from "../utils/actions";

/**
 * Represents the AddThis component found on various pages
 */
export class AddThisComponent {
  container: any;
  facebookBtn: any;
  constructor() {
    this.container = elementByClass('div[addthis-toolbox]');
    this.facebookBtn = elementByClass(this.container, '[title=Facebook]');
  }

  /**
   * Press the Fb share button in the AddThis component
   */
  pressFacebookBtn() {
    this.facebookBtn.click();
  }
}

