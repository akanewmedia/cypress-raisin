import { AdditionalInformation } from "../../components/additionalInformation.co";
import { Address } from "../../components/address.co";
import { Profile } from "../../components/profile.co";
import { buildSelector, scrollToElement } from "../../utils/actions";

export class YourInformationPage {
  container: any;
  profileInformation: Profile;
  addressInformation: Address;
  additionalInformation: AdditionalInformation;
  requiredValidationErrors: any;
  attendeeAccordions: any;

  constructor() {
    this.container = buildSelector('#userDetails');
    this.profileInformation = new Profile(this.container);
    this.addressInformation = new Address(this.container);
    this.additionalInformation = new AdditionalInformation(this.container);
    this.requiredValidationErrors = buildSelector(this.container, '.error-message');
    this.attendeeAccordions = buildSelector(this.container, 'div .attendee');
  }

  /**
   * Presses the organization user type button at the top of the user profile. It will make the
   * organization field mandatory.
   */
  selectUserTypeOrganization() {
    this.profileInformation.selectUserTypeOrganization();
  }

  fillInProfileInformation(data) {
    this.profileInformation.enterFirstName(data.firstName);
    this.profileInformation.enterLastName(data.lastName);
    this.profileInformation.enterEmail(data.email);
  }

  fillInAddressInformation(data) {
    data.addressType && this.addressInformation.selectAddressType(data.addressType);
    this.addressInformation.enterAddress(data.address);
    this.addressInformation.enterCity(data.city);
    this.addressInformation.selectProvince(data.province);
    this.addressInformation.enterPostCode(data.postCode);
  }

  fillInMandatoryFields(data) {
    this.fillInProfileInformation(data);
    this.fillInAddressInformation(data);
  }

  fillInEditedMandatoryFields(data) {
    this.profileInformation.enterOrgName(data.edited.companyName);
    this.addressInformation.enterPostCode(data.postCode);
  }

  fillInMandatoryFieldsWithOrganization(data) {
    this.fillInMandatoryFields(data);
    this.fillInOrganizationNameField(data);
  }

  fillInOrganizationNameField(data) {
    this.profileInformation.enterOrgName(data.companyName);
  }

  /**
   * Fills in all fields in the profile information section. To promote reuse, each data field is checked prior
   * to setting them in the UI, otherwise if any field is not in your data file it would be read as undefined,
   * and you would get an error.
   * @param data
   */
  fillInAllProfileInformation(data) {
    if (data.title) {
      this.profileInformation.selectTitle(data.title);
    }
    if (data.firstName) {
      this.profileInformation.enterFirstName(data.firstName);
    }
    if (data.middleName) {
      this.profileInformation.enterMiddleName(data.middleName);
    }
    if (data.lastName) {
      this.profileInformation.enterLastName(data.lastName);
    }
    if (data.emailType) {
      this.profileInformation.selectEmailType(data.emailType);
    }
    if (data.email) {
      this.profileInformation.enterEmail(data.email);
    }
    if (data.companyName) {
      this.profileInformation.enterOrgName(data.companyName);
    }
    if (data.phoneType) {
      this.profileInformation.selectPhoneType(data.phoneType);
    }
    if (data.phoneNumber) {
      this.profileInformation.enterPhoneNumber(data.phoneNumber);
    }
    if (data.phoneExtension) {
      this.profileInformation.enterPhoneExtension(data.phoneExtension);
    }
    if (data.gender) {
      this.profileInformation.selectGender(data.gender);
    }
    if (data.dayOfBirth && data.monthOfBirth && data.yearOfBirth) {
      this.profileInformation.selectDateOfBirth(data.dayOfBirth, data.monthOfBirth, data.yearOfBirth);
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
      this.addressInformation.selectAddressType(data.addressType);
    }
    if (data.country) {
      this.addressInformation.selectCountry(data.country);
    }
    if (data.address) {
      this.addressInformation.enterAddress(data.address);
    }
    if (data.city) {
      this.addressInformation.enterCity(data.city);
    }
    if (data.province) {
      this.addressInformation.selectProvince(data.province);
    }
    if (data.postCode) {
      this.addressInformation.enterPostCode(data.postCode);
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

  fillInAllFields(data) {
    this.fillInAllProfileInformation(data);
    this.fillInAllAddressInformation(data);
    this.fillInAdditionalInformation(data);
  }

  verifyTheDefaultCountry(defaultCountry) {
    expect(this.addressInformation.country.getText()).eq(defaultCountry);
  }

  verifyMandatoryFieldsHaveValues() {
    cy.get(this.profileInformation.firstName).should('not.eq', "")
    cy.get(this.profileInformation.lastName).should('not.eq', "")
    cy.get(this.profileInformation.orgName).should('not.eq', "")
    cy.get(this.addressInformation.address).should('not.eq', "")
    cy.get(this.addressInformation.city).should('not.eq', "")
    cy.get(this.addressInformation.postCode).should('not.eq', "")
  }

  verifyFieldPresence() {
    cy.get(this.profileInformation.firstName).should('be.visible')
    cy.get(this.profileInformation.lastName).should('be.visible')
    cy.get(this.profileInformation.email).should('be.visible')
    cy.get(this.addressInformation.address).should('be.visible')
    cy.get(this.addressInformation.city).should('be.visible')
    cy.get(this.addressInformation.postCode).should('be.visible')
    cy.get(this.addressInformation.province).should('be.visible')
   
  }

  verifyRequiredFieldErrors(requiredFieldsValidationMessages) {    
    const getTexts = ($errors) => {
      return Cypress._.map($errors, 'innerText')
    }
    cy.get(this.container + '.mat-mdc-form-field-subscript-wrapper .error-message').should('exist').then(getTexts).should('deep.equal', requiredFieldsValidationMessages)
  }

}