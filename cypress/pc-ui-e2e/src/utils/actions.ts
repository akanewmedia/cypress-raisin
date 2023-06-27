// import { browser, ElementFinder, $, Key, by, element, ElementArrayFinder } from 'protractor';
// import { protractor } from 'protractor/built/ptor';
import { LoginPage } from '../page/login.page';
import { TokenByPass } from '../interface/TokenByPass';
import { isNil, startsWith, isString } from 'lodash';

//const EC = protractor.ExpectedConditions;

export function buildSelector(selector1, selector2 = null, selector3 = null) {

  let selector = selector1;
  if (selector2) {
    selector = selector + ' ' + selector2;
  }
  if (selector3) {
    selector = selector + ' ' + selector3;
  }
  return selector;
}

export async function scrollToElement(protractorSelector){
  cy.get(protractorSelector).scrollIntoView({ offset: { top: -100, left: 0 } } );
}

export function clickLink(pageLink) {
  cy.get(pageLink).click()
}

// export async function scrollElemFinderIntoView(elemFinder: ElementFinder) {
//   waitForElement(elemFinder);
//   return browser.executeScript('arguments[0].scrollIntoView(false)', elemFinder);
// }

// export async function waitForRipple() {
//   await browser.wait(EC.not(
//     EC.presenceOf(element(by.css('div.mat-ripple-element')))));
// }

// export async function switchToMainWindow(): Promise<void> {
//   await browser.switchTo().defaultContent();
//   await browser.waitForAngularEnabled(true);
// }

// export async function switchToIFrame(iframe: ElementFinder): Promise<void> {
//   const iframeWebElement = iframe.getWebElement();
//   await browser.waitForAngularEnabled(false);
//   return await browser.switchTo().frame(iframeWebElement);
// }

/**
 * Gets the element by class
 *
 * @export
 * @param {string} className
 * @return {*}  {ElementFinder}
 */
export function elementById(id, container = null) {
  if (isString(id)) {
    if (isNil(container)) {
      return cy.get(id);
    }

    return cy.get(container).get(id);
  } else {
    if (isNil(id)) {
      return cy.get(container);
    }

    return cy.get(container);
  }
}
/**
 * Gets the element by class and needs a .(dot) in the name
 *
 * @export
 * @param {string} className
 * @return {*}  {ElementFinder}
 */
export function elementByClass(className, container = null) {

  if (isString(className)) {
    if (isNil(container)) {
      return cy.get(className).first();
    }
    return cy.get(container).get(className).first();
  } else {
    if (isNil(className)) {
      return cy.get(container).first();
    }
    return className.get(container).first();
  }

}
/**
 * Gets the element by class and needs a .(dot) in the name
 *
 * @export
 * @param {string} className
 * @return {*}  {ElementFinder}
 */
export function elementsByClass(className, container = null) {
  if (isNil(container)) {
    return className
  }
  else {
    let elements = className + " " + container
    return elements
  }

}

/**
 * Selects an option in drop downs
 * @param {ElementFinder} dropdown - the dropdown list
 * @param {string} selectedOption - the option to select
 */
export function selectDropDownOption(protractorSelector, selectedOption) {
  
  if (isNil(selectedOption)) {
    return;
  }
  //scrollToElement('.rx-matrix-container .donation-matrix-other-amount .globalized-number-input input')

  cy.get(protractorSelector).invoke('attr', 'class').then((classString) => {    
    if (classString.indexOf('mat-select') >= 0) {      
      selectMatDropDownOption(protractorSelector, selectedOption);
    }
    if (classString.indexOf('matNativeControl') >= 0) {
      this.selectNativeDropDownOption(
        protractorSelector,
        selectedOption
      );
    }
    console.error('Unable to determine the type of control');
  });
}

/**
 * Selects an option in the newer material design drop downs
 * @param {ElementFinder} dropdown - the dropdown list
 * @param {string} selectedOption - the option to select
 */
export function selectMatDropDownOption(
  dropdownElementSelector,
  selectedOption
) {
  // waitForElement(dropdownElementSelector);
  //scrollToElement(dropdownElementSelector);
  cy.get(dropdownElementSelector).click();
  // waitForElement(ddlContainer);
  // browser.sleep(200);
  if (Array.isArray(selectedOption)) {
    selectedOption.map(option => {
      cy.get('.mat-select-panel mat-option').contains(option).click({force: true});
    })   
  }
  else {
    cy.get('.mat-select-panel mat-option').contains(selectedOption).first().click({force: true});
  }
  //cy.get('body').type('{esc}');
}

/**
 * Selects an option in the native drop downs
 * @param {ElementFinder} dropdown - the dropdown list
 * @param {string} selectedOption - the option to select
 */
export function selectNativeDropDownOption(
  dropdownElementSelector,
  selectedOption
) {
  // // waitForElementToBeClickable(dropdownElementSelector);
  return dropdownElementSelector
    .element(cy.get('option').contains(selectedOption))
    .click();
}

// export async function waitForElement(protractorSelector: any, timeout = 4000) {
//   return browser.wait(EC.presenceOf(protractorSelector), timeout, 'Element taking too long to appear in the DOM');
// }

// export async function waitForElementToBeClickable(ele: ElementFinder, timeout = 2000) {
//   return browser.wait(EC.elementToBeClickable(ele), timeout);
// }

// export async function typeIntoKendoEditor(
//   container: ElementFinder,
//   input: string
// ): Promise<void> {
//   const iframe = elementByClass('.k-editor .k-editable-area .k-content', container);
//   await switchToIFrame(iframe);
//   clearInputWithBackspace(elementByClass('body'));
//   elementByClass('body').sendKeys(input);
//   return await switchToMainWindow();
// }

// export async function getKendoEditorContent(
//   container: ElementFinder
// ): Promise<string> {
//   const iframe = elementByClass('.k-editor .k-editable-area .k-content', container);
//   await switchToIFrame(iframe);
//   // protractor doesnt like this
//   const content = await elementByClass('body').getAttribute(
//     'innerHTML'
//   );
//   await switchToMainWindow();
//   return content;
// }

export function clearInput(protractorSelector) {
  cy.get(protractorSelector).click();
  cy.get(protractorSelector).clear();
}

/**
 * Clear field buy hitting backspace 100 by defaultor by length of text
 *
 * @export
 * @param {*} elem
 * @param {*} [length]
 */
export function clearInputWithBackspace(length) {
  length = length || 100;
  let backspaceSeries = '';
  for (let i = 0; i < length; i++) {
    backspaceSeries += "{backspace}"
  }
  cy.type(backspaceSeries);
}

// export async function selectDropDownOption(
//   dropdownElementSelector: ElementFinder,
//   option: string
// ): Promise<void> {
//   scrollToElement(dropdownElementSelector);
//   dropdownElementSelector.click();
//   const ddlContainer = $('.cdk-overlay-container');
//   return ddlContainer
//     .$('.mat-select-panel')
//     .all(by.cssContainingText('mat-option', option))
//     .first()
//     .click();
// }

// export async function userLogin(user: string): Promise<void> {
//   // await browser.waitForAngularEnabled(true);
//   const tokenByPass: TokenByPass = {
//     access_token: 'cristoken',
//     culture: 'en-CA',
//     roles: ['Individual']
//   };

//   if (startsWith(user.toLowerCase(), 'tm')) {
//     tokenByPass.roles = ['Individual', 'TeamMember'];
//   } else if (startsWith(user.toLowerCase(), 'tc')) {
//     tokenByPass.roles = ['Individual', 'TeamMember', 'TeamCaptain'];
//   }

//   const loginPO: LoginPage = new LoginPage();
//   loginPO.navigateToByPass(2, 'pcui2', tokenByPass);
//   browser.driver.manage().window().maximize();
// }

/**
 * Presses the "Escape" (Esc) keyboard button
 */
export function pressEsc() {
  cy.get('body').trigger('keydown', { keyCode: 27 });
  cy.wait(500);
  cy.get('body').trigger('keyup', { keyCode: 27 });
}
