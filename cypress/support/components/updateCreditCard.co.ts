import { buildSelector } from '../utils/actions';

export class UpdateCreditCard {
  container: any;
  recurringHeader: any;
  welcomeMessage: any;
  amount: any;
  addressChangeButton: any;
  addressLine1: any;
  addressLine2: any;
  city: any;
  postalCode: any;
  addressType: any;
  country: any
  province: any

  constructor() {
    this.container = buildSelector('#payment-update-form');
    this.recurringHeader = buildSelector('#contentareaAd8Hn p');
    this.welcomeMessage = buildSelector(this.container, '.recuringPaymentUpdate-heading p');
    this.amount = buildSelector(this.container, '#amount');
    this.addressChangeButton = buildSelector(this.container, '.add-Change');//
    this.addressLine1 = buildSelector(this.container, '#addressLine1');
    this.addressLine2 = buildSelector(this.container, '#addressLine2');
    this.city = buildSelector(this.container, '#city');
    this.postalCode = buildSelector(this.container, '#postalCode');
    this.addressType = buildSelector(this.container, '#addressType');
    this.country = buildSelector(this.container, '#country')
    this.province = buildSelector(this.container, '#province')
  }

  verifyRequiredFieldErrors(data) {
    const getTexts = ($errors) => {
      return Cypress._.map($errors, 'innerText')
    }
    cy.get('.mat-mdc-form-field-subscript-wrapper .error-message').should('exist').then(getTexts).should('deep.equal', data)
  }


  /////////////////////////////// WORLDLINE IFRAME ////////////////////////////////////////////////
  getCVVIFrameWL() {
    const getIframeDocument = () => {
      return cy
        .get('iframe[name="bambora-cvv-iframe"]')
        .its('0.contentDocument').should('exist')
    }

    const getIframeBody = () => {
      return getIframeDocument()
        .its('body').should('not.be.undefined')
        .then(cy.wrap)
    }

    return getIframeBody();
  }

  getExpiryIFrameWL() {
    const getIframeDocument = () => {
      return cy
        .get('iframe[name="bambora-expiry-iframe"]')
        .its('0.contentDocument').should('exist')
    }

    const getIframeBody = () => {
      return getIframeDocument()
        .its('body').should('not.be.undefined')
        .then(cy.wrap)
    }

    return getIframeBody();
  }

  getCCNumberIFrameWL() {
    const getIframeDocument = () => {
      return cy
        .get('iframe[name="bambora-card-number-iframe"]')
        .its('0.contentDocument').should('exist')
    }

    const getIframeBody = () => {
      return getIframeDocument()
        .its('body').should('not.be.undefined')
        .then(cy.wrap)
    }

    return getIframeBody();
  }

  enterCreditCardNumberWL() {
    this.getCCNumberIFrameWL().within(() => {
      cy.get("#bambora-card-number").type("4242424242424242")
    })
  }

  enterCardholderNameWL() {
    cy.get("#beanstreamEmbeddedPaymentCardHolder").type("Test Card")
  }

  enterCreditCardExpiryWL() {
    this.getExpiryIFrameWL().within(() => {
      cy.get('#bambora-expiry').type("1128")
    })
  }

  enterCreditCardCVVWL() {
    this.getCVVIFrameWL().within(() => {
      cy.get('#bambora-cvv').type("123")
    })
  }

  enterCCInfoWL() {
    this.enterCreditCardNumberWL()
    this.enterCardholderNameWL()
    this.enterCreditCardExpiryWL()
    this.enterCreditCardCVVWL()
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////

  clickUpdateButton() {
    cy.contains("button", "Update").click()
  }

  clickCancelButton() {
    cy.contains("button", "Cancel monthly donation").click()
  }

  //////////////////////////////////////////////////// SAFESAVE IFRAME /////////////////////////////////////
  getCVVIFrameSS() {
    const getIframeDocument = () => {
      return cy
        .get('iframe[id="CollectJSInlinecvv"]')
        .its('0.contentDocument').should('exist')
    }

    const getIframeBody = () => {
      return getIframeDocument()
        .its('body').should('not.be.undefined')
        .then(cy.wrap)
    }

    return getIframeBody();
  }

  getExpiryIFrameSS() {
    const getIframeDocument = () => {
      return cy
        .get('iframe[id="CollectJSInlineccexp"]')
        .its('0.contentDocument').should('exist')
    }

    const getIframeBody = () => {
      return getIframeDocument()
        .its('body').should('not.be.undefined')
        .then(cy.wrap)
    }

    return getIframeBody();
  }

  getCCNumberIFrameSS() {
    const getIframeDocument = () => {
      return cy
        .get('iframe[id="CollectJSInlineccnumber"]')
        .its('0.contentDocument').should('exist')
    }

    const getIframeBody = () => {
      return getIframeDocument()
        .its('body').should('not.be.undefined')
        .then(cy.wrap)
    }

    return getIframeBody();
  }

  enterCreditCardNumberSS() {
    this.getCCNumberIFrameSS().within(() => {
      cy.get("#ccnumber").type("5454545454545454")
    })
  }

  enterCreditCardExpirySS() {
    this.getExpiryIFrameSS().within(() => {
      cy.get('#ccexp').type("1128")
    })
  }

  enterCreditCardCVVSS() {
    this.getCVVIFrameSS().within(() => {
      cy.get('#cvv').type("123")
    })
  }

  enterCCInfoSS() {
    this.enterCreditCardNumberSS()
    this.enterCreditCardExpirySS()
    this.enterCreditCardCVVSS()
  }

}
