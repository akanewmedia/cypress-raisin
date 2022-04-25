import signup from '../pages/DonatePage';
import signupFactory from '../factories/SignupFactory';
import paymentFactory from '../factories/PaymentFactory';


describe('Donate', function () {

     it('Go to Donate page', function () {
      
        signup.go();        

    })

    it('Donate to Event', function () {

        var deliver = signupFactory.deliver();
        var payment = paymentFactory.payment();

        
        signup.go();
        signup.donateToEvent();
        signup.fillForm(deliver);
        signup.fillPaymentInformation(payment);
        signup.submit();

    })


    context('Required fields', function(){

        const messages = [
            {field: 'firstName', output: 'First Namezz is required'},
            {field: 'lastName', output: 'Last Name is required'},
            {field: 'email', output: 'E-mail is required'},
            {field: 'street', output: 'Address is required'},
            {field: 'city', output: 'City is required'},
            {field: 'province', output: 'Province / State is required'},
            {field: 'postalCode', output: 'Postal Code / ZIP is required'}
        ]

        before(function(){
            signup.go();
            signup.donateToEvent();
            cy.wait(1500);
            signup.submit();
        })

        messages.forEach(function(msg){
            it(`${msg.field} is required`, function(){
                signup.alertMessageShouldBe(msg.output)
            })
        })

    })

})