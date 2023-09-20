import { buildSelector, selectMatDropDownOption } from "../utils/actions";
/**
 * Represents the volunteer registration component
 */
export class VolunteerRegister {
  container: any;
  subEventGroupSelectionContainer: any;
  subEventGroupSelector: any;

  constructor() {
    this.container = buildSelector('#userDetails');
    this.subEventGroupSelectionContainer = buildSelector(this.container, 'rx-subevent-group-selector');
    this.subEventGroupSelector = buildSelector(this.subEventGroupSelectionContainer, '.mat-mdc-select');
  }

  selectSubEventGroup(subEventGroup) {
    selectMatDropDownOption(this.subEventGroupSelector, subEventGroup);
  }
}


