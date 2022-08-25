


class DonatePage {
    go() {
        cy.visit('mpamr/pledge/sponsor/start');        
    }

    donateToEvent(){
        cy.get('#search-navigation-event').click()   
        cy.get('input[placeholder="Other Amount"]').type("50");
        cy.get('button[class$="btn-continue"]').click();
    }

    donateToTeam(){
        cy.get('#search-navigation-team').click()   
        cy.get('button[class$="btn btn-default btn-flow--light"]').click();
        cy.get('button[class*="btn-donate"]').first().click(); 
        cy.wait(2000)   
        cy.get('mat-radio-button[id*="mat-radio-"]').first().click();   
        cy.contains('span', ' Show My Name and Amount ').click()
        cy.get('#btnSubmit').click();        
    }

    donateToIndividual(){
        cy.get('#search-navigation-individual').click()   
        cy.get('button[class$="btn btn-default btn-flow--light"]').click();
        cy.get('button[class*="btn-donate"]').first().click(); 
        cy.wait(2000)   
        cy.get('mat-radio-button[id*="mat-radio-"]').first().click();   
        cy.contains('span', ' Show My Name and Amount ').click()
        cy.get('#btnSubmit').click();        
    }

    donateToGroup(){
        cy.get('#search-navigation-group').click()   
        cy.get('button[class$="btn btn-default btn-flow--light"]').click();
        cy.get('button[class*="btn-donate"]').first().click(); 
        cy.get('#customAmount').type("100"); 
        cy.contains('span', ' Show My Name and Amount ').click()
        cy.get('#btnSubmit').click();        
    }

    fillForm(deliver) {
        // Insere dados do deliver no formulario
        cy.wait(1500);
        cy.get('input[id="firstName"]').type(deliver.firstName);
        cy.get('input[id="lastName"]').type(deliver.lastName);
        cy.get('input[id="email"]').type(deliver.email);
        cy.get('input[id="addressLine1"]').type(deliver.address.street);
        cy.get('input[id="city"]').type(deliver.address.city);
        cy.get('#province').click().get('mat-option').contains('Alberta').click();;
        cy.get('input[id="postalCode"]').type(deliver.address.postalCode);        
        cy.get('#btnSubmit').click();
    }

    fillPaymentInformation(payment) {
        cy.get('#txtCardNumber').type(payment.ccNumber);
        cy.get('#txtCardHolderName').type(payment.ccName);
        cy.get('#creditCardExpirationMonth').click();
        cy.get('#mat-option-557').click();
        cy.get('#creditCardExpirationYear').click();
        cy.get('#mat-option-569').click();
        cy.get('input[id="cvvCode"]').type("123");
        cy.get('#btnSubmit').click();
    }

    submit() {
        //Clica no botao para finalizar cadastro
        cy.get('#btnSubmit').click();
    }

    alertMessageShouldBe(expectedMessage) {
        //Verifica a msg de erro
        //cy.get('.alert-error').should('have.text', expectedMessage);
        cy.contains(' rx-errors > div', expectedMessage).should('be.visible')
    }
}

export default new DonatePage;