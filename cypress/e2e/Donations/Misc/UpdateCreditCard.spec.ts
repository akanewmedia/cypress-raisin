import { PageSetup } from "../../../support/utils/pageSetup";
import { DonationsPage } from "../../../support/pages/Donations/donations.po";
import * as specificData from '../../../data/Donations/UpdateCreditCard.json'
import { UpdateCreditCard } from "../../../support/components/updateCreditCard.co";

//The information regarding the Library
const using = require('jasmine-data-provider');
const pageSetup: PageSetup = new PageSetup();
const updateCreditCard: UpdateCreditCard = new UpdateCreditCard()

const data = pageSetup.getData('Donations', specificData);
const events = pageSetup.getEvents(pageSetup.getEnvironment().donations, data.events);

describe('Update Credit Card Test ', () => {

    
  

    let val = Date.now();
    let number1 = Math.floor(Math.random() * 10);
    let number2 = Math.floor(Math.random() * 10);
    let number3= Math.floor(Math.random() * 10);


    using(events, event => {
        describe(`${event}`, () => {
            before(() => {
                pageSetup.goToEvent(`${event}/${data.URL}`);
                pageSetup.waitForPageLoad()
            });

            it("Page should be loaded and information should be displayed", () => {
                cy.get('.recuringPaymentUpdate-heading h1').should('contain.text', "Update payment details")
                //Should match User Name
                cy.get(updateCreditCard.welcomeMessage).should('contain.text', "Victor Volunteer")

                //Should match Donation Amount
                cy.get(updateCreditCard.amount).should("have.value", "50")

                //Mailing Address button should be unchecked
                cy.get(updateCreditCard.addressChangeButton).should("not.be.checked")
                //Button UPDATE should be visible
                cy.contains("button", "Update").should("be.visible")
                //Button Cancel Monthly Donation should be visible
                cy.contains("button", "Cancel monthly donation").should("be.visible")
            })            

            it("Should clear input fields and verify error messages", () => {
                cy.get(updateCreditCard.addressChangeButton).click()
                cy.get(updateCreditCard.addressLine1).clear()
                cy.get(updateCreditCard.addressLine2).clear()
                cy.get(updateCreditCard.city).clear()
                cy.get(updateCreditCard.postalCode).clear()
                updateCreditCard.clickUpdateButton()
                updateCreditCard.verifyRequiredFieldErrors(data.validationMessages)
            })

            it("Should click cancel transaction and click NO", ()=>{
                updateCreditCard.clickCancelButton()
                cy.get('#dialog_label').should('contain.text', "Are you sure you'd like to cancel your recurring donation?")
                cy.contains("button", "Yes").should('be.visible')
                cy.contains("button", "No").should('be.visible')
                cy.contains("button", "No").click()
            })

            it("Should Update Address and verify if it was properly updated", () => {    
                //Verify Fields Existence            
                //cy.get(updateCreditCard.addressType).should('be.visible')
                cy.get(updateCreditCard.country).should('be.visible')
                cy.get(updateCreditCard.addressLine1).should('be.visible')
                cy.get(updateCreditCard.addressLine2).should('be.visible')
                cy.get(updateCreditCard.city).should('be.visible')
                cy.get(updateCreditCard.province).should('be.visible')
                cy.get(updateCreditCard.postalCode).should('be.visible')

                //Updates Address
                

                //cy.get(updateCreditCard.addressType).click()
                //cy.get(".mat-option-text").contains("Business").click()
                cy.get(updateCreditCard.province).click()
                cy.get(".mat-option-text").contains("Ontario").click()
                cy.get(updateCreditCard.addressLine1).type(val + " Street")
                cy.get(updateCreditCard.addressLine2).type(val + " Line 2")
                cy.get(updateCreditCard.city).type(val + " City")
                cy.get(updateCreditCard.postalCode).type("M" + number1 + "P" + number2 + "L" + number3)

                //Adds Payment Info to Finish Update
                updateCreditCard.enterCCInfoWL()          

                updateCreditCard.clickUpdateButton()
            })

            it("Should Verify Success Page", ()=> {
                cy.get('.success').should('contain.text', data.successMessage)
            })

            it("Should go back to UCC Page and verify if Data was updated", ()=> {
                pageSetup.goToEvent(`${event}/${data.URL}`);
                cy.get(updateCreditCard.addressChangeButton).click()

                cy.get(updateCreditCard.addressLine1).should('have.value', `${val} Street`)
                cy.get(updateCreditCard.addressLine2).should('have.value', `${val} Line 2`)
                cy.get(updateCreditCard.city).should('have.value', `${val} City`)
                cy.get(updateCreditCard.postalCode).should("have.value", (`M${number1}P ${number2}L${number3}`))
            })
    });
});
})
