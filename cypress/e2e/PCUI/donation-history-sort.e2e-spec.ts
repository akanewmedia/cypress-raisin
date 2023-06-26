import { Sidebar } from '../../pc-ui-e2e/src/component/sidebar.component';
import { DonationsHistoryTable } from '../../pc-ui-e2e/src/component/donations-history-table';
import { SnackbarCO } from '../../pc-ui-e2e/src/component/snackbar';
import { userLogin } from '../../pc-ui-e2e/src/utils/actions';
import { browser } from 'protractor';
// TODO: This test needs to be updated when the search, resend tax receipt, and view message functionalities are added
describe(
  'PC >Log in > Donation History > Sort Thanked > Search for Donor > Validate Amount > Validate Date ' +
  '> Resend Tax Receipt > View Message',
  () => {
    let sidebar: Sidebar;
    let historyTable: DonationsHistoryTable;
    let snackbarCO: SnackbarCO;

    beforeEach(() => {
      sidebar = new Sidebar();
      historyTable = new DonationsHistoryTable();
      snackbarCO = new SnackbarCO();
    });

    it('should log in', () => {
      userLogin('tcHistory');
    });

    it('go to donations history page', () => {
      sidebar.clickDonationsLink();
      const donations = historyTable.getDonations();
      expect(historyTable.getRowNameValue(donations.get(0))).toContain(
        'John Jameson'
      );
      expect(historyTable.getRowNameValue(donations.get(0))).toContain(
        'jj@loremipsum.com'
      );
      expect(historyTable.getRowAmountValue(donations.get(0))).toEqual(
        '$20.25'
      );
    });

    it('should sort by thanked', () => {
      historyTable.sortByThanked();
      const donations = historyTable.getDonations();
      expect(historyTable.getRowNameValue(donations.get(0))).toContain(
        'Emily Etheridge'
      );
      expect(historyTable.getRowNameValue(donations.get(0))).toContain(
        'ee@loremipsum.com'
      );
      expect(historyTable.getRowAmountValue(donations.get(0))).toEqual(
        '$20.25'
      );
    });

    it('should generate Tax Receipt', () => {
      const row = historyTable.rows.get(0);
      expect(
        historyTable.isRowReissueTaxReceiptButtonVisible(row)
      ).toBeTruthy();
      historyTable.clickReissueTaxReceiptButton(row);
      expect(historyTable.isRowReissueTaxReceiptButtonPresent(row)).toBeFalsy();
      expect(snackbarCO.messageContainer.getText()).toContain(
        'Receipt reissued.'
      );
    });

    it('should not generate Tax Receipt', () => {
      const donations = historyTable.getDonations();
      historyTable.clickReissueTaxReceiptButton(donations.get(1));
    });

    it('should click team donations and sort by amount', () => {
      historyTable.clickTeamDonationsButton();
      historyTable.sortByAmount();
      const donations = historyTable.getDonations();
      expect(historyTable.getRowNameValue(donations.get(0))).toContain(
        'Amy Anderson'
      );
      expect(historyTable.getRowNameValue(donations.get(0))).toContain(
        'aa@loremipsum.com'
      );
      expect(historyTable.getRowAmountValue(donations.get(0))).toEqual(
        '$10.25'
      );
      historyTable.sortByAmount();
      expect(historyTable.getRowNameValue(donations.get(0))).toContain(
        'Cris Cristoff'
      );
      expect(historyTable.getRowNameValue(donations.get(0))).toContain(
        'cc@loremipsum.com'
      );
      expect(historyTable.getRowAmountValue(donations.get(0))).toEqual(
        '$50.25'
      );
    });

    it('should generate Tax Receipt', () => {
      const donations = historyTable.getDonations();
      historyTable.clickReissueTaxReceiptButton(donations.get(0));
    });

    it('should select event drop down for rxfmptest and sort by amount', () => {
      historyTable.clickMyDonationsButton();
      historyTable.selectEvent('rxfmptest');
      const donations = historyTable.getDonations();

      historyTable.sortByAmount();
      historyTable.sortByAmount(); // asc
      expect(historyTable.getRowNameValue(donations.get(0))).toContain(
        '20203 user Anderson'
      );
      expect(historyTable.getRowNameValue(donations.get(0))).toContain(
        'aa@loremipsum.com'
      );
      expect(historyTable.getRowAmountValue(donations.get(0))).toEqual(
        '$5.15'
      );

      historyTable.sortByAmount(); // desc
      expect(historyTable.getRowNameValue(donations.get(0))).toContain(
        '20203 user Davies'
      );
      expect(historyTable.getRowNameValue(donations.get(0))).toContain(
        'dd@loremipsum.com'
      );
      expect(historyTable.getRowAmountValue(donations.get(0))).toEqual(
        '$11.25'
      );
    });

    it('should select event drop down for copiedeventgrptest and sort by amount', () => {
      historyTable.clickMyDonationsButton();
      historyTable.selectEvent('copiedeventgrptest');
      const donations = historyTable.getDonations();

      historyTable.sortByAmount();
      historyTable.sortByAmount(); // asc
      expect(historyTable.getRowNameValue(donations.get(0))).toContain(
        '20234 user Bryne'
      );
      expect(historyTable.getRowNameValue(donations.get(0))).toContain(
        'bb@loremipsum.com'
      );
      expect(historyTable.getRowAmountValue(donations.get(0))).toEqual(
        '$29.25'
      );

      historyTable.sortByAmount(); // desc
      expect(historyTable.getRowNameValue(donations.get(0))).toContain(
        '20234 user Anderson'
      );
      expect(historyTable.getRowNameValue(donations.get(0))).toContain(
        'aa@loremipsum.com'
      );
      expect(historyTable.getRowAmountValue(donations.get(0))).toEqual(
        '$99.25'
      );
    });
  }
);
