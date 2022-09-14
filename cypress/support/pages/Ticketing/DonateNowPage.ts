import { elementByClass } from "../../utils/actions";

export class DonateNowPage {
  container: any;
  donation: any;
  donationText: any;
  donationAmount: any;
  templates: any;
  addAndCheckoutButton: any;

  constructor() {
    this.container = elementByClass('form.system-content');
    this.donation = elementByClass(this.container, '#donationSection');
    this.donationText = elementByClass(this.donation, '#donationSection-lbl_Donation-title');
    this.donationAmount = elementByClass(this.donation, 'input');
    this.templates = elementByClass(this.container, '#templates');
    this.addAndCheckoutButton = elementByClass(this.container, 'button.btn-flow');
  }

  verifyDonationText(expectedText) {
    expect(this.donationText.getText()).eq(expectedText);
  }

  donate(amount) {
    this.donationAmount.sendKeys(amount);
  }

  clickAddAndCheckout() {
    this.addAndCheckoutButton.click();
  }
}