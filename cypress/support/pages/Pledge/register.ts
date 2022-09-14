import { Profile } from '../../components/profile.co'
import { Address } from '../../components/address.co';
import { AccountInformation } from '../../components/accountInformation.co';
import { TaxReceipts } from '../../components/taxReceipts.co';
import { AdditionalInformation } from '../../components/additionalInformation.co';
import { buildSelector, elementByClass, elementById, elementsByClass, getLocalDateTime, scrollToElement, setMatCheckboxChecked, setUserReferral } from '../../utils/actions';

export class RegisterPage {
  container: any;
  individualUserType: any;
  organizationUserType: any;
  accountInformationCO: any;
  profileInformationCO: Profile;
  addressInformationCO: Address;
  additionalInformation: AdditionalInformation;
  taxReceiptsCO: TaxReceipts;
  referralInformation: any;
  requiredValidationErrors: any;
  constructor() {
    this.container = buildSelector('#userDetails');
    this.organizationUserType = buildSelector(this.container, ".contact-type");
    this.accountInformationCO = new AccountInformation(this.container);
    this.profileInformationCO = new Profile(this.container);
    this.addressInformationCO = new Address(this.container);
    this.additionalInformation = new AdditionalInformation(this.container);
    this.taxReceiptsCO = new TaxReceipts();
    this.referralInformation = buildSelector(this.container, '#refCode');
    this.requiredValidationErrors = buildSelector(this.container, 'small[ng-message="required"]');
  }

  /**
   * Presses the individual user type button at the top of the user profile
   */
  clickIndividualUserType() {
    setMatCheckboxChecked(this.organizationUserType, false);
  }

  /**
   * Presses the organization user type button at the top of the user profile. It will make the
   * organization field mandatory.
   */
  clickOrganizationUserType() {
    setMatCheckboxChecked(this.organizationUserType, true);
  }

  optInToTaxReceipts() {
    this.taxReceiptsCO.optIn();
  }

  optOutOfTaxReceipts() {
    this.taxReceiptsCO.optOut();
  }

  fillInMandatoryInformation(data) {
    this.fillInAccountInformation(data);
    this.fillInProfileAndAddressInformation(data);
  }

  fillInAccountInformation(data) {
    this.accountInformationCO.enterDetails(getLocalDateTime() + data.account.username, data.account.password, data.account.fundraisingGoal);
  }

  fillInExactAccountInformation(data) {
    this.accountInformationCO.enterDetails(data.account.username, data.account.password, data.account.fundraisingGoal);
  }

  fillInProfileInformation(data) {
    this.profileInformationCO.enterFirstName(data.firstName);
    this.profileInformationCO.enterLastName(data.lastName);
    this.profileInformationCO.enterEmail(data.email);
  }

  fillInAddressInformation(data) {
    data.addressType && this.addressInformationCO.selectAddressType(data.addressType);
    this.addressInformationCO.enterAddress(data.address);
    this.addressInformationCO.enterCity(data.city);
    this.addressInformationCO.selectProvince(data.province);
    this.addressInformationCO.enterPostCode(data.postCode);
  }

  fillInProfileAndAddressInformation(data) {
    this.fillInProfileInformation(data);
    this.fillInAddressInformation(data);
  }

  /**
   * Should fill in all the profile fields
   * @param data
   */
  fillInProfileAddressAndAdditionalInformation(data) {
    this.fillInAllProfileInformation(data);
    this.fillInAddressInformation(data);
    this.fillInAdditionalInformation(data);
  }

  /**
   * Fills in all fields in the profile information section. To promote reuse, each data field is checked prior
   * to setting them in the UI, otherwise if any field is not in your data file it would be read as undefined,
   * and you would get an error.
   * @param data
   */
  fillInAllProfileInformation(data) {
    scrollToElement(this.container);
    if (data.title) {
      this.profileInformationCO.selectTitle(data.title);
    }
    if (data.firstName) {
      this.profileInformationCO.enterFirstName(data.firstName);
    }
    if (data.middleName) {
      this.profileInformationCO.enterMiddleName(data.middleName);
    }
    if (data.lastName) {
      this.profileInformationCO.enterLastName(data.lastName);
    }
    if (data.emailType) {
      this.profileInformationCO.selectEmailType(data.emailType);
    }
    if (data.email) {
      this.profileInformationCO.enterEmail(data.email);
    }
    if (data.companyName) {
      this.profileInformationCO.enterOrgName(data.companyName);
    }
    if (data.phoneType) {
      this.profileInformationCO.selectPhoneType(data.phoneType);
    }
    if (data.phoneNumber) {
      this.profileInformationCO.enterPhoneNumber(data.phoneNumber);
    }
    if (data.phoneExtension) {
      this.profileInformationCO.enterPhoneExtension(data.phoneExtension);
    }
    if (data.gender) {
      this.profileInformationCO.selectGender(data.gender);
    }
    if (data.yearOfBirth && data.monthOfBirth && data.dayOfBirth) {
      this.profileInformationCO.selectDateOfBirth(data.dayOfBirth, data.monthOfBirth, data.yearOfBirth);
    }

  }

  /**
   * Fills in all fields in the address information section. To promote reuse, each data field is checked prior
   * to setting them in the UI, otherwise if any field is not in your data file it would be read as undefined,
   * and you would get an error.
   * @param data
   */
  fillInAllAddressInformation(data) {
    if (data.addressType) {
      this.addressInformationCO.selectAddressType(data.addressType);
    }
    if (data.country) {
      this.addressInformationCO.selectCountry(data.country);
    }
    if (data.address) {
      this.addressInformationCO.enterAddress(data.address);
    }
    if (data.city) {
      this.addressInformationCO.enterCity(data.city);
    }
    if (data.province) {
      this.addressInformationCO.selectProvince(data.province);
    }
    if (data.postCode) {
      this.addressInformationCO.enterPostCode(data.postCode);
    }
  }

  /**
   * Fills in the additional information section. It contains the opt out options and custom fields.
   * @param data
   */
  fillInAdditionalInformation(data) {
    if (data.hideMeFromSearch) {
      this.additionalInformation.setHideMeFromSearch(data.hideMeFromSearch);
    }
    if (data.allowAkaCommunication) {
      this.additionalInformation.setAkaCommunicationCheckboxChecked(data.allowAkaCommunication);
    }
    if (data.allowScreenedCompanies) {
      this.additionalInformation.setScreenedCompaniesCheckboxChecked(data.allowScreenedCompanies);
    }
    this.additionalInformation.setAttributes(data);
  }

  verifyMandatoryFieldsHaveValues() {
    expect(this.accountInformationCO.username.getText()).not.eq("");
    expect(this.accountInformationCO.password.getText()).not.eq("");
    expect(this.accountInformationCO.fundraisingGoal.getText()).not.eq("");
    this.verifyProfileAndAddressInformationHaveValues();
  }

  verifyProfileAndAddressInformationHaveValues() {
    expect(this.profileInformationCO.firstName.getText()).not.eq("");
    expect(this.profileInformationCO.lastName.getText()).not.eq("");
    expect(this.profileInformationCO.orgName.getText()).not.eq("");
    expect(this.addressInformationCO.address.getText()).not.eq("");
    expect(this.addressInformationCO.city.getText()).not.eq("");
    expect(this.addressInformationCO.postCode.getText()).not.eq("");
  }

  verifyRequiredFieldErrors(requiredFieldsValidationMessages) {
    expect(this.requiredValidationErrors.getText()).eq(requiredFieldsValidationMessages);
  }

  verifyCustomFieldsHaveValues(customFieldsData) {
    if (customFieldsData.customField1) {
      expect(this.additionalInformation.attribute1.getAttribute('value')).eq(customFieldsData.customField1);
    }
    if (customFieldsData.customField2) {
      expect(this.additionalInformation.attribute2.getAttribute('value')).eq(customFieldsData.customField2);
    }
    if (customFieldsData.customField3) {
      expect(this.additionalInformation.attribute3.getAttribute('value')).eq(customFieldsData.customField3);
    }
    if (customFieldsData.customField4) {
      expect(this.additionalInformation.attribute4.getAttribute('value')).eq(customFieldsData.customField4);
    }
    if (customFieldsData.customField5) {
      expect(this.additionalInformation.attribute5.getAttribute('value')).eq(customFieldsData.customField5);
    }
  }

  fillInReferredUser(data) {
    setUserReferral(this.referralInformation, data.referredUser);
  }
}

