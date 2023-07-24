import { Sidebar } from '../../pc-ui-e2e/src/component/sidebar.component';
import { MyPage } from '../../pc-ui-e2e/src/page/my-page.page';
import { PageSetup } from '../../support/utils/pageSetup';
import { LoginPage } from '../../pc-ui-e2e/src/page/login.page';
import { getLocalDateTime, pressTab } from '../../support/utils/actions';
import * as specificData from '../../pc-ui-e2e/mock/data/edit-page/edit-my-page.json'

let loginPage: LoginPage = new LoginPage()
let sidebar: Sidebar = new Sidebar();
let myPagePO: MyPage = new MyPage();
let pageSetup: PageSetup = new PageSetup();

const using = require('jasmine-data-provider');

const data = pageSetup.getData('Pledge', specificData);
const events = pageSetup.getEvents(pageSetup.getEnvironment().multipledge, data.events);

describe('edit my page', () => {

  let title = data.title + getLocalDateTime()
  let url = data.url + getLocalDateTime()
  let goal = (Math.floor(Math.random() * 9000 + 1000)).toString();
  let story = 'Story Test ' + getLocalDateTime()


  using(events, event => {

    before(() => {
      pageSetup.cleanupPage()
      pageSetup.goToEvent(event);
      pageSetup.waitForPageLoad()
      loginPage.login(data.user.username, data.user.password)
    });


    it('should go to my page', () => {
      sidebar.clickMyPageLink();
      cy.get(myPagePO.container).should('be.visible');
      cy.get(myPagePO.header).should('contain.text','My Page');
    });

    it('should open edit panel and edit Title, Url, Goal and Story', () => {
      myPagePO.clickEditButton();
      cy.wait(2000)

      myPagePO.enterPageTitle(title);
      myPagePO.enterPageUrl(url);
      myPagePO.enterPageFundraisingGoal(goal);
      myPagePO.getKendoEditor().clear().type(story)

      myPagePO.clickSaveButton();
      cy.wait(3000)
    });    
    
    it('should test Tribute', ()=> {
      myPagePO.clickEditButton();
      cy.wait(2000)

      //Needs BLANK value implementation and validation message assertion
      myPagePO.populateFormField('#tributePageType', 'In-Memory', 'dropdown');
      cy.get('#tributePageType').should('contain.text', 'In-Memory')
      //Clears Tributee Input Values and Verify Error Messages
      cy.get('#tributeFirstName').clear()
      cy.get('#tributeLastName').clear()
      myPagePO.verifyTributeRequiredFieldErrors(data.tributeValidationMessages)

      // Fills Tributee and Verifies values
      cy.get('#tributeFirstName').type(data.tributeFirstName)
      cy.get('#tributeLastName').type(data.tributeLastName)
      myPagePO.clickSaveButton();
      cy.wait(3000)
      
      // cy.get('#tributeFirstName').invoke('text').should('have.text', data.tributeFirstName)
      // cy.get('#tributeLastName').invoke('text').should('have.text', data.tributeLastName)
    })

    it('Should test Fund', ()=>{
      function randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min)
      }

      let fund = 'Fund ' + randomIntFromInterval(11,20)

      myPagePO.clickEditButton();
      cy.wait(2000)
      myPagePO.populateFormField('#fundId', fund, 'dropdown');
      cy.get('#fundId').should('contain.text', fund)
      myPagePO.clickSaveButton();
      cy.wait(3000)
    })

    it('Should test Page End Date', ()=> {
      myPagePO.clickEditButton();
      cy.wait(2000)

      myPagePO.selectDate('.mat-datepicker-toggle')
      cy.wait(1000)
      //cy.get('.mat-datepicker-input').should('contain.text', data.date)
      myPagePO.clickSaveButton();
      cy.wait(3000)
    })

    it('Should test Widget Settings', ()=> {
      myPagePO.clickEditButton();
      cy.wait(2000)

      //Should select Hide Widget and Verify Preview
      
      myPagePO.selectWidgetSettings(data.thermometer.hideWidget)
      myPagePO.clickSaveButton();
      cy.wait(2500)
      myPagePO.verifyWidget("hide")      

      //Should select Goal Only and Verify Preview
      myPagePO.clickEditButton();
      cy.wait(2000)
      myPagePO.selectWidgetSettings(data.thermometer.goalOnly)
      myPagePO.clickSaveButton();
      myPagePO.verifyWidgetAttrGoal(data.thermometer.goalTitle)
      cy.reload()
      cy.wait(2000)

      //Should select Raised Only and Verify Preview
      myPagePO.clickEditButton();
      cy.wait(2000)
      myPagePO.selectWidgetSettings(data.thermometer.raisedOnly)
      myPagePO.clickSaveButton();
      myPagePO.verifyWidgetAttrRaised(data.thermometer.raisedTitle)
      cy.wait(3000)      

      //Should select Goal and Raised and Verify Preview
      myPagePO.clickEditButton();
      cy.wait(2000)
      myPagePO.selectWidgetSettings(data.thermometer.goalAndRaised)
      myPagePO.clickSaveButton();
      cy.wait(2500)
      myPagePO.verifyWidget(data.thermometer.goalAndRaisedTitle)

      cy.wait(3000)
    })
    

    it('should verify page preview is updated',  () => {
      myPagePO.verifyPreviewTitle(title)
      myPagePO.verifyPreviewGoal(goal)
      myPagePO.verifyPreviewStory(story)        
    });

    it('should click on View Live page and verify new URL', ()=> {
      cy.get('.external-page-bar .page-view').invoke('removeAttr', 'target').click()
      cy.url().should('include', url)
      pageSetup.clearSessionStorage()
    })

  })
});
