import { enterMatInput, clickElement, pressEsc, selectDropDownOption, elementByClass, scrollToElement } from '../utils/actions';
import { DonationCardPreviewComponent } from './donationCardPreview.co';

/**
 * Represents the "Enter Your Information" step
 */
export class TributeInformation {
  tributeContainer: any;
  cardPreview: DonationCardPreviewComponent;
  firstName: any;
  lastName: any;
  cardTypeGroup: any;
  selectedDonationFrequency: any;
  continueButton: any;
  recipientContainer: any;
  cardContentContainer: any;
  recipientFirstName: any;
  recipientLastName: any;
  recipientEmail: any;
  imageSelectionContainer: any;
  message: any;
  previewButton: any;
  deliveryDate: any;
  recipientCountry: any;
  recipientAddressLine1: any;
  recipientCity: any;
  recipientRegion: any;
  recipientPostalCode: any;
  constructor(public container: any) {
    this.tributeContainer = elementByClass('.gd-tribute-details');
    this.cardPreview = new DonationCardPreviewComponent();
    this.loadMinimumFields();
  }

  loadMinimumFields() {
    this.firstName = this.tributeContainer.$('#tributeeFirstName');
    this.lastName = this.tributeContainer.$('#tributeeLastName');
    this.cardTypeGroup = this.tributeContainer.$('.toggle-group.card-type');
    this.selectedDonationFrequency = this.cardTypeGroup.$('.card-type-button.mat-button-toggle-checked');
    this.continueButton = this.container.$('.continue-button');
  }

  loadECardMinimumFields() {
    this.recipientContainer = this.tributeContainer.$('.recipient-container');
    this.cardContentContainer = this.tributeContainer.$('.card-content-container');
    this.recipientFirstName = this.recipientContainer.$('#recipientFirstName');
    this.recipientLastName = this.recipientContainer.$('#recipientLastName');
    this.recipientEmail = this.recipientContainer.$('#recipientEmail');
    this.imageSelectionContainer = this.cardContentContainer.$('.image-selection-wrapper');
    this.message = this.cardContentContainer.$('#message');
    this.previewButton = this.container.$('.action-button');
  }

  loadECardFields() {
    this.loadECardMinimumFields();
    this.deliveryDate = this.cardContentContainer.$('#deliveryDate');
  }

  loadPrintedCardMinimumFields() {
    this.recipientContainer = this.tributeContainer.$('.recipient-container');
    this.cardContentContainer = this.tributeContainer.$('.card-content-container');
    this.recipientFirstName = this.recipientContainer.$('#recipientFirstName');
    this.recipientLastName = this.recipientContainer.$('#recipientLastName');
    this.recipientCountry = this.recipientContainer.$('#recipientCountry');
    this.recipientAddressLine1 = this.recipientContainer.$('#recipientAddressLine1');
    this.recipientCity = this.recipientContainer.$('#recipientCity');
    this.recipientRegion = this.recipientContainer.$('#recipientRegion');
    this.recipientPostalCode = this.recipientContainer.$('#recipientPostalCode');
    this.imageSelectionContainer = this.cardContentContainer.$('.image-selection-wrapper');
    this.message = this.cardContentContainer.$('#message');
    this.previewButton = this.container.$('.action-button');
  }

  /**
   * Populates the minimum form with the fields that are present in the dataset
   *
   * @param {*} tributeInfo
   * @memberof TributeInformation
   */
  populateMinimumFields(tributeInfo) {
    enterMatInput(this.firstName, tributeInfo.firstName);
    enterMatInput(this.lastName, tributeInfo.lastName);
  }

  /**
   * Populates the minimum form with the minimum fields required for eCards
   *
   * @param {*} tributeInfo
   * @memberof TributeInformation
   */
  populateECardMinimumFields(tributeInfo) {
    this.loadECardMinimumFields();
    this.populateMinimumFields(tributeInfo);

    enterMatInput(this.recipientFirstName, tributeInfo.recipient.firstName);
    enterMatInput(this.recipientLastName, tributeInfo.recipient.lastName);
    enterMatInput(this.recipientEmail, tributeInfo.recipient.email);
    this.selectCardTemplate(tributeInfo.templateImage);
    enterMatInput(this.message, tributeInfo.message);
  }

  /**
   * Populates the form with all the fields for eCards
   *
   * @param {*} tributeInfo
   * @memberof TributeInformation
   */
  populateAllECardFields(tributeInfo) {
    this.loadECardFields();
    this.populateECardMinimumFields(tributeInfo);
    this.populateDeliveryDate(tributeInfo.deliveryDate);
  }
  populateDeliveryDate(deliveryDate: any) {
    let dd = new Date(deliveryDate);
    const now = new Date();
    if (dd.getTime() < now.getTime()) {
      dd = now;
      dd.setDate(now.getDate() + 1);
    }
    enterMatInput(this.deliveryDate, dd.toLocaleDateString('en-us'));
  }

  /**
   * Populates the minimum form with the minimum fields required for Printed Cards
   *
   * @param {*} tributeInfo
   * @memberof TributeInformation
   */
  populatePrintedCardMinimumFields(tributeInfo) {
    this.loadPrintedCardMinimumFields();
    this.populateMinimumFields(tributeInfo);

    enterMatInput(this.recipientFirstName, tributeInfo.recipient.firstName);
    enterMatInput(this.recipientLastName, tributeInfo.recipient.lastName);
    selectDropDownOption(this.recipientCountry, tributeInfo.recipient.address.country);
    enterMatInput(this.recipientAddressLine1, tributeInfo.recipient.address.line1);
    enterMatInput(this.recipientCity, tributeInfo.recipient.address.city);
    selectDropDownOption(this.recipientRegion, tributeInfo.recipient.address.region);
    enterMatInput(this.recipientPostalCode, tributeInfo.recipient.address.postalCode);
    this.selectCardTemplate(tributeInfo.templateImage);
    enterMatInput(this.message, tributeInfo.message);
  }

  /**
   * Function which specifially clicks a card type button given the value to select
   * @param value - the value to select
   * @memberof TributeInformation
   */
  selectCardType(value) {
    scrollToElement(this.cardTypeGroup);
    const button = this.cardTypeGroup.get('.card-type-button').contains(value);
    clickElement(button);
  }

  /**
   * Selects an eCard Template from its image alternate text content
   * @param {string} value - the alt attribute value of the image to select
   * @memberof TributeInformation
   */
  selectCardTemplate(value) {
    // console.log('selectCardTemplate', value);
    const img = elementByClass(this.imageSelectionContainer, `.gd-card-${value}`);
    clickElement(img);
  }

  /**
   * Checks if the message is present in the card preview
   *
   * @param {string} message - the card message
   * @memberof TributeInformation
   */
  checkCardPreviewContent(message) {
    clickElement(this.previewButton);
    this.cardPreview.getMessage()
      .then(text => {
        // console.log('checkCardPreviewContent text', text, 'message', message);
        expect(text).contains(message);
      })
      .then(_ => pressEsc())
      .catch(error => console.log('checkCardPreviewContent error', error));

  }
}
