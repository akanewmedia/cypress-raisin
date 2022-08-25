// import donate from '../pages/DonatePage';
// import signupFactory from '../factories/SignupFactory';
// import paymentFactory from '../factories/PaymentFactory';


// describe('Donate', function () {

//     let deliver = signupFactory.deliver();
//     let payment = paymentFactory.payment();

//      it('Go to Donate page', function () {
      
//         donate.go();        

//     })

//     it('Donate to Event', function () {
    
//         donate.go();
//         donate.donateToEvent();
//         donate.fillForm(deliver);
//         donate.fillPaymentInformation(payment);
//         donate.submit();

//     })

//     it('Donate to Team', function () {
        
//         donate.go();
//         donate.donateToTeam();
//         donate.fillForm(deliver);
//         donate.fillPaymentInformation(payment);
//         donate.submit();

//     })

//     it('Donate to Individual', function () {
        
//         donate.go();
//         donate.donateToIndividual();
//         donate.fillForm(deliver);
//         donate.fillPaymentInformation(payment);
//         donate.submit();

//     })

//     it.only('Donate to Group', function () {
        
//         donate.go();
//         donate.donateToGroup();
//         donate.fillForm(deliver);
//         donate.fillPaymentInformation(payment);
//         donate.submit();

//     })


//     context('Required fields', function(){

//         const messages = [
//             {field: 'firstName', output: 'First Name is required'},
//             {field: 'lastName', output: 'Last Name is required'},
//             {field: 'email', output: 'E-mail is required'},
//             {field: 'street', output: 'Address is required'},
//             {field: 'city', output: 'City is required'},
//             {field: 'province', output: 'Province / State is required'},
//             {field: 'postalCode', output: 'Postal Code / ZIP is required'}
//         ]

//         before(function(){
//             donate.go();
//             donate.donateToEvent();
//             cy.wait(1500);
//             donate.submit();
//         })

//         messages.forEach(function(msg){
//             it(`${msg.field} is required`, function(){
//                 donate.alertMessageShouldBe(msg.output)
//             })
//         })

//     })

// })