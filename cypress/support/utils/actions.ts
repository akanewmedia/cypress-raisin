import { isNil, isString } from 'lodash';
import 'cypress-plugin-tab';

export function buildSelector(selector1, selector2 = null, selector3 = null) {

  let selector = selector1;
  if (selector2){
    selector = selector + ' ' + selector2;
  }
  if (selector3){
    selector = selector + ' ' + selector3;
  }
  return selector;
}
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

    return container.get(container);
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
    return cy.get(className);
  }
  return container.all.get(className);
}
/**
 * Clicks an element
 * @param {ElementFinder} selector - the element to be clicked
 * @param {boolean} [true] wait - if the driver should be used to click the element
 */
export function clickElement(selector, wait = false) {
  // if (wait) {
  //   cy.get(selector).click();
  // }
  return cy.get(selector).click();
}

export function enterText(protractorSelector, text) {
  //this.clearInputWithBackspace(protractorSelector);
  cy.get(protractorSelector).type(text);
}

/**
 * Clears the input field of an element
 * @param {ElementFinder} selector - the element to be cleared
 */
export function clearInput(protractorSelector) {
  protractorSelector.click();
  protractorSelector.clear();
}

/**
 * Clear field buy hitting backspace 100 by defaultor by length of text
 *
 * @export
 * @param {*} elem
 * @param {*} [length]
 */
export function clearInputWithBackspace(protractorSelector, length) {
  length = length || 100;
  let backspaceSeries = '';
  for (let i = 0; i < length; i++) {
    backspaceSeries += "{backspace}"
  }
  protractorSelector.type(backspaceSeries);
}

/**
 * Checks or unchecks in the newer material design checkboxes
 * @param {ElementFinder} protractorSelector - the checkbox element
 * @param {string} checked - the wanted value (checked or unchecked)
 */
export function setMatCheckboxChecked(protractorSelector, checked) {
  cy.get(protractorSelector).click();
  // input.get('aria-checked').then((ariaChecked) => {
  //   if (ariaChecked.indexOf('false') >= 0 && checked) {
  //     // If checkbox is unchecked and should be checked
  //     protractorSelector.click();
  //   } else if (ariaChecked.indexOf('true') >= 0 && !checked) {
  //     // If checkbox is checked and should be unchecked
  //     protractorSelector.click();
  //   }
  //});
}

/**
 * Checks or unchecks checkboxes
 * @param {ElementFinder} protractorSelector - the checkbox element
 * @param {string} checked - the wanted value (checked or unchecked)
 */
export function setCheckboxChecked(protractorSelector, checked) {
  cy.get(protractorSelector)
    .invoke('attr', 'class')
    .then((classString) => {
      if (
        (classString.indexOf('mat-checkbox-checked') == -1 && checked) || // If checkbox is unchecked and should be checked
        (classString.indexOf('mat-checkbox-checked') >= 0 && !checked)
      ) {
        // If checkbox is checked and should be unchecked
        protractorSelector.click();
      }
    });
}

/**
 * Enters a value in the newer material design input, depending on its type (text, datepicker, dropdown, checkbox)
 * Any fields that are not in your data set will be skipped.
 * @param {ElementFinder} protractorSelector - the input element
 * @param {string} value - the value of the input
 */
export function enterMatInput(protractorSelector, value) {
  if (isNil(value)) {
    return;
  }

  return protractorSelector.getAttribute('class').then((classString) => {
    // Need to verify if it is select first because a native select has the mat-input-element class
    if (
      classString.indexOf('mat-select') >= 0 ||
      classString.indexOf('matNativeControl') >= 0
    ) {
      // If input type is dropdown
      // console.log('enterMatInput => selectDropDownOption', value);
      return this.selectDropDownOption(protractorSelector, value);
    }
    if (classString.indexOf('mat-input-element') >= 0) {
      return cy
        .get(protractorSelector)
        .invoke('attr', 'ng-reflect-mat-datepicker')
        .then((datepickerString) => {
          if (datepickerString) {
            // If input type is datepicker
            return protractorSelector.type(value); // TODO: create a method in actions to manually select a date from the material datepicker
          } // If input type is text
          // console.log('enterMatInput => enterText', value);
          return this.enterText(protractorSelector, value);
        });
    }
    if (classString.indexOf('mat-checkbox-input') >= 0) {
      // If input type is checkbox
      return this.setMatCheckboxChecked(protractorSelector, value);
    }
    console.error('Unable to determine the type of control');
  });
}

export function getLocalDateTime() {
  return new Date().getTime();
}

/**
 * Selects an option in drop downs
 * @param {ElementFinder} dropdown - the dropdown list
 * @param {string} selectedOption - the option to select
 */
export function findDropDownOption(protractorSelector, selectedOption) {
  if (isNil(selectedOption)) {
    return;
  }

  return protractorSelector.getAttribute('class').then((classString) => {
    if (classString.indexOf('mat-select') >= 0) {
      return this.findMatDropDownOption(protractorSelector, selectedOption);
    }
    if (classString.indexOf('matNativeControl') >= 0) {
      return this.findNativeDropDownOption(protractorSelector, selectedOption);
    }
    // console.error('Unable to determine the type of control');
  });
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

  return protractorSelector.getAttribute('class').then((classString) => {
    if (classString.indexOf('mat-select') >= 0) {
      return this.selectMatDropDownOption(protractorSelector, selectedOption);
    }
    if (classString.indexOf('matNativeControl') >= 0) {
      return this.selectNativeDropDownOption(
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
export function selectAutoCompleteDropDownOption(
  protractorSelector,
  selectedOption
) {
  // // waitForElementToBeClickable(protractorSelector);
  // scrollToElement(dropdownElementSelector);
  protractorSelector.click();
  // this.clearInput(protractorSelector);
  // protractorSelector.sendKeys(selectedOption);
  const ddlContainer = elementByClass('.cdk-overlay-container');
  return ddlContainer.cy
    .get('.mat-autocomplete-panel')
    .all(cy.get('mat-option').contains(selectedOption))
    .first()
    .click();
}

/**
 * Finds an option in the newer material design drop downs
 * @param {ElementFinder} dropdown - the dropdown list
 * @param {string} selectedOption - the option to select
 */
export function findMatDropDownOption(
  dropdownElementSelector,
  selectedOption: string
) {
  // waitForElement(dropdownElementSelector);
  scrollToElement(dropdownElementSelector);
  dropdownElementSelector.click();
  const ddlContainer = cy.get('.cdk-overlay-container');
  // waitForElement(ddlContainer);
  // browser.sleep(200);
  cy
    .get('.mat-select-panel mat-option').contains(selectedOption)
    .first();
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
  const ddlContainer = cy.get('.cdk-overlay-container');
  // waitForElement(ddlContainer);
  // browser.sleep(200);
  ddlContainer
    .get('.mat-select-panel mat-option').contains(selectedOption)
    .first()
    .click();
}

/**
 * Finds an option in the native drop downs
 * @param {ElementFinder} dropdown - the dropdown list
 * @param {string} selectedOption - the option to select
 */
export function findNativeDropDownOption(
  dropdownElementSelector,
  selectedOption
) {
  // // waitForElementToBeClickable(dropdownElementSelector);
  return dropdownElementSelector.element(
    cy.get('option').contains(selectedOption)
  );
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

/**
 * Waits for an element to become visible
 * @param {ElementFinder} protractorSelector - the selector of the element
 */
// export function // waitForElementToBeVisible(protractorSelector) {
//   return cy.wait(EC.visibilityOf(protractorSelector));
// }

export function selectDropdownRegularOption(
  dropdownElementSelector,
  option
) {
  // waitForElement(dropdownElementSelector);
  scrollToElement(dropdownElementSelector);
  dropdownElementSelector.click();
  const ddlContainer = cy.get('.cdk-overlay-container');
  ddlContainer
    .get('mat-option .mat-option-text').contains(option)
    .click();
}

// export function // waitForElement(protractorSelector, timeout = 4000) {
//   return browser.wait(EC.presenceOf(protractorSelector), timeout, 'Element taking too long to appear in the DOM');
// }

// export function // // waitForElementToBeClickable(element, timeout = 2000) {
//   return browser.wait(EC.elementToBeClickable(element), timeout);
// }

// export function // waitForElementToDisappear(element, timeout = 2000) {
//   return browser.wait(EC.not(EC.presenceOf(element)), timeout);
// }

/**
 * Waits for a page to load
 * @param {string} url - the url of the page
 * @param {number} console.errorTimeout - the timeout in milliseconds
 */
// export function waitForUrl(url, console.errorTimeout = 1000) {
//   return browser.driver.wait(EC.urlContains(url), console.errorTimeout)
//     .catch(() =>
//       browser.driver.getCurrentUrl()
//         .then((currentUrl) => `Current page: ${currentUrl} does not contain ${url} in time(${console.errorTimeout}ms)`));
// }

/**
 * Waits for a text to be present in an element
 * @param {ElementFinder} protractorSelector - the selector of the element
 * @param {string} text - the text that should be present in the element
 */
// export function waitForTextInElement(element, text) {
//   return browser.driver.wait(EC.textToBePresentInElement(element, text));
// }

export function wait(timeout) {
  cy.wait(timeout);
}

/**
 * Added to workaround the very common "element not clickable at point" error.
 * The workaround is to first set focus to a field that precedes the field you are trying to change,
 * then let the test continue.
 * You may encounter this on forms with non input fields - especially when trying to skip them,
 * pressing continue, then going back to fix them.
 * https://www.google.ca/search?q=element+not+clickable+at+point+selenium&rlz=1C1CHBF_enCA793CA793&oq=element+not+clickable+at+point+selenium&aqs=chrome..69i57.20850j0j7&sourceid=chrome&ie=UTF-8
 * @param protractorSelector
 */
export function setFocus(protractorSelector) {
  cy.get(protractorSelector).first().focus();
}

// export function scrollToElement(protractorSelector) {
//   return cy.scrollTo(protractorSelector);
// }

export function scrollToTop() {
  cy.scrollTo(0, 0);
}

/**
 * Determines the type of custom field, then sets the value
 * @param element - the element that is to be set with the value
 * @param value - must be set to a value, or else the function will just return
 */
export function setCustomAttribute(element, value) {
  if (!value) {
    return;
  }

  element.getTagName().then((tagName) => {
    switch (tagName.toLowerCase()) {
      case 'md-select':
        this.selectMatDropDownOption(element, value);
        break;
      case 'input':
        switch (element.type) {
          case undefined: // default is text when [type] is not set
          case 'text':
            this.type(element, value);
            break;
          default:
            // TODO: implement other types like radio and checkbox when those tests are done
            throw new Error(
              `To fix, implement ${element.type} in actions.setAttribute()`
            );
        }
        break;
    }
  });
}

/**
 * Tacks on the date in milliseconds to the last name full name fields
 * to get around the form validation for unique first name, last name and email.
 * @param data
 */
export function generateUniqueName(data) {
  const val = Date.now();
  if (data.lastName) {
    data.lastName += val;
  }
  if (data.fullName) {
    data.fullName += val;
  }
}

/**
 * Tacks on the date in milliseconds to the account.username field
 * to allow the creation of different accounts
 * @param data
 */
export function generateUniqueUsername(data) {
  const val = getLocalDateTime();
  if (data.account.username) {
    data.account.username += val;
    data.loginForm.username = data.account.username;
  }
}

/**
 * @description Return true when body element contains np-app attribute
 *
 * @returns {*}
 */
// export function waitForApp() {
//   const instance = browser.getInstance();
// }

/**
 * Presses the "Escape" (Esc) keyboard button
 */
export function pressEsc() {
  return cy.get('body').type("{esc}");
}

/**
 * Presses the "Escape" (Esc) keyboard button
 */
export function pressTab() {
  return cy.get('body').tab();
}

/**
 * Sets user referral control value.
 * @param container Container
 * @param referee Referee
 */
export function setUserReferral(container, referee) {
  container.type(container, referee);
}
