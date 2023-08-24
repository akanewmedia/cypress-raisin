import { Sidebar } from '../../pc-ui-e2e/src/component/sidebar.component';
import { DonationsHistoryTable } from '../../pc-ui-e2e/src/component/donations-history-table';
import { SnackbarCO } from '../../pc-ui-e2e/src/component/snackbar';
import { PageSetup } from '../../support/utils/pageSetup';
import { LoginPage } from '../../pc-ui-e2e/src/page/login.page';
import * as specificData from '../../pc-ui-e2e/mock/data/edit-page/edit-my-page.json'

let sidebar: Sidebar = new Sidebar();
let historyTable: DonationsHistoryTable = new DonationsHistoryTable();
let snackbarCO: SnackbarCO = new SnackbarCO();
let pageSetup: PageSetup = new PageSetup();
let loginPage: LoginPage = new LoginPage()

const using = require('jasmine-data-provider');

const data = pageSetup.getData('Pledge', specificData);
const events = pageSetup.getEvents(pageSetup.getEnvironment().multipledge, data.events);


// TODO: This test needs to be updated when the search, resend tax receipt, and view message functionalities are added
describe('PC >Log in > Donation History > Sort Thanked > Search for Donor > Validate Amount > Validate Date ' + '> Resend Tax Receipt > View Message', () => {
  using(events, event => {

    before(() => {
      pageSetup.cleanupPage()
      pageSetup.goToEvent(event);
      pageSetup.waitForPageLoad()
      loginPage.login(data.user.username, data.user.password)
    });

    it('go to donations history page', () => {
      sidebar.clickDonationsLink();
      historyTable.verifyNameAndEmailFirstRow('Bobby Smith')
      historyTable.verifyNameAndEmailFirstRow('aka@aka.com')
      historyTable.verifyAmountFirstRow('150.00')
      historyTable.verifyDateFirstRow('Aug 21, 2018')
    });

    it('should sort by thanked', () => {
      historyTable.sortByThanked();
      historyTable.sortByThanked();
      historyTable.verifyNameAndEmailFirstRow('Diane Klich')
      historyTable.verifyNameAndEmailFirstRow('diane@akanewmedia.com')
      historyTable.verifyAmountFirstRow('150.00')
      historyTable.verifyDateFirstRow('Jul 26, 2018')
    });

    it('should generate Tax Receipt', () => {
      historyTable.sortByReceiptIssued()
      historyTable.isRowReissueTaxReceiptButtonVisible()
      historyTable.clickReissueTaxReceiptButton();
      snackbarCO.validateSnackBarMessage('Receipt reissued.');
    });

    it('should click team donations and sort by amount', () => {
      historyTable.clickTeamDonationsButton();
      historyTable.sortByAmount();
      historyTable.verifyNameAndEmailFirstRow('Victor Volunteer')
      historyTable.verifyNameAndEmailFirstRow('victordalt@hotmail.com')
      historyTable.verifyAmountFirstRow('100.00')
      historyTable.verifyDateFirstRow('Aug 18, 2023')
    });

    //THERE IS AN ISSUE IN PROD RIGHT NOW THAT PREVENTS THIS SCENARIO FROM WORKING #DEV-2388
    // it('should generate Tax Receipt', () => {
    //   historyTable.sortByReceiptIssued()
    //   historyTable.isRowReissueTaxReceiptButtonVisible()
    //   historyTable.clickReissueTaxReceiptButton();
    //   snackbarCO.validateSnackBarMessage('Receipt reissued.');
    // });

    it('should select event drop down for rxfmptest and sort by amount', () => {
      historyTable.clickMyDonationsButton();
      historyTable.selectEvent(' RXF Multi Pledge Automation Event ');
      historyTable.sortByAmount();
      historyTable.verifyNameAndEmailFirstRow('Raisin Tester')
      historyTable.verifyNameAndEmailFirstRow('aka@aka.com')
      historyTable.verifyAmountFirstRow('50.00')
      historyTable.verifyDateFirstRow('Aug 18, 2023')
    });
  });
});
