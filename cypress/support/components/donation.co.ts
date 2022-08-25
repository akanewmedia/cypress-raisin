import { clickElement, elementByClass, elementById, enterText, setCheckboxChecked } 
from "../utils/actions";


export class Donation {
  container: any; 
  honourRollContainer: any;
  donationContainer: any;
  privateMessageContainer: any;
  searchContainer: any;
  donation: any;
  honourRollOptionsContainer: any;
  honourRollCustomOptions: any;
  honourRollCustomText: any;
  privateMessage: any;
  invalidDonationAmountValidationMsg: any;
  eventDonationContinueBtn: any;
  coverAdminFeeChk: any;
  donationAmountText: any;

  constructor() {
    this.container = elementByClass('.base-page');

    this.honourRollContainer = elementById('rx-honor-roll');
    this.donationContainer = elementById('rx-sponsor');
    this.privateMessageContainer = elementById('rx-private-message');
    this.searchContainer = elementByClass(this.container, '.search-page');

    this.donation = elementById(this.donationContainer, 'customAmount');
    this.honourRollOptionsContainer = elementByClass(this.honourRollContainer, '.honour-roll-options');
    this.honourRollCustomOptions = elementByClass(this.honourRollContainer, '.custom-show-amount-option');
    this.honourRollCustomText = elementByClass(this.honourRollContainer, '.custom-honourRoll-text');
    this.privateMessage = elementById(this.privateMessageContainer, 'textarea[formcontrolname=message]');

    this.invalidDonationAmountValidationMsg = elementByClass(this.donationContainer, 'rx-errors .error-message');

    this.eventDonationContinueBtn = elementByClass(this.container, '.btn-continue');
    this.coverAdminFeeChk = elementByClass(this.container, 'coverAdminFeeForIndividualAndTeam');
    this.donationAmountText = elementByClass(this.container, '.globalized-number .globalized-number-input input');
  }

  setAmount(amount) {
    // waitForElement(this.donation);
    enterText(this.donation, amount);
  }

  selectHonorRollOption(option) {
    elementClick(this.honourRollOptionsContainer, '.mat-radio-button .mat-radio-label-content').click();

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
    elementthis.eventDonationContinueBtn.click();
  }

  setCoverAdminFee(value) {
    setCheckboxChecked(this.coverAdminFeeChk, value);
  }
}