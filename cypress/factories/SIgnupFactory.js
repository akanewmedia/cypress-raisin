var faker = require('faker')
var cpf = require('gerador-validador-cpf')

export default {

    deliver: function() {

        var firstName = faker.name.firstName()
        var lastName = faker.name.lastName()
        var email = faker.internet.email(firstName)

        var data = {
            name: `${firstName} ${lastName}`,
            cpf: cpf.generate(),
            email: `${email}`,
            whatsapp: "91974794",
            address: {
                postalCode: "41820660",
                street: "Rua do Timbó",
                number: "680",
                details: "ap 1104",
                district: "Caminho das Árvores",
                city_state: "Salvador/BA"
            },
            delivery_method: "Moto",
            cnh: "/images/cnh-digital.jpg"
        }
        return data

    }

}