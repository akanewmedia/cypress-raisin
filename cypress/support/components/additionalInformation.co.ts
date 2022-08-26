import { elementById, setCheckboxChecked, setCustomAttribute } from "../utils/actions";
export class AdditionalInformation {
  akaCommunicationCheckbox: any;
  akaCommunicationText: any;
  screenedCompaniesCheckbox: any;
  screenedCompaniesText: any;
  hideMeFromSearchCheckbox: any;
  attribute1: any;
  attribute2: any;
  attribute3: any;
  attribute4: any;
  attribute5: any;

  constructor(private additionalInformationContainer: any) {
    this.akaCommunicationCheckbox = elementById(this.additionalInformationContainer, '#optOut');
    this.akaCommunicationText = elementById(this.additionalInformationContainer, '#optOut-title');
    this.screenedCompaniesCheckbox = elementById(this.additionalInformationContainer, '#optOutToShare');
    this.screenedCompaniesText = elementById(this.additionalInformationContainer, '#optOutToShare-title');
    this.hideMeFromSearchCheckbox = elementById(this.additionalInformationContainer, '#privacy');
    this.attribute1 = elementById(this.additionalInformationContainer, '#attribute1');
    this.attribute2 = elementById(this.additionalInformationContainer, '#attribute2');
    this.attribute3 = elementById(this.additionalInformationContainer, '#attribute3');
    this.attribute4 = elementById(this.additionalInformationContainer, '#attribute4');
    this.attribute5 = elementById(this.additionalInformationContainer, '#attribute5');
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
}