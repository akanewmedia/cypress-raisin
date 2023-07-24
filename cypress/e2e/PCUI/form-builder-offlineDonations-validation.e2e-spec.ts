import { Sidebar } from '../../pc-ui-e2e/src/component/sidebar.component';
import { SnackbarCO } from '../../pc-ui-e2e/src/component/snackbar';
import { PageSetup } from "../../support/utils/pageSetup";
import { LoginPage } from '../../pc-ui-e2e/src/page/login.page'
import { MainToolbar } from '../../pc-ui-e2e/src/component/main-toolbar';
import { UserProfile } from '../../pc-ui-e2e/src/component/user-profile';
import { OfflineDonationsComponent } from '../../pc-ui-e2e/src/component/offline-donations-component';
import * as specificData from '../../pc-ui-e2e/mock/data/form-builder/form-builder-validation.json'


let userProfile = new UserProfile()
let mainToolbar = new MainToolbar()
let donationsComponent = new OfflineDonationsComponent()
let loginPage: LoginPage;
let sidebar: Sidebar;
let snackbarCO: SnackbarCO;

loginPage = new LoginPage();
sidebar = new Sidebar();
snackbarCO = new SnackbarCO();

const using = require('jasmine-data-provider');
let pageSetup: PageSetup = new PageSetup();

const data = pageSetup.getData('Pledge', specificData);
const events = pageSetup.getEvents(pageSetup.getEnvironment().multipledge, data.events);

describe('Offline Donations Validation:', () => {
  using(events, event => {

    before(() => {
      pageSetup.goToEvent(event);
      pageSetup.waitForPageLoad()
      loginPage.login(data.user.username, data.user.password)
    });

    after(()=>{
      pageSetup.cleanupPage()
    })


    it('should go to Offline Donations and add offline donation', () => {
      sidebar.clickDonationsLink();
      sidebar.clickOfflineDonationsLink();
      donationsComponent.clickAddDonation()
      cy.wait(3000)      
    });

    it('should submit form, validate the error messages, re-fill input fields and re-submit form', () => {
      donationsComponent.clickSubmitAddDonation()
      cy.wait(3000)
      donationsComponent.verifyOfflineDonationRequiredFieldErrors(data.offlineDonationValidationMessages)
      donationsComponent.populateAddDonationDialogForm(data)
      donationsComponent.clickSubmitAddDonation()
      snackbarCO.validateSnackBarMessage(data.offlineDonationSnackMessage)
    });
  })
});
