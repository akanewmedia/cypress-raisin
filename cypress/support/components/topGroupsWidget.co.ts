import { elementByClass, elementById } from "../utils/actions";

/**
* Repesents the top groups widget on the scoreboard page
*/
export class TopGroupsWidget {
  container: any;
  constructor(container) {
    this.container = elementById(container, '#top-groups [widget-topgroups-list]');
  }

  /**
   * Returns a promise that resolves true if the provided group name is found in the widget
   * @param {string} groupName - name of the group to search for
   * @returns {promise.Promise<boolean>} - Promise that resolves true if the provided group name is found in the widget
   */
  exists(groupName) {
    return elementByClass(this.container, 'table').get('.location a').contains(groupName).isPresent();
  }
}

