import { elementByClass, elementById, enterMatInput, selectDropDownOption, setMatCheckboxChecked } from "../utils/actions";

/**
 * Represents the "Enter Your Information" step
 */
export class DonationDonorInformation {
  profileContainer: any;
  addressContainer: any;
  additionalContainer: any;
  title: any;
  middleName: any;
  companyName: any;
  emailType: any;
  phoneType: any;
  phone: any;
  phoneExtension: any;
  gender: any;
  dateOfBirth: any;
  dateOfBirthDatePicker: any;
  corporateDonation: any;
  addressType: any;
  issueTaxReceipt: any;
  optOut: any;
  optOutToShare: any;
  attribute1: any;
  attribute2: any;
  attribute3: any;
  attribute4: any;
  attribute5: any;
  firstName: any;
  lastName: any;
  emailAddress: any;
  addressLine1: any;
  country: any;
  city: any;
  province: any;
  postalCode: any;

  constructor() {
    this.profileContainer = elementByClass('.gd-donor-info');
    this.addressContainer = elementByClass('.donations-address-info');
    this.additionalContainer = elementByClass('.donations-additional-info');

    this.firstName = elementById('firstName', this.profileContainer);
    this.lastName = elementById('lastName', this.profileContainer);
    this.emailAddress = elementById('email', this.profileContainer);
    this.addressLine1 = elementById('addressLine1', this.addressContainer);
    this.country = elementById('country', this.addressContainer);
    this.city = elementById('city', this.addressContainer);
    this.province = elementById('province', this.addressContainer);
    this.postalCode = elementById('postalCode', this.addressContainer);

    this.title = elementById('title', this.profileContainer);
    this.middleName = elementById('middleName', this.profileContainer);
    this.companyName = elementById('companyName', this.profileContainer);
    this.emailType = elementById('emailType', this.profileContainer);
    this.phoneType = elementById('phoneType', this.profileContainer);
    this.phone = elementById('phone', this.profileContainer);
    this.phoneExtension = elementById('phoneExtension', this.profileContainer);
    this.gender = elementById('gender', this.profileContainer);
    this.dateOfBirth = elementById('date-of-birth', this.profileContainer);
    this.dateOfBirthDatePicker = elementById(this.profileContainer, '#date-of-birth + mat-datepicker');
    this.corporateDonation = elementById(this.profileContainer, '#contact-type mat-checkbox');
    this.addressType = elementById('addressType', this.addressContainer);
    this.issueTaxReceipt = elementById('IssueTaxReceipt');
    this.optOut = elementById(this.additionalContainer, '#optOut mat-checkbox');
    this.optOutToShare = elementById(this.additionalContainer, '#optOutToShare mat-checkbox');
    this.attribute1 = elementById('attribute1', this.additionalContainer);
    this.attribute2 = elementById('attribute2', this.additionalContainer);
    this.attribute3 = elementById('attribute3', this.additionalContainer);
    this.attribute4 = elementById('attribute4', this.additionalContainer);
    this.attribute5 = elementById('attribute5', this.additionalContainer);
  }

  /**
   * Populates the minimum form with the fields that are present in the dataset
   *
   * @param {*} data
   * @memberof DonationDonorInformation
   */
  populateMinimumFields(data) {

    enterMatInput(this.firstName, data.firstName);
    enterMatInput(this.lastName, data.lastName);
    enterMatInput(this.emailAddress, data.email);
    enterMatInput(this.addressLine1, data.address);
    selectDropDownOption(this.province, data.province);
    enterMatInput(this.city, data.city);
    enterMatInput(this.postalCode, data.postCode);
  }

  /**
   * Populates the entire form with the fields that are present in the dataset
   * @param {*} data - the form data
   */
  populateAllFields(data) {

    selectDropDownOption(this.title, data.title);
    enterMatInput(this.firstName, data.firstName);
    enterMatInput(this.middleName, data.middleName);
    enterMatInput(this.lastName, data.lastName);
    selectDropDownOption(this.emailType, data.emailType);
    enterMatInput(this.emailAddress, data.email);
    selectDropDownOption(this.phoneType, data.phoneType);
    enterMatInput(this.phone, data.phoneNumber);
    enterMatInput(this.phoneExtension, data.phoneExtension);
    selectDropDownOption(this.gender, data.gender);
    enterMatInput(this.dateOfBirth, data.dateOfBirth);
    setMatCheckboxChecked(this.corporateDonation, data.corporateDonation);
    enterMatInput(this.companyName, data.companyName);
    selectDropDownOption(this.addressType, data.addressType);
    enterMatInput(this.addressLine1, data.address);
    selectDropDownOption(this.province, data.province);
    enterMatInput(this.city, data.city);
    enterMatInput(this.postalCode, data.postCode);
    setMatCheckboxChecked(this.optOut, data.optOut);
    setMatCheckboxChecked(this.optOutToShare, data.optOutToShare);
    enterMatInput(this.attribute1, data.attribute1);
    enterMatInput(this.attribute2, data.attribute2);
    enterMatInput(this.attribute3, data.attribute3);
    enterMatInput(this.attribute4, data.attribute4);
    enterMatInput(this.attribute5, data.attribute5);
  }

  getTouchUIValue() {
    return this.dateOfBirthDatePicker.getAttribute('ng-reflect-touch-ui');
  }
}

