import { buildSelector } from '../utils/actions';

export class UserProfile {
    constructor() {
        this.container = ('.profile-page')
        this.personalInfo = buildSelector('.personal-info');
        this.firstName = buildSelector(this.personalInfo,'#firstName');
        this.middleName = buildSelector(this.personalInfo,'#middleName');
        this.lastName = buildSelector(this.personalInfo,'#lastName');
        this.email = buildSelector(this.personalInfo,'#email');
        this.phone = buildSelector(this.personalInfo,'#phone');
        this.phoneExtension = buildSelector(this.personalInfo,'#phoneExtension');
        this.birthDate = buildSelector(this.personalInfo,'#date-of-birth');
        this.orgName = buildSelector(this.personalInfo,'#companyName');
        this.addressLine1 = buildSelector(this.personalInfo,'#addressLine1');
        this.addressLine2 = buildSelector(this.personalInfo,'#addressLine2');
        this.city = buildSelector(this.personalInfo,'#city');
        this.postalCode = buildSelector(this.personalInfo,'#postalCode');
        this.additionalInfo = buildSelector('.additional-info ')
        this.attribute1 = buildSelector(this.additionalInfo , '#attribute1')
        this.attribute2 = buildSelector(this.additionalInfo , '#attribute2')
        this.attribute3 = buildSelector(this.additionalInfo , '#attribute3')
        this.attribute4 = buildSelector(this.additionalInfo , '#attribute4')
        this.attribute5 = buildSelector(this.additionalInfo , '#attribute5')
        this.shortAnswer = buildSelector(this.additionalInfo, '#26455')
        this.tellMeYourStory = buildSelector(this.additionalInfo, '#26458')
    }


    container: any
    personalInfo: any;
    firstName: any; 
    middleName: any;
    lastName: any;
    email: any;
    phone: any;
    phoneExtension: any;
    birthDate: any;
    orgName: any;
    addressLine1: any;
    addressLine2: any;
    city: any;
    postalCode: any;
    additionalInfo: any
    attribute1:any
    attribute2:any
    attribute3:any
    attribute4:any
    attribute5:any
    shortAnswer:any
    tellMeYourStory:any


  clearInputFields(){
    //Profile Info
    cy.get(this.firstName).clear()
    cy.get(this.middleName).clear()
    cy.get(this.lastName).clear()
    cy.get(this.email).clear()
    cy.get(this.phone).clear()
    cy.get(this.phoneExtension).clear()
    cy.get(this.orgName).clear()
    cy.get(this.addressLine1).clear()
    cy.get(this.addressLine2).clear()
    cy.get(this.city).clear()
    cy.get(this.postalCode).clear()

    //Additional Info
    cy.get(this.attribute1).clear()
    cy.get(this.attribute2).clear()
    cy.get(this.attribute3).clear()
    cy.get(this.attribute4).clear()
    cy.get(this.attribute5).clear()
    cy.get(this.shortAnswer).clear()
    cy.get(this.tellMeYourStory).clear()
  }


  verifyRequiredFieldErrors(requiredFieldsValidationMessages) {
    const getTexts = ($errors) => {
      return Cypress._.map($errors, 'innerText')
    }
    cy.get(this.container + ' .mat-form-field-subscript-wrapper .error-message').should('exist').then(getTexts).should('deep.equal', requiredFieldsValidationMessages)
  }
}
