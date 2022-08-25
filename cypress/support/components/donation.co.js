//The information regarding the libraries
import { clickElement, enterText, setCheckboxChecked, waitForElement, waitForElementToBeClickable } from "../utils/actions";


export class Donation { 

  constructor() {
    this.container = cy.get('.base-page');

    this.honourRollContainer = cy.get('rx-honor-roll');
    this.donationContainer = cy.get('rx-sponsor');
    this.privateMessageContainer = cy.get('rx-private-message');
    this.searchContainer = cy.get(container).get('.search-page');

    this.donation = this.donationContainer.get('customAmount');
    this.honourRollOptionsContainer = this.honourRollContainer.get('.honour-roll-options');
    this.honourRollCustomOptions = this.honourRollContainer.get('.custom-show-amount-option');
    this.honourRollCustomText = this.honourRollContainer.get(by.css('.custom-honourRoll-text'));
    this.privateMessage = this.privateMessageContainer.get('textarea[formcontrolname=message]');

    this.invalidDonationAmountValidationMsg = this.donationContainer.get('rx-errors .error-message');

    this.eventDonationContinueBtn = this.container.get('.btn-continue');
    this.coverAdminFeeChk = this.container.get('coverAdminFeeForIndividualAndTeam');
    this.donationAmountText = this.container.get('.globalized-number .globalized-number-input input');
  }

  setAmount(amount) {
    waitForElement(this.donation);
    enterText(this.donation, amount);
  }

  selectHonorRollOption(option) {
    this.honourRollOptionsContainer.get('.mat-radio-button .mat-radio-label-content').click();

  }

  selectHonorRollOptionByIndex(index) {
    this.honourRollOptionsContainer.get('.mat-radio-button').get(index).click()
  }

  selectSponsorshipLevel(text) {
    this.donationContainer.get('.mat-radio-button .mat-radio-label-content').click();
  }

  selectShowAmount(showAmount) {
    if (showAmount) {
      this.honourRollCustomOptions.get('.custom-show-amount-option-yes').click();
    } else {
      this.honourRollCustomOptions.get('.custom-show-amount-option-no').click();
    }
  }

  enterCustomHonorRollText(text) {
    
    this.honourRollCustomText.type(text)
  }

  enterHonourRollText(text) {
    this.honourRollCustomText.type(text)
  }

  enterPrivateMessage(message) {
    this.privateMessage.type(message)
  }

  setEventDonationAmount(amount) {
    waitForElementToBeClickable(this.donationAmountText);
    this.donationAmountText.type(amount)    
  }

  pressEventDonationContinueBtn() {
    this.eventDonationContinueBtn.click();
  }

  setCoverAdminFee(value) {
    setCheckboxChecked(this.coverAdminFeeChk, value);
  }
}