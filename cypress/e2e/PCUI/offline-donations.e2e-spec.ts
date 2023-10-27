import { Sidebar } from '../../pc-ui-e2e/src/component/sidebar.component';
import { OfflineDonationsComponent } from '../../pc-ui-e2e/src/component/offline-donations-component';
import { SnackbarCO } from '../../pc-ui-e2e/src/component/snackbar';
import { PageSetup } from '../../support/utils/pageSetup';
import { LoginPage } from '../../pc-ui-e2e/src/page/login.page';
import * as specificData from '../../pc-ui-e2e/mock/data/form-builder/form-builder-validation.json'

  let loginPage: LoginPage;
  let sidebar: Sidebar;
  let donationsComponent: OfflineDonationsComponent;
  let snackbarCO: SnackbarCO;
  let pageSetup: PageSetup = new PageSetup();
  
  sidebar = new Sidebar();
  donationsComponent = new OfflineDonationsComponent();
  snackbarCO = new SnackbarCO();
  loginPage = new LoginPage()

  const using = require('jasmine-data-provider');

  const data = pageSetup.getData('Pledge', specificData);
  const events = pageSetup.getEvents(pageSetup.getEnvironment().multipledge, data.events);


describe(
  'Offline Donations',
  () => {    
    using(events, event => {

    before(() => {
      pageSetup.goToEvent(event);
      pageSetup.waitForPageLoad()
      loginPage.login(data.user.username, data.user.password)
    }); 
    
     

    it('should go to offline donations page and display offline donation items', () => {
      // go to offline donations page
      sidebar.clickDonationsLink();
      sidebar.clickOfflineDonationsLink();

      cy.get(donationsComponent.rows).should('be.visible')

      //let row = cy.get(donationsComponent.rows).eq(0);
      donationsComponent.getRowNameValue('Raisin Tester')
      donationsComponent.getRowNameValue('aka@aka.com')
      donationsComponent.getRowAmountValue('$20.00')
    });

    it('should create offline donation', () => {

      // trigger add donation dialog
      cy.contains(donationsComponent.addDonationButton, 'Add donation').should('be.visible')
      cy.contains(donationsComponent.addDonationButton, 'Add donation').click();

      // wait for add donation dialog to open
      cy.get(donationsComponent.addDonationDialog).should('be.visible')

      // populate add donation dialog form
      donationsComponent.populateAddDonationDialogForm(data);

      // submit form
      donationsComponent.clickSubmitAddDonation();

      // check success message displayed
      cy.get(snackbarCO.messageContainer).should('contain.text','New offline donation created');

      //Verify first Donor details again
      donationsComponent.getRowNameValue('Raisin Tester')
      donationsComponent.getRowNameValue('aka@aka.com')
      donationsComponent.getRowAmountValue('$20.00')
    });

    it('should update offline donation', () => {

      // trigger update
      donationsComponent.clickRowUpdateButton();

      // wait for update donation dialog to open (same dialog used as for create)
      cy.get(donationsComponent.addDonationDialog).should('be.visible')
      // populate update donation dialog form
      donationsComponent.populateAddDonationDialogForm(data);
      // submit form
      donationsComponent.clickUpdateDonation();
      // check success message displayed
      cy.get(snackbarCO.messageContainer).should('contain.text', 'Offline donation updated')
    });

    it('should delete offline donation',  () => {

      // trigger delete
      donationsComponent.clickRowDeleteButton();

      // wait for delete donation dialog to open
      cy.get(donationsComponent.confirmationDialog).should('exist')

      // confirm delete
      donationsComponent.submitConfirmationDialog();

      // check success message displayed
      cy.get(snackbarCO.messageContainer).should('contain.text', 'Offline donation deleted')

    });
  })
  }
)

describe('Offline Donations with NON US/CANADA',  () => {    
    using(events, event => {

    before(() => {
      pageSetup.goToEvent(event);
      pageSetup.waitForPageLoad()
      loginPage.login(data.user.username, data.user.password)
    }); 

    let nonUs: boolean = true
    
     

    it('should go to offline donations page and display offline donation items', () => {
      // go to offline donations page
      sidebar.clickDonationsLink();
      sidebar.clickOfflineDonationsLink();

      cy.get(donationsComponent.rows).should('be.visible')

      //let row = cy.get(donationsComponent.rows).eq(0);
      donationsComponent.getRowNameValue('Raisin Tester')
      donationsComponent.getRowNameValue('aka@aka.com')
      donationsComponent.getRowAmountValue('$20.00')
    });

    it('should create offline donation', () => {

      // trigger add donation dialog
      cy.contains(donationsComponent.addDonationButton, 'Add donation').should('be.visible')
      cy.contains(donationsComponent.addDonationButton, 'Add donation').click();

      // wait for add donation dialog to open
      cy.get(donationsComponent.addDonationDialog).should('be.visible')

      // populate add donation dialog form
      donationsComponent.populateAddDonationDialogForm(data, nonUs);

      // submit form
      donationsComponent.clickSubmitAddDonation();

      // check success message displayed
      cy.get(snackbarCO.messageContainer).should('contain.text','New offline donation created');

      //Verify first Donor details again
      donationsComponent.getRowNameValue('Raisin Tester')
      donationsComponent.getRowNameValue('aka@aka.com')
      donationsComponent.getRowAmountValue('$20.00')
    });

    it('should update offline donation', () => {

      // trigger update
      donationsComponent.clickRowUpdateButton();

      // wait for update donation dialog to open (same dialog used as for create)
      cy.get(donationsComponent.addDonationDialog).should('be.visible')
      // populate update donation dialog form
      data.countryNonUS = "Viet Nam"
      donationsComponent.populateAddDonationDialogForm(data, nonUs);
      // submit form
      donationsComponent.clickUpdateDonation();
      // check success message displayed
      cy.get(snackbarCO.messageContainer).should('contain.text', 'Offline donation updated')
    });

    it('should delete offline donation',  () => {

      // trigger delete
      donationsComponent.clickRowDeleteButton();

      // wait for delete donation dialog to open
      cy.get(donationsComponent.confirmationDialog).should('exist')

      // confirm delete
      donationsComponent.submitConfirmationDialog();

      // check success message displayed
      cy.get(snackbarCO.messageContainer).should('contain.text', 'Offline donation deleted')

    });
  })
  }
)
