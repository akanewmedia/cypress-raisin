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


    // context('Required fields', function(){

    //     const messages = [
    //         {field: 'name', output: 'É necessário informar o nome'},
    //         {field: 'cpf', output: 'É necessário informar o CPF'},
    //         {field: 'email', output: 'É necessário informar o email'},
    //         {field: 'postalcode', output: 'É necessário informar o CEP'},
    //         {field: 'number', output: 'É necessário informar o número do endereço'},
    //         {field: 'delivery_method', output: 'Selecione o método de entrega'},
    //         {field: 'cnh', output: 'Adicione uma foto da sua CNH'}
    //     ]

    //     before(function(){
    //         signup.go();        
    //         signup.submit();
    //     })

    //     messages.forEach(function(msg){
    //         it(`${msg.field} is required`, function(){
    //             SignupPage.alertMessageShouldBe(msg.output)
    //         })
    //     })

    // })

})