var faker = require('faker')

export default {

    deliver: function() {

        var firstName = faker.name.firstName()
        var lastName = faker.name.lastName()
        var email = faker.internet.email(firstName)

        var data = {
            firstName: `${firstName}`,
            lastName: ` ${lastName}`,            
            email: `${email}`,           
            address: {
                postalCode: "M4M4M4",
                street: "123 Main Street",    
                city: "Toronto"
            }
        }
        return data

    }

}
