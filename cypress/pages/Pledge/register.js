import { Profile } from '../../components/profile.co'
import { Address } from '../../components/address.co';
import { AccountInformation } from '../../components/accountInformation.co';
import { TaxReceipts } from '../../components/taxReceipts.co';
import { AdditionalInformation } from '../../components/additionalInformation.co';
import { getLocalDateTime, scrollToElement, setMatCheckboxChecked, setUserReferral } from '../../utils/actions';

export class RegisterPage {
 
  constructor() {
    this.container = cy.get('#userDetails');
    this.organizationUserType = this.container.get(".contact-type");
    this.accountInformationCO = new AccountInformation(this.container);
    this.profileInformationCO = new Profile(this.container);
    this.addressInformationCO = new Address(this.container);
    this.additionalInformation = new AdditionalInformation(this.container);
    this.taxReceiptsCO = new TaxReceipts();
    this.referralInformation = this.container.get('#refCode');
    this.requiredValidationErrors = this.container.get('small[ng-message="required"]');
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
    browser.sleep(1000);
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
    expect(this.accountInformationCO.username.getText()).not.toEqual("");
    expect(this.accountInformationCO.password.getText()).not.toEqual("");
    expect(this.accountInformationCO.fundraisingGoal.getText()).not.toEqual("");
    this.verifyProfileAndAddressInformationHaveValues();
  }

  verifyProfileAndAddressInformationHaveValues() {
    expect(this.profileInformationCO.firstName.getText()).not.toEqual("");
    expect(this.profileInformationCO.lastName.getText()).not.toEqual("");
    expect(this.profileInformationCO.orgName.getText()).not.toEqual("");
    expect(this.addressInformationCO.address.getText()).not.toEqual("");
    expect(this.addressInformationCO.city.getText()).not.toEqual("");
    expect(this.addressInformationCO.postCode.getText()).not.toEqual("");
  }

  verifyRequiredFieldErrors(requiredFieldsValidationMessages) {
    expect(this.requiredValidationErrors.getText()).toEqual(requiredFieldsValidationMessages);
  }

  verifyCustomFieldsHaveValues(customFieldsData) {
    if (customFieldsData.customField1) {
      expect(this.additionalInformation.attribute1.getAttribute('value')).toEqual(customFieldsData.customField1);
    }
    if (customFieldsData.customField2) {
      expect(this.additionalInformation.attribute2.getAttribute('value')).toEqual(customFieldsData.customField2);
    }
    if (customFieldsData.customField3) {
      expect(this.additionalInformation.attribute3.getAttribute('value')).toEqual(customFieldsData.customField3);
    }
    if (customFieldsData.customField4) {
      expect(this.additionalInformation.attribute4.getAttribute('value')).toEqual(customFieldsData.customField4);
    }
    if (customFieldsData.customField5) {
      expect(this.additionalInformation.attribute5.getAttribute('value')).toEqual(customFieldsData.customField5);
    }
  }

  fillInReferredUser(data) {
    setUserReferral(this.referralInformation, data.referredUser);
  }
}
