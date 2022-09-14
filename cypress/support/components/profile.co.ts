
import { buildSelector, clickElement, elementByClass, elementById, enterText, selectMatDropDownOption, setCheckboxChecked, waitForElementToBeVisible } from "../utils/actions";

export class Profile {
  sameAsPurchaserCheckbox: any;
  contactTypeToggle: any;
  organisationButton: any;
  title: any;
  firstName: any;
  middleName: any;
  lastName: any;
  orgName: any;
  emailType: any;
  email: any;
  phoneType: any;
  phoneNumber: any;
  phoneExtension: any;
  gender: any;
  dateOfBirth: any;
  registrationType: any;
  acceptWaiverOnBehalf: any;
  constructor(private container: any) {

    this.sameAsPurchaserCheckbox = buildSelector(this.container, '#chkUseConstituentAddress');
    this.organisationButton = buildSelector(this.container, '#contact-type .mat-checkbox');
    this.title = buildSelector(this.container, '#title');
    this.firstName = buildSelector(this.container, '#firstName');
    this.middleName = buildSelector(this.container, '#middleName');
    this.lastName = buildSelector(this.container, '#lastName');
    this.orgName = buildSelector(this.container, '#companyName');
    this.emailType = buildSelector(this.container, '#emailType');
    this.email = buildSelector(this.container, '#email');
    this.phoneType = buildSelector(this.container, '#phoneType');
    this.phoneNumber = buildSelector(this.container, '#phone');
    this.phoneExtension = buildSelector(this.container, '#phoneExtension');
    this.gender = buildSelector(this.container, '#gender');
    this.dateOfBirth = buildSelector(this.container, '#date-of-birth');
    this.registrationType = buildSelector(this.container, '#registrationType');
    this.acceptWaiverOnBehalf = buildSelector(this.container, '#acceptOnBehalf .mat-checkbox');
  }

  selectSameAsPurchaser(sameAsPurchaser) {
    setCheckboxChecked(this.sameAsPurchaserCheckbox, sameAsPurchaser);
  }

  selectTitle(title) {
    selectMatDropDownOption(this.title, title);
  }

  selectEmailType(emailType) {
    selectMatDropDownOption(this.emailType, emailType);
  }

  selectPhoneType(phoneType) {
    selectMatDropDownOption(this.phoneType, phoneType);
  }

  selectGender(gender) {
    selectMatDropDownOption(this.gender, gender);
  }

  selectDateOfBirth(day, month, year) {
    enterText(this.dateOfBirth, `${month}\\${day}\\${year}`);

  }

  selectUserTypeIndividual() {
    setCheckboxChecked(this.organisationButton, false);
  }

  selectUserTypeOrganization() {
    setCheckboxChecked(this.organisationButton, true);
  }

  enterFirstName(text) {
    //waitForElementToBeVisible(this.firstName)
    enterText(this.firstName, text);
  }

  enterMiddleName(text) {
    enterText(this.middleName, text);
  }

  enterLastName(text) {
    enterText(this.lastName, text);
  }

  enterOrgName(text) {
    enterText(this.orgName, text);
  }

  enterEmail(text) {
    enterText(this.email, text);
  }

  enterPhoneNumber(text) {
    enterText(this.phoneNumber, text);
  }

  enterPhoneExtension(text) {
    enterText(this.phoneExtension, text);
  }

  selectRegistrationType(registrationType) {
    selectMatDropDownOption(this.registrationType, registrationType);
  }

  setAcceptWaiverOnBehalfCheckboxChecked(checked) {
    setCheckboxChecked(this.acceptWaiverOnBehalf, checked);
  }
}

