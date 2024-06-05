import { buildSelector, elementById, pressEsc, setCheckboxChecked, setCustomAttribute } from "../utils/actions";
export class AdditionalInformation {
  akaCommunicationCheckbox: any;
  akaCommunicationText: any;
  screenedCompaniesCheckbox: any;
  screenedCompaniesText: any;
  hideMeFromSearchCheckbox: any;
  explicitConsentCheckbox: any;
  attribute1: any;
  attribute2: any;
  attribute3: any;
  attribute4: any;
  attribute5: any;

  constructor(private additionalInformationContainer: any) {
    this.akaCommunicationCheckbox = buildSelector(this.additionalInformationContainer, '#optOut');
    this.akaCommunicationText = buildSelector(this.additionalInformationContainer, '#optOut-title');
    this.screenedCompaniesCheckbox = buildSelector(this.additionalInformationContainer, '#optOutToShare');
    this.screenedCompaniesText = buildSelector(this.additionalInformationContainer, '#optOutToShare-title');
    this.hideMeFromSearchCheckbox = buildSelector(this.additionalInformationContainer, '#privacy');
    this.explicitConsentCheckbox = buildSelector(this.additionalInformationContainer, '#personalDataUseExplicitConsent')
    this.attribute1 = buildSelector(this.additionalInformationContainer, '#attribute1');
    this.attribute2 = buildSelector(this.additionalInformationContainer, '#attribute2');
    this.attribute3 = buildSelector(this.additionalInformationContainer, '#attribute3');
    this.attribute4 = buildSelector(this.additionalInformationContainer, '#attribute4');
    this.attribute5 = buildSelector(this.additionalInformationContainer, '#attribute5');
  }

  setHideMeFromSearch(checked) {
    setCheckboxChecked(this.hideMeFromSearchCheckbox, checked);
  }

  setAkaCommunicationCheckboxChecked(checked) {
    setCheckboxChecked(this.akaCommunicationCheckbox, checked);
  }

  setScreenedCompaniesCheckboxChecked(checked) {
    setCheckboxChecked(this.screenedCompaniesCheckbox, checked);
  }

  setExplicitConsentCheckboxChecked(checked) {
    setCheckboxChecked(this.explicitConsentCheckbox, checked);
  }

  /**
   * Sets all the custom attributes
   * @param data
   */
  setAttributes(data) {
    setCustomAttribute(this.attribute1, data.attribute1);
    setCustomAttribute(this.attribute2, data.attribute2);
    setCustomAttribute(this.attribute3, data.attribute3);
    setCustomAttribute(this.attribute4, data.attribute4);
    setCustomAttribute(this.attribute5, data.attribute5);
  }

  verifyCommaDropdown(){
    cy.get("#attribute1").click()
    cy.get('#attribute1-panel').should('contain','This, is, a test').click()
    pressEsc()
  }
}