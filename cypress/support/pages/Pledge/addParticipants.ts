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
    this.openAccordionContainer = buildSelector(this.container, ".mat-expansion-panel.mat-expanded");
    this.individualUserType = buildSelector(this.openAccordionContainer, "#UserType_0-title");
    this.organizationUserType = buildSelector(this.openAccordionContainer, "#UserType_1-title");
    this.profileInformationCO = new Profile(this.openAccordionContainer);
    this.addressInformationCO = new Address(this.openAccordionContainer);
    this.additionalInformation = new AdditionalInformation(this.openAccordionContainer);
    this.requiredValidationErrors = buildSelector(this.openAccordionContainer, 'small[ng-message="required"]');
    this.participantAlreadyRegisteredError = buildSelector(this.container, '.err-already-registered-wrap');
    this.assignErrorContainer();
    this.removeLastParticipantButton = buildSelector(this.openAccordionContainer, 'button[key="btn_Delete"]');
    this.accordionTab = buildSelector(this.container, '#accordion-tab-0');
  }
  assignErrorContainer() {
    this.maxTeamMembersReachedError = buildSelector(this.container, '.err-team-max-limit');
    this.maxEventParticipantsReachedError = buildSelector(this.container, '.err-event-max-limit');
  }
  /** check if team size allow additional participant */
  isMaxTeamMemberReached() {
    var element = document.getElementById(this.helpBlock);
    if (typeof (element) != 'undefined' && element != null) {
      return true
    } else {
      return false
    }
  }
  /**
   * Presses the Add Participant button at the bottom of the Additional Participants section
   */
  clickAddParticipantButton() {
    cy.get(this.addParticipantButton).click();
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
    const accordion = cy.get('.mat-expansion-panel').eq(index)
    //const accordion = elementsByClass('.mat-expansion-panel').get(index);
    //scrollToElement(accordion);
    accordion.click();
  }

  /**
  * remove second added participants
  */
  removeParticipant(index = 0) {
    cy.get('.mat-expansion-panel').eq(index).within(()=>{
      cy.get('.btn-remove').click()
    })
    //scrollToElement(removeBtn);    
  }

  /**
  * Cancel deletion in modal dialogue
  */
  confirmDelete(index) {
    // cy.on("window:confirm", () => {      
    //   return true 
    // });
    this.removeParticipant(index)
    elementById('#btn-confirm').click();
  }
  /**
  * Confirm deletion in modal dialogue
  */
  cancelDelete(index) {
    // cy.on("window:confirm", (str) => {  
    //   expect(str).to.eq('Are you sure you want to delete the selected participant?')    
    //   return false;
    // });
    this.removeParticipant(index)
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
    cy.get(this.participantAlreadyRegisteredError).should('have.text', participantAlreadyRegisteredMessage)
  }

  verifyMaxTeamMembersReachedError(maxTeamMembersReachedMessage) {
    this.assignErrorContainer()
    cy.get(this.maxTeamMembersReachedError).should('include.text', maxTeamMembersReachedMessage)
  }

  verifyMaxEventParticipantsReachedError(maxEventParticipantsReachedMessage) {
    this.assignErrorContainer();
    cy.get(this.maxEventParticipantsReachedError).should('exist')
    cy.get(this.maxEventParticipantsReachedError).should('have.text', maxEventParticipantsReachedMessage)
  }

  clickRemoveLastAdditionalParticipant() {
    this.removeLastParticipantButton.click();
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
}
