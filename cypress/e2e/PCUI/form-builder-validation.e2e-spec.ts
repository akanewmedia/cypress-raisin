import { Sidebar } from '../../pc-ui-e2e/src/component/sidebar.component';
import { SnackbarCO } from '../../pc-ui-e2e/src/component/snackbar';
import { pressEsc } from '../../pc-ui-e2e/src/utils/actions';
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
    

    it('should clear all input fields', () => {
        userProfile.clearInputFields()        
    });

    it('should verify all error messages', () =>{
        userProfile.verifyRequiredFieldErrors(data.requiredFieldsValidationMessages)
    })
    
    it('should go to Offline Donations and click on Add Donation', () =>{
        userProfile.verifyRequiredFieldErrors(data.requiredFieldsValidationMessages)
    })

  })
});
