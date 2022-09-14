//The information regarding the libraries
import { buildSelector, clickElement, elementByClass } from "../utils/actions";

export class TaxReceipts {
  container: any;
  disclaimer: any;
  title: any;
  form: any;
  optInRadioButton: any;
  optOutRadioButton: any;
  constructor() {
    this.container = buildSelector('rx-user-details-tax-receipts');
    this.disclaimer = buildSelector(this.container, 'small');
    this.title = buildSelector(this.container, 'h2');
    this.form = buildSelector(this.container, '.form-group');
    this.optInRadioButton = buildSelector(this.form, '#OptTaxReceiptYes + label');
    this.optOutRadioButton = buildSelector(this.form, '#OptTaxReceiptNo + label');
  }

  optIn() {
    clickElement(this.optInRadioButton);
  }

  optOut() {
    clickElement(this.optOutRadioButton);
  }
}
