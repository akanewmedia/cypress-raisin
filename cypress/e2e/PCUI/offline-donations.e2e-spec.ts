import { Sidebar } from '../../pc-ui-e2e/src/component/sidebar.component';
import { OfflineDonationsComponent } from '../../pc-ui-e2e/src/component/offline-donations-component';
import { SnackbarCO } from '../../pc-ui-e2e/src/component/snackbar';
import { userLogin, waitForElement } from '../../pc-ui-e2e/src/utils/actions';

describe(
  'Offline Donations',
  () => {
    let sidebar: Sidebar;
    let donationsComponent: OfflineDonationsComponent;
    let snackbarCO: SnackbarCO;

    beforeEach(() => {
      sidebar = new Sidebar();
      donationsComponent = new OfflineDonationsComponent();
      snackbarCO = new SnackbarCO();
    });

    it('should log in', () => {
      userLogin('tcHistory');
    });

    it('should go to offline donations page and display offline donation items', async () => {
      // go to offline donations page
      await sidebar.clickDonationsLink();
      await sidebar.clickOfflineDonationsLink();

      // check expected values match values found in
      // apps\mock-server\src\assets\data\donations\offlineDonationsRead.json

      expect(donationsComponent.rows).toBeDefined();
      expect(donationsComponent.rows.count()).toBe(2);

      // first row
      let row = donationsComponent.rows.get(0);
      expect(donationsComponent.getRowNameValue(row)).toContain(
        'Darren Daniels'
      );
      expect(donationsComponent.getRowNameValue(row)).toContain(
        'darren.daniels@example.com'
      );
      expect(donationsComponent.getRowAmountValue(row)).toEqual(
        '$45.00'
      );

      // second row
      row = row = donationsComponent.rows.get(1);
      expect(donationsComponent.getRowNameValue(row)).toContain(
        'Emer Elliot'
      );
      expect(donationsComponent.getRowNameValue(row)).toContain(
        'emer.elliot@example.com'
      );
      expect(donationsComponent.getRowAmountValue(row)).toEqual(
        '$50.00'
      );
    });

    it('should create offline donation', async () => {

      // trigger add donation dialog
      expect(donationsComponent.addDonationButton.isPresent()).toBeTruthy();
      await donationsComponent.addDonationButton.click();

      // wait for add donation dialog to open
      await donationsComponent.waitForAddDonationDialogElement();
      expect(donationsComponent.addDonationDialog.isPresent()).toBeTruthy();

      // populate add donation dialog form
      await donationsComponent.populateAddDonationDialogForm(
        {
          amount: '100',
          paymentSource: 'Cash',
          firstName: 'Sebastjan',
          lastName: 'Stamatov',
          email: 'sstamatov@example.com',
          phone: '905-555-5555',
          country: 'Canada',
          addressLine1: '1 Hurontario st.',
          city: 'Mississauga',
          province: 'Ontario',
          postalCode: 'L0L0L0'
        });

      // submit form
      await donationsComponent.submitAddDonationDialog();

      // check success message displayed
      await waitForElement(snackbarCO.messageContainer, 30000);
      expect(snackbarCO.messageContainer.getText()).toContain(
        'New offline donation created'
      );
    });

    it('should update offline donation', async () => {

      await expect(donationsComponent.rows).toBeDefined();
      await expect(donationsComponent.rows.count()).toBeGreaterThan(0);

      const row = donationsComponent.rows.get(0);

      // trigger update
      await donationsComponent.clickRowUpdateButton(row);

      // wait for update donation dialog to open (same dialog used as for create)
      await donationsComponent.waitForAddDonationDialogElement();
      await expect(donationsComponent.addDonationDialog.isPresent()).toBeTruthy();
      // populate update donation dialog form
      await donationsComponent.populateAddDonationDialogForm(
        {
          amount: '150',
          paymentSource: 'Cash',
          firstName: 'Roger',
          lastName: 'Romero',
          email: 'roger.romero@example.com',
          phone: '647-555-5557',
          country: 'Canada',
          addressLine1: '1 Hurontario st.',
          city: 'Mississauga',
          province: 'Ontario',
          postalCode: 'L0L0L0'
        });

      // submit form
      await donationsComponent.submitAddDonationDialog();
      // check success message displayed
      await waitForElement(snackbarCO.messageContainer, 30000);
      await expect(snackbarCO.messageContainer.getText()).toContain(
        'Offline donation updated'
      );
    });

    it('should delete offline donation', async () => {

      await expect(donationsComponent.rows).toBeDefined();
      const donationsBeforeDelete: number = await donationsComponent.rows.count();
      await expect(donationsBeforeDelete).toBeGreaterThan(0);

      const row = donationsComponent.rows.get(0);

      // trigger delete
      await donationsComponent.clickRowDeleteButton(row);

      // wait for delete donation dialog to open
      await donationsComponent.waitForConfirmationDialogElement();
      await expect(donationsComponent.confirmationDialog.isPresent()).toBeTruthy();

      // confirm delete
      await donationsComponent.submitConfirmationDialog();

      // check success message displayed
      await waitForElement(snackbarCO.messageContainer, 30000);
      await expect(snackbarCO.messageContainer.getText()).toContain(
        'Offline donation deleted'
      );

      // check number of rows is smaller after delete
      const donationsAfterDelete: number = await donationsComponent.rows.count();
      await expect(donationsBeforeDelete).toBeGreaterThan(donationsAfterDelete);
    });
  }
);
