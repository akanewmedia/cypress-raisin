//The information regarding the libraries
import { clickElement, elementByClass } from "../utils/actions";

export class TaxReceipts {
  container: any;
  disclaimer: any;
  title: any;
  form: any;
  optInRadioButton: any;
  optOutRadioButton: any;
  constructor() {
    this.container = elementByClass('rx-user-details-tax-receipts');
    this.disclaimer = elementByClass(this.container, 'small');
    this.title = elementByClass(this.container, 'h2');
    this.form = elementByClass(this.container, '.form-group');
    this.optInRadioButton = elementByClass(this.form, '#OptTaxReceiptYes + label');
    this.optOutRadioButton = elementByClass(this.form, '#OptTaxReceiptNo + label');
  }

  optIn() {
    clickElement(this.optInRadioButton);
  }

  optOut() {
    clickElement(this.optOutRadioButton);
  }
}
