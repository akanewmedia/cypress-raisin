//The information regarding the Library 
import { selectMatDropDownOption, enterText } from "../utils/actions";

export class CardInformation {
  container: any;
  creditCardNumber: any;
  creditCardHolderName: any;
  creditCardExpiryMonth: any;
  creditCardExpiryYear: any;
  creditCardCvv: any;

  constructor() {
    this.container = $('rx-credit-card-payment');
    // this.creditCardInformation = this.container.$('div.credit-card-payment.ccPaymentInfo');
    this.creditCardNumber = this.container.$('#txtCardNumber');
    this.creditCardHolderName = this.container.$('#txtCardHolderName');
    this.creditCardExpiryMonth = this.container.$('#creditCardExpirationMonth');
    this.creditCardExpiryYear = this.container.$('#creditCardExpirationYear');
    this.creditCardCvv = this.container.$('#cvvCode');
  }

  selectCardExpiryMonth(cardExpiryMonth) {
    selectMatDropDownOption(this.creditCardExpiryMonth, cardExpiryMonth);
  }

  selectCardExpiryYear(cardExpiryYear) {
    selectMatDropDownOption(this.creditCardExpiryYear, cardExpiryYear);
  }

  selectCardExpiryDate(month, year) {
    this.selectCardExpiryMonth(month);
    this.selectCardExpiryYear(year);
  }

  enterCardNumber(creditCardNumber) {
    enterText(this.creditCardNumber, creditCardNumber);
  }

  enterCardHolderName(creditCardHolderName) {
    enterText(this.creditCardHolderName, creditCardHolderName);
  }

  enterCardCvv(cvv) {
    enterText(this.creditCardCvv, cvv);
  }

  verifyCCIsRequired() {
    // expect(this.creditCardNumber.getAttribute("aria-required")).true;
  }
}

