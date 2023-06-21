import { buildSelector, elementById } from "../../utils/actions";

/**
 * Represents the volunteer thank you page
 */
export class VolunteerThankYouPage {
  container: any;
  thankYouMessageContainer: any;
  thankYouMessageHeader: any;
  constructor() {
    this.container = buildSelector('#base-page-top');
    this.thankYouMessageContainer = buildSelector('div.is-container.is-builder.is-content-800');
    this.thankYouMessageHeader = buildSelector(this.thankYouMessageContainer, 'h1 span');
  }

  /**
   * Checks the text on the page to see if the submission was successful
   * @param data
   */
  checkSuccessful(data) {
    cy.get(this.thankYouMessageHeader).should('contain', data.successfulVolunteerText)
    this.checkConstituent()
  }


  getConstituent(){
    cy.intercept('POST', '**/constituent', (req) => {
      if (req.url.includes('constituent')) {   
        req.alias = 'getConstituent'
      }      
    })

    cy.intercept('POST', '**/constituent/**', (req) => {
      if (req.url.includes('additional')) {   
        req.alias = 'getConstituent'
      }      
    })

    
 
  }

  checkConstituent() {  
    cy.wait('@getConstituent').its('response.statusCode').should('eq', 200)
  }
}
