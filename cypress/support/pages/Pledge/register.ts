import { Profile } from '../../components/profile.co'
import { Address } from '../../components/address.co';
import { AccountInformation } from '../../components/accountInformation.co';
import { TaxReceipts } from '../../components/taxReceipts.co';
import { AdditionalInformation } from '../../components/additionalInformation.co';
import { buildSelector, getLocalDateTime, selectDropDownOption, setUserReferral } from '../../utils/actions';

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
  tributeDropDown:any
  tributeFirstName:any
  tributeLastName:any


  constructor() {
    this.container = buildSelector('.userDetails');
    this.organizationUserType = buildSelector(this.container, ".mat-mdc-checkbox label");
    this.accountInformationCO = new AccountInformation(this.container);
    this.profileInformationCO = new Profile(this.container);
    this.addressInformationCO = new Address(this.container);
    this.additionalInformation = new AdditionalInformation(this.container);
    this.taxReceiptsCO = new TaxReceipts();
    this.referralInformation = buildSelector(this.container, '#refCode');
    this.requiredValidationErrors = buildSelector(this.container, 'small[ng-message="required"]');
    this.tributeDropDown = '#tributeePageType'
    this.tributeFirstName = '#tributeeFirstName'
    this.tributeLastName = '#tributeeLastName'
  }

  populateFormField(element: any, value: any, fieldType: string = 'textbox') {
    // waitForElement(element);
    // scrollElemFinderIntoView(element);
    if (fieldType === 'dropdown') {
      selectDropDownOption(element, `${value}`);
    } else if (fieldType === 'textbox') {
      ///clearInputWithBackspace(element);
      cy.get(element).clear().type(`${value}`);
    }
  }

  
  /**
   * Presses the individual user type button at the top of the user profile
   */
  clickIndividualUserType() {
    cy.wait(3000)
    cy.contains(this.organizationUserType, 'User Type').click()
    //setMatCheckboxChecked(this.organizationUserType, false);
  }

  /**
   * Presses the organization user type button at the top of the user profile. It will make the
   * organization field mandatory.
   */
  clickOrganizationUserType() {
    cy.wait(3000)
    cy.contains(this.organizationUserType, 'User Type').click()
    //setMatCheckboxChecked(this.organizationUserType, true);
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

  verifyGoogleAutofill(data){
    cy.wait(5000)
    this.addressInformationCO.enterAddress(data.address);
    cy.wait(1500)
    cy.get('.pac-container').should('be.visible')
  }

  fillInCustomFields(data){
    cy.get(this.additionalInformation.attribute1).type(data.attribute1);
    cy.get(this.additionalInformation.attribute2).type(data.attribute2);
    cy.get(this.additionalInformation.attribute3).type(data.attribute3);
    cy.get(this.additionalInformation.attribute4).type(data.attribute4);
    cy.get(this.additionalInformation.attribute5).type(data.attribute5);
  }

  fillInAccountInformation(data) {
    this.accountInformationCO.enterDetails(getLocalDateTime() + data.account.username, data.account.password, data.account.fundraisingGoal);
  }

  fillInAccountInformationAndFund(data) {
    this.accountInformationCO.enterDetails(getLocalDateTime() + data.account.username, data.account.password, data.account.fundraisingGoal, data.account.fund);
  }

  fillInFundraisingGoal(data){
    cy.get('#goal').type(data.account.fundraisingGoal)
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

  fillInTributeInformation(data){
    this.populateFormField(this.tributeDropDown, 'In Honour', 'dropdown')
    cy.get(this.tributeFirstName).clear().type(data.tributeFirstName)
    cy.get(this.tributeLastName).clear().type(data.tributeLastName)
  }

  fillInProfileAndAddressInformation(data) {
    cy.wait(1500)
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

  fillInAllFields(data) {
    this.fillInAllProfileInformation(data);
    this.fillInAllAddressInformation(data);
    this.fillInAdditionalInformation(data);
  }

  

  /**
   * Fills in all fields in the profile information section. To promote reuse, each data field is checked prior
   * to setting them in the UI, otherwise if any field is not in your data file it would be read as undefined,
   * and you would get an error.
   * @param data
   */
  fillInAllProfileInformation(data) {
    cy.wait(3000)
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
    if(data.explicitConsent){
      this.additionalInformation.setExplicitConsentCheckboxChecked(data.explicitConsent);
    }
    this.additionalInformation.setAttributes(data)
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
      cy.get(this.additionalInformation.attribute1).should('have.value', customFieldsData.customField1)
    }
    if (customFieldsData.customField2) {
      cy.get(this.additionalInformation.attribute2).should('have.value', customFieldsData.customField2)
    }
    if (customFieldsData.customField3) {
      cy.get(this.additionalInformation.attribute3).should('have.value', customFieldsData.customField3)
    }
    if (customFieldsData.customField4) {
      cy.get(this.additionalInformation.attribute4).should('have.value', customFieldsData.customField4)
    }
    if (customFieldsData.customField5) {
      cy.get(this.additionalInformation.attribute5).should('have.value', customFieldsData.customField5)
    }
  }

  fillInReferredUser(data) {
    setUserReferral(this.referralInformation, data.referredUser);    
  }


  
}

