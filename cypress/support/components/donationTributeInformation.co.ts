import { enterMatInput, clickElement, pressEsc, selectDropDownOption, elementByClass, scrollToElement, buildSelector } from '../utils/actions';
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
    this.tributeContainer = buildSelector('.gd-tribute-details');
    this.cardPreview = new DonationCardPreviewComponent();
    this.loadMinimumFields();
  }

  loadMinimumFields() {
    this.firstName = buildSelector(this.tributeContainer , '#tributeeFirstName');
    this.lastName = buildSelector(this.tributeContainer, '#tributeeLastName');
    this.cardTypeGroup = buildSelector(this.tributeContainer,'.toggle-group.card-type');
    this.selectedDonationFrequency = buildSelector(this.cardTypeGroup, '.card-type-button.mat-button-toggle-checked');
    this.continueButton = buildSelector(this.container, '.continue-button');
  }

  loadECardMinimumFields() {
    this.recipientContainer = buildSelector(this.tributeContainer, '.recipient-container');
    this.cardContentContainer = buildSelector(this.tributeContainer , '.card-content-container');
    this.recipientFirstName = buildSelector(this.recipientContainer, '#recipientFirstName');
    this.recipientLastName = buildSelector(this.recipientContainer, '#recipientLastName');
    this.recipientEmail = buildSelector(this.recipientContainer,'#recipientEmail');
    this.imageSelectionContainer = buildSelector(this.cardContentContainer, '.image-selection-wrapper');
    this.message = buildSelector(this.cardContentContainer, '#message');
    this.previewButton = buildSelector(this.container, '.action-button');
  }

  loadECardFields() {
    this.loadECardMinimumFields();
    this.deliveryDate = buildSelector(this.cardContentContainer, '#deliveryDate');
  }

  loadPrintedCardMinimumFields() {
    this.recipientContainer = buildSelector(this.tributeContainer , '.recipient-container');
    this.cardContentContainer = buildSelector(this.tributeContainer, '.card-content-container');
    this.recipientFirstName = buildSelector(this.recipientContainer, '#recipientFirstName');
    this.recipientLastName = buildSelector(this.recipientContainer, '#recipientLastName');
    this.recipientCountry = buildSelector(this.recipientContainer, '#recipientCountry');
    this.recipientAddressLine1 = buildSelector(this.recipientContainer, '#recipientAddressLine1');
    this.recipientCity = buildSelector(this.recipientContainer, '#recipientCity');
    this.recipientRegion = buildSelector(this.recipientContainer, '#recipientRegion');
    this.recipientPostalCode = buildSelector(this.recipientContainer, '#recipientPostalCode');
    this.imageSelectionContainer = buildSelector(this.cardContentContainer, '.image-selection-wrapper');
    this.message = buildSelector(this.cardContentContainer, '#message');
    this.previewButton = buildSelector(this.container, '.action-button');
  }

  /**
   * Populates the minimum form with the fields that are present in the dataset
   *
   * @param {*} tributeInfo
   * @memberof TributeInformation
   */
  populateMinimumFields(tributeInfo) {
    cy.get(this.firstName).clear().type(tributeInfo.firstName);
    cy.get(this.lastName).clear().type(tributeInfo.lastName);
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

    cy.get(this.recipientFirstName).clear().type(tributeInfo.recipient.firstName);
    cy.get(this.recipientLastName).clear().type(tributeInfo.recipient.lastName);
    cy.get(this.recipientEmail).clear().type(tributeInfo.recipient.email);
    this.selectCardTemplate(tributeInfo.templateImage);
    //cy.get(this.message).type(tributeInfo.message);
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
    this.selectDeliveryDate()
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

  selectDeliveryDate() {
    scrollToElement(this.tributeContainer + " .input-wrap--date button")
    cy.get(this.tributeContainer + " .input-wrap--date button").click().get('.mat-calendar-body-today').click({force: true})
    pressEsc()
  }

  /**
   * Populates the minimum form with the minimum fields required for Printed Cards
   *
   * @param {*} tributeInfo
   * @memberof TributeInformation
   */
  populatePrintedCardMinimumFields(tributeInfo) {
    this.loadPrintedCardMinimumFields();
    //this.populateMinimumFields(tributeInfo);

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
    cy.get(this.cardTypeGroup).contains('.card-type-button', value).click();
  }

  /**
   * Selects an eCard Template from its image alternate text content
   * @param {string} value - the alt attribute value of the image to select
   * @memberof TributeInformation
   */
  selectCardTemplate(value) {
    // console.log('selectCardTemplate', value);
   cy.get(this.imageSelectionContainer + ` .gd-card-${value}`).click()    
  }

  /**
   * Checks if the message is present in the card preview
   *
   * @param {string} message - the card message
   * @memberof TributeInformation
   */
  checkCardPreviewContent(message) {
    cy.get(this.previewButton).click()
    this.cardPreview.getMessage()
      .should('have.text', message)
      .then(_ => pressEsc())
  }
}
