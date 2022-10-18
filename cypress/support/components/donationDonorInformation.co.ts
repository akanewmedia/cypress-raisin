import { buildSelector, enterMatInput, selectDropDownOption, setMatCheckboxChecked } from "../utils/actions";

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
    this.profileContainer = '.gd-donor-info';
    this.addressContainer = '.donations-address-info';
    this.additionalContainer = '.donations-additional-info';

    this.firstName = buildSelector(this.profileContainer, '#firstName');
    this.lastName = buildSelector(this.profileContainer, '#lastName');
    this.emailAddress = buildSelector(this.profileContainer , '#email');
    this.addressLine1 = buildSelector(this.addressContainer, '#addressLine1');
    this.country = buildSelector(this.addressContainer, '#country');
    this.city = buildSelector(this.addressContainer, '#city');
    this.province = buildSelector(this.addressContainer, '#province');
    this.postalCode = buildSelector(this.addressContainer, '#postalCode');

    this.title = buildSelector(this.profileContainer, '#title');
    this.middleName = buildSelector(this.profileContainer, '#middleName');
    this.companyName = buildSelector(this.profileContainer, '#companyName');
    this.emailType = buildSelector(this.profileContainer, '#emailType');
    this.phoneType = buildSelector(this.profileContainer, '#phoneType');
    this.phone = buildSelector(this.profileContainer, '#phone');
    this.phoneExtension = buildSelector(this.profileContainer, '#phoneExtension');
    this.gender = buildSelector(this.profileContainer, '#gender');
    this.dateOfBirth = buildSelector(this.profileContainer, '#date-of-birth');
    this.dateOfBirthDatePicker = buildSelector(this.profileContainer, '#date-of-birth + mat-datepicker');
    this.corporateDonation = buildSelector(this.profileContainer, '#contact-type mat-checkbox');
    this.addressType = buildSelector(this.addressContainer, '#addressType');
    this.issueTaxReceipt = 'IssueTaxReceipt';
    this.optOut = buildSelector(this.additionalContainer, '#optOut mat-checkbox');
    this.optOutToShare = buildSelector(this.additionalContainer, '#optOutToShare mat-checkbox');
    this.attribute1 = buildSelector(this.additionalContainer, '#attribute1');
    this.attribute2 = buildSelector(this.additionalContainer, '#attribute2');
    this.attribute3 = buildSelector(this.additionalContainer, '#attribute3');
    this.attribute4 = buildSelector(this.additionalContainer, '#attribute4');
    this.attribute5 = buildSelector(this.additionalContainer, '#attribute5');
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

