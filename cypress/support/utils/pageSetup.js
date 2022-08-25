import { assign, at } from "lodash";
//import { browser, $, ExpectedConditions, element, by } from "protractor";
import { PledgeNavBarComponent } from "../components/pledgeNavbar.co";
import { PledgeV3LoginFormComponent } from "../components/pledgeV3LoginForm.co";
import { ShoppingCart } from "../components/shoppingCart.co";
import { TicketingNavBar } from "../components/ticketingNavbar.co";
import { elementByClass, wait, waitForElement } from "./actions";



const basePageClass = '.base-page';

export class PageSetup {
  
  constructor() {
    this.pledgeNavBar = new PledgeNavBarComponent();
    this.ticketingNavBar = new TicketingNavBar();
    this.shoppingCartCO = new ShoppingCart();
    this.pledgeV3LoginCO = new PledgeV3LoginFormComponent();
  }

  getData(eventType, eventDataFileName) {
    // import the fs module
    const fs = require('fs');
    const dataPath = fs.realpathSync(`./apps/raisin-ui-e2e/data/${eventType}`);
    // read the file into raw data
    let baseData = JSON.parse(fs.readFileSync(`${dataPath}/base.json`));
    let eventData = JSON.parse(fs.readFileSync(`${dataPath}/${eventDataFileName}.json`));
    return assign({}, baseData, eventData);
  }

  getEvents(events, indexes) {
    return indexes ? at(events, indexes) : at(events, 0);
  }

  /**
     * Makes the browser go to a 'baseUrl/ui/url' event address in 'timeout' milliseconds
     * @param {string} url - the event url
     * @param {number} [timeout=3000] - the max time (in ms) the test will wait for the page to load
     */
  goToEvent(url) {
    cy.visit(url);


    // browser.waitForAngularEnabled(false);
    // if (!browser.params.isMobile) {
    //   browser.manage().window().maximize();
    // }
    // browser.get(`${browser.params.baseUrl}/ui/${url}`)
    // // console.log(`test url: ${browser.params.baseUrl}/ui/${url}`);
    // waitForElement(elementByClass(basePageClass), timeout);
  }



  /**
     * Makes the browser go to a 'baseUrl/url' address in 'timeout' milliseconds
     * @param {string} url - the event url
     * @param {number} [timeout=3000] - the max time (in ms) the test will wait for the page to load
     */
  goToSite(url, timeout = 300000) {
    browser.waitForAngularEnabled(false);
    if (!browser.params.isMobile) {
      browser.manage().window().maximize();
    }
    browser.get(`${browser.params.baseUrl}/${url}`);
    waitForElement($(basePageClass), timeout);
  }

  /**
     * Makes the browser go to an 'url' address in 'timeout' milliseconds
     * @param {string} url - the event url
     * @param {number} [timeout=3000] - the max time (in ms) the test will wait for the page to load
     */
  goToUrl(url, timeout = 300000) {
    browser.waitForAngularEnabled(false);
    if (!browser.params.isMobile) {
      browser.manage().window().maximize();
    }
    browser.get(url);
    waitForElement($(basePageClass), timeout);
  }

  logoutIfLoggedIn() {
    this.pledgeNavBar.isLoggedIn().then(isLoggedIn => {
      if (isLoggedIn) {
        this.pledgeNavBar.logout();
        return waitForElement($(basePageClass));
      }
    });
    this.ticketingNavBar.isLoggedIn().then(isLoggedIn => {
      if (isLoggedIn) {
        this.ticketingNavBar.logout();
        return waitForElement($(basePageClass));
      }
    });
    this.pledgeNavBar.isLoggedIn().then(isLoggedIn => {
      if (isLoggedIn) {
        this.pledgeNavBar.logout();
        return waitForElement($(basePageClass));
      }
    });
  }

  startLogin() {
    this.pledgeNavBar.isLoggedOut().then(isLoggedOut => {
      if (isLoggedOut) {
        this.pledgeNavBar.login();
      }
    });
    this.ticketingNavBar.isLoggedOut().then(isLoggedOut => {
      if (isLoggedOut) {
        this.ticketingNavBar.clickOnLogin();
      }
    });
    this.pledgeNavBar.isLoggedOut().then(isLoggedOut => {
      if (isLoggedOut) {
        this.pledgeNavBar.login();
      }
    });
  }

  clearPaypalCookies() {
    this.goToUrl('https://sandbox.paypal.com');
    browser.manage().deleteAllCookies();
  }

  logoutOfFacebook() {
    this.startLogin();
    this.pledgeV3LoginCO.isLoggedInToFacebook().then(isLoggedIn => {
      if (isLoggedIn) {
        this.pledgeV3LoginCO.pressFacebookLogoutBtn();
      }
    });
  }

  clearCart() {
    this.ticketingNavBar.openCart();
    this.shoppingCartCO.clearCart();
  }

  cleanupPage() {
    // browser.ignoreSynchronization = false;
    browser.executeScript('window.sessionStorage.clear();');
    browser.executeScript('window.localStorage.clear();');
    browser.sleep(1000);
  }

  /**
   * Pass true to allow your tests to work on external sites (eg. V3 login, paypal, masterpass)
   * @param value
   */
  setIsExternal(value) {
    //browser.waitForAngularEnabled(!value);
    browser.ignoreSynchronization = value;
  }

  /**
   * Pass the name of the window to switch to, or pass empty string to switch back to the main window
   * @param windowName
   */
  setWindow(windowName) {
    browser.switchTo().window(windowName);
  }

  closePopups() {
    return browser.getAllWindowHandles().then(handles => {
      for (let index = handles.length - 1; index > 0; index--) {
        browser.switchTo().window(handles[index]);
        browser.close();
      }
      browser.switchTo().window(handles[0]);
    });
  }

  /**
   * Switches focus to the first popup window
   */
  switchToFirstPopup() {
    return browser.getAllWindowHandles().then(handles => {
      browser.switchTo().window(handles[1]);
    });
  }
}
