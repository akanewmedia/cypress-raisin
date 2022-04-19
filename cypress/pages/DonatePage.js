class SignupPage {
    go() {
        cy.visit('/');
        cy.get('[data-pgid="3"] > a').click()
        
    }

    donateToEvent(){
        cy.get('#search-navigation-event').click()   
        cy.get('input[placeholder="Other Amount"]').type("50");
        cy.get('button[class$="btn-continue"]').click();
    }

    fillForm(deliver) {
        // Insere dados do deliver no formulario
        cy.wait(1500);
        cy.get('input[id="firstName"]').type(deliver.firstName);
        cy.get('input[id="lastName"]').type(deliver.lastName);
        cy.get('input[id="email"]').type(deliver.email);
        cy.get('input[id="addressLine1"]').type(deliver.address.street);
        cy.get('input[id="city"]').type(deliver.address.city);
        cy.get('mat-select[id="province"]').click();
        cy.get('#mat-option-541 > span').click();
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
        cy.get('#btnSubmit').click();
    }

    submit() {
        //Clica no botao para finalizar cadastro
        cy.get('#btnSubmit').click();
    }
}

export default new SignupPage;