import { PledgeNavBarComponent } from '../../../support/components/pledgeNavBar.co';
import { Donation } from '../../../support/components/donation.co';
import { FlowPage } from '../../../support/pages/flow';
import { DonationSearchPage } from '../../../support/pages/Pledge/donationSearch';
import { PaymentPage } from '../../../support/pages/Pledge/payment';
import { RegisterPage } from '../../../support/pages/Pledge/register';
import { ThankYouPage } from '../../../support/pages/Pledge/ThankYouPage';
import { ReviewPage } from '../../../support/pages/Ticketing/ReviewPage';
import { PageSetup } from '../../../support/utils/pageSetup';
import * as specificData from '../../../data/Pledge/MultiPledgeDonationToEvent.json'


describe('TR(656) Scenario -> Multi Pledge donation to event : ', () => {
  const using = require('jasmine-data-provider'); 

  const pageSetup = new PageSetup();

  const data = pageSetup.getData('Pledge', specificData);
  const events = pageSetup.getEvents(pageSetup.getEnvironment().multipledge, data.events);

  using(events, event => {
  context('Donate to Event', () => {   
    
    const donationCO = new Donation();
    const navbarCO = new PledgeNavBarComponent();
    const registerPO = new RegisterPage();
    const paymentPO = new PaymentPage();
    const reviewPO = new ReviewPage();
    const thankYouPO = new ThankYouPage();
    const flowPO = new FlowPage();
    const donationSearchPO = new DonationSearchPage();

    before(() => {
      pageSetup.goToEvent(event);
      pageSetup.waitForPageLoad()
      //pageSetup.logoutIfLoggedIn();
    });    

    it('Should goto to the sponsor page', () => {
      navbarCO.donate();
    });

    it('Should click on a donation to the event', () => {
      //const data = pageSetup.getData('Pledge', 'MultiPledgeDonationToEvent');
      donationSearchPO.clickEventTab();
      donationCO.setEventDonationAmount(data.donationAmount);
      cy.get(donationCO.eventDonationContinueBtn).should('be.visible')
      donationCO.pressEventDonationContinueBtn();
    });
    
    it('should enter the participant details', () => {
      registerPO.fillInProfileAndAddressInformation(data);
      cy.get(registerPO.container).should('be.visible')
    });

    it('should verify and enter the credit card information', () => {
      flowPO.continue();
      cy.wait(2000)
      paymentPO.verifyPaymentFieldsPresent();
      paymentPO.verifyCreditCardIsDisplayed();
      paymentPO.enterCardDetails(data.card);
    });

    it('Should verify the profile and payment info on the review page', () => {
      flowPO.continue();
      reviewPO.verifyProfileInformation(data);
      reviewPO.verifyPaymentInformation(data.card);
    });
    it('should verify the Transaction code', () => {
      flowPO.continue();      
      thankYouPO.verifyTransactionNumber(data);
    });
  });
})
});

