import { Profile } from '../../components/profile.co'
import { Address } from '../../components/address.co'
import { AdditionalInformation } from '../../components/additionalInformation.co';
import { buildSelector, elementByClass, elementById, elementsByClass, scrollToElement } from '../../utils/actions'

export class AdditionalParticipantsPage {
  container: any;
  addParticipantButton: any;
  openAccordionContainer: any;
  individualUserType: any;
  organizationUserType: any;
  profileInformationCO: Profile;
  addressInformationCO: Address;
  additionalInformation: AdditionalInformation;
  requiredValidationErrors: any;
  participantAlreadyRegisteredError: any;
  maxTeamMembersReachedError: any;
  maxEventParticipantsReachedError: any;
  removeLastParticipantButton: any;
  accordionTab: any;
  helpBlock: any;
  constructor() {
    this.container = buildSelector('.additional-participants');
    this.helpBlock = buildSelector('.help-block');
    this.addParticipantButton = buildSelector(this.container, "#btnAddParticipant");
  }

  assignContainer() {
    this.openAccordionContainer = elementByClass(this.container, ".mat-expansion-panel.mat-expanded");
    this.individualUserType = elementById(this.openAccordionContainer, "#UserType_0-title");
    this.organizationUserType = elementById(this.openAccordionContainer, "#UserType_1-title");
    this.profileInformationCO = new Profile(this.openAccordionContainer);
    this.addressInformationCO = new Address(this.openAccordionContainer);
    this.additionalInformation = new AdditionalInformation(this.openAccordionContainer);
    this.requiredValidationErrors = elementsByClass(this.openAccordionContainer, 'small[ng-message="required"]');
    this.participantAlreadyRegisteredError = elementByClass(this.container, '.err-already-registered-wrap');
    this.assignErrorContainer();
    this.removeLastParticipantButton = elementByClass(this.openAccordionContainer, 'button[key="btn_Delete"]');
    this.accordionTab = elementById(this.container, '#accordion-tab-0');
  }
  assignErrorContainer() {
    this.maxTeamMembersReachedError = elementByClass(this.container, '.err-team-max-limit');
    this.maxEventParticipantsReachedError = elementByClass(this.container, '.err-event-max-limit');
  }
  /** check if team size allow additional participant */
  isMaxTeamMemberReached() {
    return this.helpBlock.isPresent()
  }
  /**
   * Presses the Add Participant button at the bottom of the Additional Participants section
   */
  clickAddParticipantButton() {
    this.addParticipantButton.click();
    this.assignContainer();
  }

  /**
   * Presses the individual user type button at the top of the user profile
   */
  clickIndividualUserType() {
    this.individualUserType.click();
  }

  /**
   * Presses the organization user type button at the top of the user profile. It will make the
   * organization field mandatory.
   */
  clickOrganizationUserType() {
    this.organizationUserType.click();
  }

  /**
   * Should accept the registration waiver (checkbox)
   * @param data
   */
  acceptRegistrationWaiver(data) {
    this.profileInformationCO.setAcceptWaiverOnBehalfCheckboxChecked(data.acceptWaiverOnBehalf);
  }

  /**
   * Should fill the profile information with a new generated email by default
   * @param data
   * @param {boolean} newEmail
   */
  fillInProfileInformation(data) {
    if (data.acceptWaiverOnBehalf) {
      this.acceptRegistrationWaiver(data);
    }
    this.profileInformationCO.enterFirstName(data.firstName);
    this.profileInformationCO.enterLastName(data.lastName);
    this.profileInformationCO.enterEmail(data.email);
    this.profileInformationCO.selectRegistrationType(data.registrationType);
  }

  /**
   * Should fill the profile information with a new generated email by default
   * @param data
   * @param {boolean} newEmail
   */
  fillInProfileInformationNoWaiver(data) {
    this.profileInformationCO.enterFirstName(data.firstName);
    this.profileInformationCO.enterLastName(data.lastName);
    this.profileInformationCO.enterEmail(data.email);
    this.profileInformationCO.selectRegistrationType(data.registrationType);
  }

  fillInAddressInformation(data) {
    if (data.useMainParticipantAddress) {
      this.addressInformationCO.setUseMyAddress(data.useMainParticipantAddress);
    } else {
      data.addressType && this.addressInformationCO.selectAddressType(data.addressType);
      this.addressInformationCO.enterAddress(data.address);
      this.addressInformationCO.enterCity(data.city);
      this.addressInformationCO.selectProvince(data.province);
      this.addressInformationCO.enterPostCode(data.postCode);
    }
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
    if (data.acceptWaiverOnBehalf) {
      this.acceptRegistrationWaiver(data);
    }
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
    if (data.registrationType) {
      this.profileInformationCO.selectRegistrationType(data.registrationType);
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
  /**
   * toggle tab of the first participant
   */
  openAdditionParticipant(index = 0) {
    const accordion = elementsByClass('.mat-expansion-panel').get(index);
    scrollToElement(accordion);
    accordion.click();
  }

  /**
  * remove second added participants
  */
  removeParticipant(index = 0) {
    const removeBtn = elementsByClass('.mat-expansion-panel').get(index).get('.btn-remove');
    scrollToElement(removeBtn);
    removeBtn.click();
  }

  /**
  * Cancel deletion in modal dialogue
  */
  confirmDelete() {
    elementById('#btn-confirm').click();
  }
  /**
  * Confirm deletion in modal dialogue
  */
  cancelDelete() {
    elementById('#btn-cancel').click();
  }

  verifyMandatoryFieldsHaveValues() {
    expect(this.profileInformationCO.firstName.getText()).not.eq("");
    expect(this.profileInformationCO.lastName.getText()).not.eq("");
    expect(this.profileInformationCO.orgName.getText()).not.eq("");
  }

  verifyRequiredFieldErrors(requiredFieldsValidationMessages) {

    expect(this.requiredValidationErrors.getText()).eq(requiredFieldsValidationMessages);
  }

  verifyParticipantAlreadyRegisteredError(participantAlreadyRegisteredMessage) {
    expect(this.participantAlreadyRegisteredError.getText()).contains(participantAlreadyRegisteredMessage);
  }

  verifyMaxTeamMembersReachedError(maxTeamMembersReachedMessage) {
    this.assignErrorContainer()
    expect(this.maxTeamMembersReachedError.getText()).contains(maxTeamMembersReachedMessage);
  }

  verifyMaxEventParticipantsReachedError(maxEventParticipantsReachedMessage) {
    this.assignErrorContainer();
    expect(this.maxEventParticipantsReachedError.isPresent()).true;
    expect(this.maxEventParticipantsReachedError.getText()).contains(maxEventParticipantsReachedMessage);
  }

  clickRemoveLastAdditionalParticipant() {
    this.removeLastParticipantButton.click();
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
}
