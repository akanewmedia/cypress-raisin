import { buildSelector } from "../utils/actions";

/**
* Repesents the top groups widget on the scoreboard page
*/
export class TopGroupsWidget {
  container: any;
  constructor(container) {
    this.container = buildSelector(container, '#top-groups [widget-topgroups-list]');
  }

  /**
   * Returns a promise that resolves true if the provided group name is found in the widget
   * @param {string} groupName - name of the group to search for
   * @returns {promise.Promise<boolean>} - Promise that resolves true if the provided group name is found in the widget
   */
  exists(groupName) {
    return cy.get(this.container + ' table').within(()=>{
      cy.contains('.location a', groupName).should('not.exist')
    })
  }
}

