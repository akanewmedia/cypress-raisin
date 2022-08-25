import { elementByClass, elementById, selectMatDropDownOption } from "../utils/actions";
/**
 * Represents the volunteer registration component
 */
export class VolunteerRegister {
  container: any;
  subEventGroupSelectionContainer: any;
  subEventGroupSelector: any;

  constructor() {
    this.container = elementById('#userDetails');
    this.subEventGroupSelectionContainer = elementById(this.container, 'rx-subevent-group-selector');
    this.subEventGroupSelector = elementByClass(this.subEventGroupSelectionContainer, '.mat-select');
  }

  selectSubEventGroup(subEventGroup) {
    selectMatDropDownOption(this.subEventGroupSelector, subEventGroup);
  }
}


