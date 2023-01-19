import { buildSelector } from "../../utils/actions";

export class DonateNowPage {
  container: any;
  donation: any;
  donationText: any;
  donationAmount: any;
  templates: any;
  addAndCheckoutButton: any;

  constructor() {
    this.container = buildSelector('form.system-content');
    this.donation = buildSelector('#donationSection');
    this.donationText = buildSelector(this.donation, '#donationSection-lbl_Donation-title');
    this.donationAmount = buildSelector(this.donation, 'input');
    this.templates = buildSelector('#templates');
    this.addAndCheckoutButton = buildSelector('button.btn-flow');
  }

  verifyDonationText(expectedText) {
    cy.contains(this.donationText, expectedText)
  }

  donate(amount) {
    cy.get(this.donationAmount).type(amount)
    //this.donationAmount.sendKeys(amount);
  }

  clickAddAndCheckout() {
    cy.get(this.addAndCheckoutButton).click();
  }
}