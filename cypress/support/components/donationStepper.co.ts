
import { clickElement, elementByClass, elementsByClass, setFocus } from "../utils/actions";
import { DonationDetails } from "./donationDetails.co";
import { DonationDonorInformation } from "./donationDonorInformation.co";
import { TributeInformation } from "./donationTributeInformation.co";
import { DonationPaymentInformation } from "./donationPaymentInformation.co";
import { DonationError } from "./donationError.co";
import { isNil } from "lodash";

/**
 * A class used to move between steps in the Donations form
 */
export class DonationStepper {

  container: any;
  steps: any;
  donationDetails: DonationDetails;
  tributeInformation: TributeInformation;
  donorInformation: DonationDonorInformation;
  paymentInformation: DonationPaymentInformation;
  donationError: DonationError;
  continueButton: any;
  donateButton: any;

  constructor() {
    this.container = elementByClass('.donations-stepper-container');
    this.steps = elementsByClass('.donations-step', this.container);
    this.donationDetails = new DonationDetails();
    this.tributeInformation = new TributeInformation(this.container);
    this.donorInformation = new DonationDonorInformation();
    this.paymentInformation = new DonationPaymentInformation();
    this.donationError = new DonationError(this.container);
    // this.continueButton = elementByClass('.continue-button', this.container);
    // this.donateButton = elementByClass('.submit-button', this.container);
  }

  /**
   * Jumps to a step on the page
   * @param {number} index - the index of the step to go to
   */
  goToStep(index) {
    this.steps.get(index).click();
  }

  /**
   * Checks is a step is visible
   *
   * @param {number} index
   * @returns true|false
   * @memberof DonationStepper
   */
  isStepDisplayed(index) {
    return this.steps.get(index).isPresent();
  }

  /**
   * Presses the continue button
   */
  clickContinue() {
    this.continueButton = elementByClass('.continue-button', this.container);
    // scrollToElement(this.continueButton);
    return clickElement(this.continueButton);
  }

  /**
   * Presses the continue button
   */
  setFocusContinue() {
    this.continueButton = elementByClass('.continue-button', this.container);
    // scrollToElement(this.continueButton);
    return setFocus(this.continueButton);
  }

  /**
   * Presses the donate button
   */
  clickDonate() {
    this.donateButton = elementByClass('.submit-button', this.container);
    // scrollToElement(this.donateButton);
    return clickElement(this.donateButton, true);
  }

  /**
   * Verifies that the donation amount in the Donate button is correct
   * @param {string} donationAmount - the donation amount
   * @param {string} [donateButtonFrequencyLabel] - the text containing the frequency of a recurring donation
   */
  verifyDonationAmount(donationAmount, donateButtonFrequencyLabel = null) {
    this.donateButton = elementByClass('.submit-button', this.container);
    // waitForElementToBeVisible(this.donateButton);
    let donateButtonLabel = isNil(donateButtonFrequencyLabel) ? donationAmount : (donationAmount + donateButtonFrequencyLabel);
    expect(this.donateButton.getText()).contains(donateButtonLabel);
  }
}

