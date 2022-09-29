import { isNil } from "lodash";
import { buildSelector, clickElement, elementByClass, elementById, enterText, setCheckboxChecked } from "../utils/actions";

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
    this.container = buildSelector('.base-page');

    this.honourRollContainer = buildSelector('rx-honor-roll');
    this.donationContainer = buildSelector('rx-sponsor');
    this.privateMessageContainer = buildSelector('rx-private-message');
    this.searchContainer = buildSelector(this.container, '.search-page');

    this.donation = buildSelector(this.donationContainer, '#customAmount');
    this.honourRollOptionsContainer = buildSelector(this.honourRollContainer, '.honour-roll-options');
    this.honourRollCustomOptions = buildSelector(this.honourRollContainer, '.custom-show-amount-option');
    this.honourRollCustomText = buildSelector(this.honourRollContainer, '.custom-honourRoll-text');
    this.privateMessage = buildSelector(this.privateMessageContainer, 'textarea[formcontrolname=message]');

    this.invalidDonationAmountValidationMsg = buildSelector(this.donationContainer, 'rx-errors .error-message');

    this.eventDonationContinueBtn = buildSelector(this.container, '.btn-continue');
    this.coverAdminFeeChk = buildSelector(this.container, '#coverAdminFeeForIndividualAndTeam');
    this.donationAmountText = buildSelector(this.container, '.globalized-number .globalized-number-input input');
  }

  setAmount(amount) {
    //waitForElement(this.donation);
    enterText(this.donation, amount);
  }

  selectHonorRollOption(option) {
    cy.get(this.honourRollOptionsContainer).get('.mat-radio-button .mat-radio-label-content').contains(option).click();
  }

  selectFirstHonorRollOption(index) {
    cy.get(this.honourRollOptionsContainer).get('.mat-radio-button').first().click()
  }

  selectLastHonorRollOption(index) {
    cy.get(this.honourRollOptionsContainer).get('.mat-radio-button').last().click()
  }

  selectSponsorshipLevel(text) {
    cy.contains('.mat-radio-button .mat-radio-label-content', text).click()
    //cy.get(this.donationContainer).get('.mat-radio-button .mat-radio-label-content').click();
  }

  selectHonorRollOptionByIndex(index) {
    cy.get(this.honourRollOptionsContainer + ' .mat-radio-button').eq(index).click()
  }

  selectShowAmount(showAmount) {
    if (showAmount) {
      clickElement(this.honourRollCustomOptions.$('.custom-show-amount-option-yes'));
    } else {
      clickElement(this.honourRollCustomOptions.$('.custom-show-amount-option-no'));
    }
  }

  enterCustomHonorRollText(text) {
    enterText(this.honourRollCustomText, text);
  }

  enterHonourRollText(text) {
    enterText(this.honourRollCustomText, text);
  }

  enterPrivateMessage(message) {
    enterText(this.privateMessage, message);
  }

  setEventDonationAmount(amount) {
    //waitForElementToBeClickable(this.donationAmountText);
    enterText(this.donationAmountText, amount);
  }

  pressEventDonationContinueBtn() {
    cy.get(this.eventDonationContinueBtn).click();
  }

  setCoverAdminFee(value) {
    setCheckboxChecked(this.coverAdminFeeChk, value);
  }
}