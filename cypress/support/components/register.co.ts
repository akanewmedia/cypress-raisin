import { buildSelector, clickElement, elementByClass, elementsByClass, selectDropdownRegularOption } from "../utils/actions";

export class RegistrationItem {

  registerItemButton: any;
  constructor(private container: any) {
    this.registerItemButton = this.container.$$('button');
  }

  /**
   * Clicks the desired reg item. [regItemIndex] defaults to zero existing tests are not broken.
   * @param regItemIndex
   */
  register(regItemIndex = 0) {
    this.registerItemButton.get(regItemIndex).click();
  }
}

// Registration Section
export class RegisterComponent {
  container: any;
  groupSelectionContainer: any;
  registrationTypeContainer: any;
  subEventGroupSelector: any;
  constructor() {
    this.container = buildSelector('.registration-start');
    this.groupSelectionContainer = buildSelector('.subevent-group-selector');
    this.registrationTypeContainer = buildSelector(this.container, '.reg-listing');
    this.subEventGroupSelector = buildSelector(this.groupSelectionContainer, '.mat-select');
  }

  /**
   * Clicks on the registration item within the specified section. [regItemIndex] defaults to zero so
   * existing tests are not broken.
   * @param sectionIndex - 0 = individual, 1 = join team, 2 = team captain
   * @param regItemIndex - the index of the registration item within the section specified above
   */
  register(sectionIndex, regItemIndex = 0) {
    let registrationGroup = cy.get(this.registrationTypeContainer).get('article.reg-items').eq(sectionIndex);
    registrationGroup.get('.btn-block').eq(regItemIndex).click();
  }

  selectSubEventGroup(subEventGroup) {
    selectDropdownRegularOption(this.subEventGroupSelector, subEventGroup);
  }
}
