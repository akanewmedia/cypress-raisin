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


  clearPersonalInformation(){
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
  }

  clearAdditionalInformation(){    
    //Additional Info
    cy.get(this.attribute1).clear()
    cy.get(this.attribute2).clear()
    cy.get(this.attribute3).clear()
    cy.get(this.attribute4).clear()
    cy.get(this.attribute5).clear()
    //cy.get(this.shortAnswer).clear()
    //cy.get(this.tellMeYourStory).clear()
  }

  fillPersonalInformation(data){
    cy.get(this.firstName).type(data.firstName)
    cy.get(this.middleName).type(data.middleName)
    cy.get(this.lastName).type(data.lastName)
    cy.get(this.email).type(data.email)
    cy.get(this.phone).type(data.phoneNumber)
    cy.get(this.phoneExtension).type(data.phoneExtension)
    cy.get(this.orgName).type(data.companyName)
    cy.get(this.addressLine1).type(data.addressLine1)
    cy.get(this.addressLine2).type(data.addressLine2)
    cy.get(this.city).type(data.city)
    cy.get(this.postalCode).type(data.postalCode)
  }

  fillAdditionalInformation(data){    
    //Additional Info
    cy.get(this.attribute1).type(data.attribute1)
    cy.get(this.attribute2).type(data.attribute2)
    cy.get(this.attribute3).type(data.attribute3)
    cy.get(this.attribute4).type(data.attribute4)
    cy.get(this.attribute5).type(data.attribute5)
    // cy.get(this.shortAnswer).type(data.shortAnswer)
    // cy.get(this.tellMeYourStory).type(data.tellMeYourStory)
  }

  clickPersonalInfoSubmit(){
    cy.contains(this.personalInfo + ' button', "Update").click()
  }

  clickAdditionalInfoSubmit(){
    cy.contains(this.additionalInfo + ' button', "Update").click()
  }

  verifyPersonalInfoRequiredFieldErrors(data) {
    const getTexts = ($errors) => {
      return Cypress._.map($errors, 'innerText')
    }
    cy.get(this.personalInfo + ' .mat-mdc-form-field-subscript-wrapper .error-message').should('exist').then(getTexts).should('deep.equal', data)
  }

  verifyAdditionalInfoRequiredFieldErrors(data) {
    const getTexts = ($errors) => {
      return Cypress._.map($errors, 'innerText')
    }
    cy.get(this.additionalInfo + ' .mat-mdc-form-field-subscript-wrapper .error-message').should('exist').then(getTexts).should('deep.equal', data)
  }


 
}
