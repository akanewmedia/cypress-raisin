import donate from '../pages/DonatePage';
import signupFactory from '../factories/SignupFactory';
import paymentFactory from '../factories/PaymentFactory';


describe('Donate', function () {

     it('Go to Donate page', function () {
      
        donate.go();        

    })

    it('Donate to Event', function () {

        var deliver = signupFactory.deliver();
        var payment = paymentFactory.payment();

        
        donate.go();
        donate.donateToEvent();
        donate.fillForm(deliver);
        donate.fillPaymentInformation(payment);
        donate.submit();

    })


    context('Required fields', function(){

        const messages = [
            {field: 'firstName', output: 'First Name is required'},
            {field: 'lastName', output: 'Last Name is required'},
            {field: 'email', output: 'E-mail is required'},
            {field: 'street', output: 'Address is required'},
            {field: 'city', output: 'City is required'},
            {field: 'province', output: 'Province / State is required'},
            {field: 'postalCode', output: 'Postal Code / ZIP is required'}
        ]

        before(function(){
            donate.go();
            donate.donateToEvent();
            cy.wait(1500);
            donate.submit();
        })

        messages.forEach(function(msg){
            it(`${msg.field} is required`, function(){
                donate.alertMessageShouldBe(msg.output)
            })
        })

    })

})