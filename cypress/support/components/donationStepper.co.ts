
import { buildSelector, clickElement, elementByClass, setFocus } from "../utils/actions";
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
    this.container = buildSelector('.donations-stepper-container');
    this.steps = buildSelector(this.container, '.donations-step');
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
    return cy.get(this.steps).eq(index).should('exist');
  }

  /**
   * Presses the continue button
   */
  clickContinue() {
    this.continueButton = buildSelector(this.container, '.continue-button' );
    // scrollToElement(this.continueButton);
    cy.get(this.continueButton).click();
  }

  /**
   * Presses the continue button
   */
  setFocusContinue() {
    this.continueButton = (this.container+ ' .continue-button');
    // scrollToElement(this.continueButton);
    return setFocus(this.continueButton);
  }

  /**
   * Presses the donate button
   */
  clickDonate() {
    cy.get(this.container + ' .submit-button').click();
    // scrollToElement(this.donateButton);
  }

  /**
   * Verifies that the donation amount in the Donate button is correct
   * @param {string} donationAmount - the donation amount
   * @param {string} [donateButtonFrequencyLabel] - the text containing the frequency of a recurring donation
   */
  verifyDonationAmount(donationAmount, donateButtonFrequencyLabel = null) {
    this.donateButton = buildSelector(this.container, '.submit-button');
    // waitForElementToBeVisible(this.donateButton);
    let donateButtonLabel = isNil(donateButtonFrequencyLabel) ? donationAmount : (donationAmount + donateButtonFrequencyLabel);
    cy.get(this.donateButton).should('contain.text', donateButtonLabel)
    //expect(this.donateButton.getText()).contains(donateButtonLabel);
  }
}

