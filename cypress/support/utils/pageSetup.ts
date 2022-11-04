import { assign, at, isNil } from 'lodash';
import * as fs from 'fs';
import { PledgeNavBarComponent } from '../components/pledgeNavbar.co';
import { PledgeV3LoginFormComponent } from '../components/pledgeV3LoginForm.co';
import { ShoppingCart } from '../components/shoppingCart.co';
import { TicketingNavBar } from '../components/ticketingNavbar.co';
import { elementByClass, wait } from './actions';
import { environments } from '../../environments/environments'
import * as basePledge from '../../data/Pledge/base.json'
import * as baseDonations from '../../data/Donations/base.json'
import * as baseTicketing from '../../data/Ticketing/base.json'


const basePageClass = '.base-page';

export class PageSetup {
  pledgeNavBar: PledgeNavBarComponent;
  ticketingNavBar: TicketingNavBar;
  shoppingCartCO: ShoppingCart;
  pledgeV3LoginCO: PledgeV3LoginFormComponent;
  currentEnvironment: any;
  
  constructor() {
    this.pledgeNavBar = new PledgeNavBarComponent();
    this.ticketingNavBar = new TicketingNavBar();
    this.shoppingCartCO = new ShoppingCart();
    this.pledgeV3LoginCO = new PledgeV3LoginFormComponent();
    
  }

  getData(eventType:string, eventData: any | null = null) {
    let baseData = {};
    
    if (eventType === 'Pledge') {
      baseData = basePledge;
    } else if (eventType === 'Ticketing') {
      baseData = baseTicketing;
    } else if (eventType === 'Donations') {
      baseData = baseDonations;
    } else {
      throw(new Error(`${eventType} not found`))
    }

    if (isNil(eventData)) {
      return baseData;
    }

    // import the fs module    cypress\data\Donations\base.json
    // const dataPath = `../../data/${eventType}`;
    // read the file into raw data

    // let eventData = cy.readFile(`${dataPath}/${eventDataFileName}.json`);

    // const eventData: any = await import(`${dataPath}/${eventDataFileName}.json`);
    // let eventData = cy.readFile(`${dataPath}/${eventDataFileName}.json`);
    return assign({}, baseData, eventData);
  }

  getEvents(events: any, indexes?: number[]) {
    return indexes ? at(events, indexes) : at(events, 0);
  }

  /**
     * Makes the browser go to a 'baseUrl/ui/url' event address in 'timeout' milliseconds
     * @param {string} url - the event url
     * @param {number} [timeout=3000] - the max time (in ms) the test will wait for the page to load
     */
   goToEvent(url) {  
    cy.visit(`${this.getEnvironment().baseUrl}/ui/${url}`, { timeout: 180000 })  
    cy.get('.site-header', {timeout : 180000}).should('exist')
  }

  getEnvironment() {
    this.setEnvironment()

    switch (this.currentEnvironment) {

      case 'AKA_INT':
        return environments.AKA_INT

      case 'AKA_DEV':
        return environments.AKA_DEV

      case 'AKA_QA':
        return environments.AKA_QA

      case 'AKA_QA2':
        return environments.AKA_QA2

      case 'AKA_UAT':
        return environments.AKA_UAT

      case 'AKA_REL':
        return environments.AKA_REL

      case 'AKA_PROD':
        return environments.AKA_PROD
    }
  }

  setEnvironment() {
    //let envFromOctopus = Cypress.env('environment')
    let envFromOctopus = 'AKA_INT'
    this.currentEnvironment = envFromOctopus;
  }

  /**
     * Makes the browser go to a 'baseUrl/url' address in 'timeout' milliseconds
     * @param {string} url - the event url
     * @param {number} [timeout=3000] - the max time (in ms) the test will wait for the page to load
     */
  // goToSite(url, timeout = 300000) {
  //   browser.waitForAngularEnabled(false);
  //   if (!browser.params.isMobile) {
  //     browser.manage().window().maximize();
  //   }
  //   browser.get(`${browser.params.baseUrl}/${url}`);
  //   waitForElement($(basePageClass), timeout);
  // }

  /**
     * Makes the browser go to an 'url' address in 'timeout' milliseconds
     * @param {string} url - the event url
     * @param {number} [timeout=3000] - the max time (in ms) the test will wait for the page to load
     */
  // goToUrl(url, timeout = 300000) {
  //   browser.waitForAngularEnabled(false);
  //   if (!browser.params.isMobile) {
  //     browser.manage().window().maximize();
  //   }
  //   browser.get(url);
  //   waitForElement($(basePageClass), timeout);
  // }

  logoutIfLoggedIn() {
    if(this.pledgeNavBar.isLoggedIn()){(isLoggedIn => {
      if (isLoggedIn) {
        this.pledgeNavBar.logout();
        return $(basePageClass);
      }
    })}
    // if(this.ticketingNavBar.isLoggedIn()){(isLoggedIn => {
    //   if (isLoggedIn) {
    //     this.ticketingNavBar.logout();
    //     return $(basePageClass);
    //   }
    // })};
    if(this.pledgeNavBar.isLoggedIn()){(isLoggedIn => {
      if (isLoggedIn) {
        this.pledgeNavBar.logout();
        return $(basePageClass);
      }
    })};
  }

  // startLogin() {
  //   this.pledgeNavBar.isLoggedOut().then(isLoggedOut => {
  //     if (isLoggedOut) {
  //       this.pledgeNavBar.login();
  //     }
  //   });
  //   this.ticketingNavBar.isLoggedOut().then(isLoggedOut => {
  //     if (isLoggedOut) {
  //       this.ticketingNavBar.clickOnLogin();
  //     }
  //   });
  //   this.pledgeNavBar.isLoggedOut().then(isLoggedOut => {
  //     if (isLoggedOut) {
  //       this.pledgeNavBar.login();
  //     }
  //   });
  // }

  // clearPaypalCookies() {
  //   this.goToUrl('https://sandbox.paypal.com');
  //   browser.manage().deleteAllCookies();
  // }

  // logoutOfFacebook() {
  //   this.startLogin();
  //   this.pledgeV3LoginCO.isLoggedInToFacebook().then(isLoggedIn => {
  //     if (isLoggedIn) {
  //       this.pledgeV3LoginCO.pressFacebookLogoutBtn();
  //     }
  //   });
  // }

  clearCart() {
    this.ticketingNavBar.openCart()
    this.shoppingCartCO.clearCart()
  }

  cleanupPage() {    
    cy.window().then((win) => {
      win.sessionStorage.clear()
    })
    cy.clearLocalStorage()
    cy.wait(1000)
  }

  // /**
  //  * Pass true to allow your tests to work on external sites (eg. V3 login, paypal, masterpass)
  //  * @param value
  //  */
  // setIsExternal(value) {
  //   //browser.waitForAngularEnabled(!value);
  //   browser.ignoreSynchronization = value;
  // }

  // /**
  //  * Pass the name of the window to switch to, or pass empty string to switch back to the main window
  //  * @param windowName
  //  */
  // setWindow(windowName) {
  //   browser.switchTo().window(windowName);
  // }

  // closePopups() {
  //   return browser.getAllWindowHandles().then(handles => {
  //     for (let index = handles.length - 1; index > 0; index--) {
  //       browser.switchTo().window(handles[index]);
  //       browser.close();
  //     }
  //     browser.switchTo().window(handles[0]);
  //   });
  // }

  // /**
  //  * Switches focus to the first popup window
  //  */
  // switchToFirstPopup() {
  //   return browser.getAllWindowHandles().then(handles => {
  //     browser.switchTo().window(handles[1]);
  //   });
  // }
}
