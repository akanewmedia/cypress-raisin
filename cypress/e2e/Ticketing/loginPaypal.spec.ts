import { PayPal } from "../../support/pages/External/Paypal/PayPal";
import { PageSetup } from "../../support/utils/pageSetup";
import { TicketingNavBar } from "../../support/components/ticketingNavbar.co";
import { DonateNowPage } from "../../support/pages/Ticketing/DonateNowPage";
import { YourInformationPage } from "../../support/pages/Ticketing/YourInformationPage";
import { FlowPage } from "../../support/pages/flow";
import { PaymentPage } from "../../support/pages/Ticketing/PaymentPage";




const paypalPO = new PayPal();
const ticketingNavbarCO = new TicketingNavBar()
const donateNowPO = new DonateNowPage();
let pageSetup: PageSetup = new PageSetup();
const yourInformationPO = new YourInformationPage();
const flowPO = new FlowPage();
const paymentPO = new PaymentPage();

const data = pageSetup.getData('Ticketing');


describe('Should go to PayPal and login', () => {
    before(() => {
        cy.visit('https://org359.uat.akaraisin.com/ui/txate')
        pageSetup.waitForPageLoad()
        pageSetup.cleanupPage()
      });

    it('Should Click on Donate and enter donation amount', ()=>{
        ticketingNavbarCO.clickOnDonate(); //clicks the Donate button
        donateNowPO.verifyDonationText("Donation"); //waits the donation page to be loaded
        donateNowPO.donate("10.00");  //fills txtDonationAmount with an amount
        donateNowPO.clickAddAndCheckout(); //clicks the Add and Checkout button 
    })
    
    it('Enter the participant details', () => {
        yourInformationPO.fillInMandatoryFields(data); //fills the mandatory fields (Personal and Address Information)
        flowPO.continue(); //clicks the continue button
        paymentPO.verifyPaymentFieldsPresent(); //checks next page loaded
      });

    it('Should click on PayPal and Login', ()=>{
        paymentPO.clickPayPalButton();
        flowPO.continue();
        cy.wait(5000)        
        cy.url().should('include', 'www.sandbox.paypal.com')
        paypalPO.loginAndPay(data);
    })

});