import { CardInformation } from '../../components/cardInformation.co'
import { Store } from '../../components/store.co';
import { scrollToElement, enterText, clickElement } from '../../utils/actions'
import { isEmpty } from 'lodash';

export class PaymentPage {
    container: any;
    donationContainer: any;
    donationAmount: any;
    creditCardButton: any;
    paypalButton: any;
    registrationFeeContainer: any;
    registrationFeeText: any;
    registrationFeeDiscountTextContainer: any;
    registrationFeeDiscountText: any;
    registrationFeePromoCodeContainer: any;
    registrationFeePromoCode: any;
    registrationFeePromoCodeApplyButton: any;
    store: any;
    storePromoCode: any;
    storePromoCodeApplyButton: any;
    total: any;
    storePromoCodeLabel: any;
    cardInformationCO: CardInformation;

    constructor() {
        this.container = cy.get('.flow-step');

        this.donationContainer = this.container.get('#donationSection');
        this.donationAmount = this.donationContainer.get('.input-amount');

        this.creditCardButton = this.container.get('#credit-card-payment + label.payment-title');
        this.paypalButton = this.container.get('#paypal + label.payment-title');
        this.registrationFeeContainer = this.container.get('.registration-fee');
        this.registrationFeeText = this.registrationFeeContainer.get('[class*="-xs-4"] > strong');
        this.registrationFeeDiscountTextContainer = this.registrationFeeContainer.get('.registration-discount');
        this.registrationFeeDiscountText = this.registrationFeeDiscountTextContainer.get('.registration-discount-amount');
        this.registrationFeePromoCodeContainer = this.registrationFeeContainer.get('.registration-promo-code');
        this.registrationFeePromoCode = this.registrationFeePromoCodeContainer.get('.promoCodeToApply');
        this.registrationFeePromoCodeApplyButton = this.registrationFeePromoCodeContainer.get('.btn-promoCodeApply');
        this.store = this.container.get('section.store');
        this.storePromoCode = this.store.get('#promoCode');
        this.storePromoCodeApplyButton = this.store.get('.btn-flow[key="m_btn_PromoCodeApply"]');
        this.total = this.store.get('div[aria-labelledby="store-items-total"]');
        this.storePromoCodeLabel = this.store.get('#store-promoCode-totalDiscount-title');

        this.cardInformationCO = new CardInformation();
    }

    donate(amount) {
        scrollToElement(this.donationAmount);
        enterText(this.donationAmount, amount);
        clickElement(this.donationContainer);
    }

    /**
     * Removes the amount from the donation textbox in the flow
     */
    clearDonation() {
        scrollToElement(this.donationAmount);
        enterText(this.donationAmount, ' ');
        clickElement(this.donationContainer);
    }

    buyItem(index) {
        scrollToElement(this.store);
        new Store(this.store).addItem(index);
    }

    /**
     * Removes a store item from the payment
     * @param storeItemIndex
     */
    removeStoreItem(storeItemIndex) {
        new Store(this.store).removeItem(storeItemIndex);
    }

    /**
     * Does an expect on the promo code label that shows up at the bottom on of the screen
     * when you apply a promo code.
     */
    verifyStorePromoCodeApplied() {
        this.storePromoCodeLabel.should('be.true')
        //expect(this.storePromoCodeLabel.isDisplayed).toBeTruthy();
    }

    verifyTotalAmount(amount) {
        new Store(this.store).total.should('have.text', amount)
        //expect(new Store(this.store).total.getText()).toContain(amount);
    }

    /**
     * Does an expect on the registration fee text
     * @param amount
     */
    verifyRegFeeAmount(amount) {
        this.registrationFeeText.should('have.text', amount)
        //expect(this.registrationFeeText.getText()).toContain(amount);
    }

    /**
     * Does an expect on the registration fee discount text
     * @param amount
     */
    verifyRegFeeDiscountAmount(amount) {
        if(isEmpty(amount)){
            this.registrationFeeDiscountText.should('not.exist')
            //expect(this.registrationFeeDiscountText.isPresent()).toBeFalsy();
        } else{
            this.registrationFeeDiscountText.should('have.text', amount)
            //expect(this.registrationFeeDiscountText.getText()).toBe(amount);
        }  
    }

    /**
     * Enters the amount into the registration fee promo textbox at the top of the page
     * @param code
     */
    enterRegFeePromoCode(code) {        
        enterText(this.registrationFeePromoCode, code);
        clickElement(this.registrationFeePromoCodeApplyButton);
        cy.wait(500);
    }

    enterStorePromoCode(code) {
        new Store(this.store).enterPromoCode(code);
    }

    verifyCreditCardIsDisplayed() {
        this.cardInformationCO.creditCardHolderName.should('be.visible')
        //expect(this.cardInformationCO.creditCardHolderName.isDisplayed()).toBeTruthy();
    }
    verifyPaymentFieldsPresent() {
        this.cardInformationCO.creditCardNumber.should('exist')
        this.cardInformationCO.creditCardHolderName.should('exist')
        this.cardInformationCO.creditCardExpiryMonth.should('exist')
        this.cardInformationCO.creditCardExpiryYear.should('exist')
    }

    enterCardDetails(card) {
        this.cardInformationCO.enterCardNumber(card.number);
        this.cardInformationCO.enterCardHolderName(card.cardHolderName);
        this.cardInformationCO.selectCardExpiryDate(card.expiryMonth, card.expiryYear);

        if (card.cvv) {
            this.cardInformationCO.enterCardCvv(card.cvv);
        }
    }

    // TODO: Not functional
    // verifyCardDetailsEntered(cardData) {
    //     expect(this.cardInformationCO.txtCardNumber.getAttribute('value')).toEqual(cardData.number);
    //     expect(this.cardInformationCO.txtCardHolderName.getAttribute('value')).toEqual(cardData.cardHolderName);
    //     expect(this.cardInformationCO.creditCardExpirationMonth.getAttribute('value')).toEqual(cardData.expiryMonth);
    //     expect(this.cardInformationCO.creditCardExpirationYear.getAttribute('value')).toEqual(cardData.expiryYear);

    //     if (cardData.cvv) {
    //         expect(this.cardInformationCO.creditCardCvv.getAttribute('value')).toEqual(cardData.cvv);
    //     }
    // }

    pressPaypalBtn() {
        this.paypalButton.click();
    }
}
