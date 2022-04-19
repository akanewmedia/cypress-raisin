class SignupPage {
    go() {
        cy.visit('/');
        cy.get('a[href="/deliver"]').click()
        cy.get('#page-deliver form h1').should('have.text', "Cadastre-se para  fazer entregas");
    }

    fillForm(deliver) {
        // Insere dados do deliver no formulario
        cy.get('input[name="fullName"]').type(deliver.name);
        cy.get('input[name="cpf"]').type(deliver.cpf);
        cy.get('input[name="email"]').type(deliver.email);
        cy.get('input[name="whatsapp"]').type(deliver.whatsapp);

        //Insere CEP e clica no botao para gerar dados automaticamente
        cy.get('input[name="postalcode"]').type(deliver.address.postalCode);
        cy.get('input[value="Buscar CEP"]').click();

        //Insere mais dados no endereco
        cy.get('input[name="address-number"]').type(deliver.address.number);
        cy.get('input[name="address-details"]').type(deliver.address.details);

        //Verifica se os dados gerados automaticamente estao corretos
        cy.get('input[name="address"]').should('have.value', deliver.address.street);
        cy.get('input[name="district"]').should('have.value', deliver.address.district);
        cy.get('input[name="city-uf"]').should('have.value', deliver.address.city_state);

        //Seleciona o tipo de entrega
        cy.contains('.delivery-method li', deliver.delivery_method).click();

        //Upload da CNH
        cy.get('input[accept^="image"]').attachFile(deliver.cnh)

    }

    submit() {
        //Clica no botao para finalizar cadastro
        cy.get('form button[type="submit"]').click()
    }

    modalContentShouldBe(expectedMessage) {
        //Verifica texto do modal aberto        
        cy.get('.swal2-container .swal2-html-container').should('have.text', expectedMessage);
    }

    alertMessageShouldBe(expectedMessage) {
        //Verifica a msg de erro
        //cy.get('.alert-error').should('have.text', expectedMessage);
        cy.contains('.alert-error', expectedMessage).should('be.visible')
    }
}

export default new SignupPage;