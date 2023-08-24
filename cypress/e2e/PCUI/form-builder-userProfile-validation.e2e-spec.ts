import { Sidebar } from '../../pc-ui-e2e/src/component/sidebar.component';
import { SnackbarCO } from '../../pc-ui-e2e/src/component/snackbar';
import { PageSetup } from "../../support/utils/pageSetup";
import { LoginPage } from '../../pc-ui-e2e/src/page/login.page'
import * as specificData from '../../pc-ui-e2e/mock/data/form-builder/form-builder-validation.json'
import { MainToolbar } from '../../pc-ui-e2e/src/component/main-toolbar';
import { UserProfile } from '../../pc-ui-e2e/src/component/user-profile';


let userProfile = new UserProfile()
let mainToolbar = new MainToolbar()
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

describe('User Profile Validation:', () => {
  using(events, event => {

    before(() => {
      pageSetup.goToEvent(event);
      pageSetup.waitForPageLoad()
      loginPage.login(data.user.username, data.user.password)
    });

     


    it('should go to User Profile', () => {
      mainToolbar.clickOnProfile();
    });


    it('should clear all Personal Information fields, validate the error messages, re-fill input fields and re-submit form', () => {
      userProfile.clearPersonalInformation()
      cy.wait(1500)
      userProfile.verifyPersonalInfoRequiredFieldErrors(data.personalInfoValidationMessages)
      userProfile.fillPersonalInformation(data)
      userProfile.clickPersonalInfoSubmit()
      snackbarCO.validateSnackBarMessage(data.personalInfoSnackMessage)
    });

    it('should clear all Additional Information fields, validate the error messages, re-fill input fields and re-submit form', () => {
      userProfile.clearAdditionalInformation()
      cy.wait(1500)
      userProfile.verifyAdditionalInfoRequiredFieldErrors(data.additionalInfoValidationMessages)
      userProfile.fillAdditionalInformation(data)
      userProfile.clickAdditionalInfoSubmit()
      //snackbarCO.validateSnackBarMessage(data.personalInfoSnackMessage)
    });
  })
});
