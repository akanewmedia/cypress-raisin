//The information regarding the Library 
import { selectMatDropDownOption, enterText, buildSelector } from "../utils/actions";

export class CardInformation {
  container: any;
  creditCardNumber: any;
  creditCardHolderName: any;
  creditCardExpiryMonth: any;
  creditCardExpiryYear: any;
  creditCardCvv: any;

  constructor() {
    this.container = buildSelector('rx-credit-card-payment');
    // this.creditCardInformation = this.container.$('div.credit-card-payment.ccPaymentInfo');
    this.creditCardNumber = buildSelector('#txtCardNumber');
    this.creditCardHolderName = buildSelector('#txtCardHolderName');
    this.creditCardExpiryMonth = buildSelector('#creditCardExpirationMonth');
    this.creditCardExpiryYear = buildSelector('#creditCardExpirationYear');
    this.creditCardCvv = buildSelector('#cvvCode');
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

