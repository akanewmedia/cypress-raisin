import { clickElement, elementById, enterText, wait } from '../../../utils/actions';

/**
 * Represents the Paypal flow
 */
export class PayPal {
  [x: string]: any;
  cancelLink: any;

  /**
   * On the Paypal website clicks cancel to return to the merchant's website
   */
  cancelAndReturnToMerchantWebsite() {
    this.cancelLink = elementById('#login .cancelUrl a');
    return this.cancelLink.isPresent().then((cancelLinkIsPresent) => {
      if (cancelLinkIsPresent) {
        return this.cancelLink.click().then(() => {
          //sometimes paypal redirects to another login page, so checking cancel url
          this.cancelLink2 = elementById('footer .cancelUrl a');
          return this.cancelLink2.isPresent().then((cancelLink2IsPresent) => {
            if (cancelLink2IsPresent) {
              return this.cancelLink2IsPresent.click();
            }
          });
        });
      } else {
        console.log("Unexpected use case. Cancel link is not present. Requires investigation.");
      }
    });
  }

  /**
   * login to Paypal website and completes the payment process
   * @param data
   */
  loginAndPay(data) {

    const sentArgs = { username: "PayPalTest@akanewmedia.com", password: "paypaltest" }        
    cy.origin(
      'www.sandbox.paypal.com',
      // Send the args here...
      { args: sentArgs },
      // ...and receive them at the other end here!
      ({ username, password }) => {  
      cy.get('#login').type(username)
      cy.get('#btnNext').click()
      cy.get('#password').type(password)  
    })


    // this.container = ("#login");
    // this.btnNext = (this.container, '#btnNext');
    // this.enterEmailAndClickNextButton(data)
    // cy.wait(2000)
    // this.enterPasswordAndClickLogin(data)


   

    // this.btnNext.isPresent().then((btnNextIsPresent) => {
    //   if (btnNextIsPresent) {
    //     return this.enterEmailAndClickNextButton(data);
    //   } else {
    //     this.btnLogin = elementById(this.container, '#btnLogin');
    //     return this.btnLogin.isPresent().then((btnLoginIsPresent) => {
    //       if (btnLoginIsPresent) {
    //         return this.enterPasswordAndClickLogin(data);
    //       } else {
    //         console.log('Unexpected use case. Neither #btnNext nor #btnLogin were found');
    //       }
    //     });
    //   }
    // });
  }

  /**
   * Enters the email address and clicks the next button
   * @param data
   */
  enterEmailAndClickNextButton(data) {
    this.email = (this.container, '#email');
    this.btnNext = (this.container, '#btnNext');
    this.btnLoginBottom = (this.container, '#btnLogin');

    enterText(this.email, data.paypal.email);    
    clickElement(this.btnNext)
  }

  /**
   * Enters the password and clicks login button
   * @param data
   */
  enterPasswordAndClickLogin(data) {
    this.password = (this.container, '#password');
    enterText(this.password, data.paypal.password);
    return this.pressLoginBtnBottom();
  }

  /**
   * Presses the login button at the bottom
   */
  pressLoginBtnBottom() {
    this.btnLoginBottom = elementById(this.container, '#btnLogin');
    cy.get(this.btnLoginBottom).click()


    // return this.btnLoginBottom.isPresent().then((btnLoginBottomIsPresent) => {
    //   if (btnLoginBottomIsPresent) {
    //     return clickElement(this.btnLoginBottom, true).then(() => {
    //       return this.chooseCreditCardOption();
    //     });
    //   } else {
    //     console.log('Unexpected use case. #btnLogin was not found');
    //   }
    // });
  }

  /**
   * Choose the credit card
   */
  chooseCreditCardOption() {
    this.container = elementById("#main");
    this.creditCardOption = elementById(this.container, 'input[value="0"]');
    return this.creditCardOption.isPresent().then((creditCardOptionIsPresent) => {
      if (creditCardOptionIsPresent) {
        this.continuebtn = elementById(this.container, '.btn.full.confirmButton.continueButton');
        return this.continuebtn.click().then(() => {
          return this.chooseContinueOnConfirmationPage();
        });
      } else {
        //must be the confirmation page
        return this.chooseContinueOnConfirmationPage();
      }
    });
  }

  /**
   * Choose the continue button on confirmation page
   */
  chooseContinueOnConfirmationPage() {
    this.confirmContinuebtn = elementById('#payment-submit-btn');
    return this.confirmContinuebtn.isPresent().then((confirmContinuebtnIsPresent) => {
      if (confirmContinuebtnIsPresent) {
        return clickElement(this.confirmContinuebtn, true);
      } else {
        console.log('Unexpected use case. .continueButton was not found')
      }
    });
  }
}
