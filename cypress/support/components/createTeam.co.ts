import { buildSelector, enterText } from "../utils/actions";

/**
 * Represents the create team component in the flow
 */
export class CreateTeamComponent {
  container: any;
  teamInfoContainer: any;
  teamNameInput: any;
  teamGoalInput: any;
  regPasswordInput: any;
  repPasswordInput: any;
  isOpenToEveryoneRadioBtn: any;
  isPasswordProtectedRadioBtn: any;
  constructor() {
    this.container = buildSelector('#base-page-top');
    this.teamInfoContainer = buildSelector(this.container, '#createTeamSection');
    this.teamNameInput = buildSelector(this.teamInfoContainer, '#TeamName');
    this.teamGoalInput = buildSelector(this.teamInfoContainer, '#TeamGoal');
    this.regPasswordInput = buildSelector(this.teamInfoContainer, '#regPassword');
    this.repPasswordInput = buildSelector(this.teamInfoContainer, '#repPassword');
    this.isOpenToEveryoneRadioBtn = buildSelector(this.teamInfoContainer, '#open');
    this.isPasswordProtectedRadioBtn = buildSelector(this.teamInfoContainer, '#closed');
  }

  /**
   * Types out the team fundraising goal
   * @param amount
   */
  enterGoal(amount) {
    enterText(this.teamGoalInput, amount);
  }

  /**
   * Fills out the page using fields you put in [data.team].
   * The team name will have a random char sequence appended to it.
   * @param data
   */
  fillOutPage(data) {
    enterText(this.teamNameInput, `${data.team.name}${Date.now()}`);
    enterText(this.teamGoalInput, data.team.goal);

    // the password area should not initially be displayed
    // expect(this.regPasswordInput.isPresent()).toBeFalsy();

    if (data.team.password) {
      cy.get(this.isPasswordProtectedRadioBtn).click();
      // expect(this.regPasswordInput.isPresent()).true;
      enterText(this.regPasswordInput, data.team.password);
      enterText(this.repPasswordInput, data.team.password);
    } else {
      cy.get(this.isOpenToEveryoneRadioBtn).click();
      // the password area should not be displayed
      // expect(this.regPasswordInput.isPresent()).toBeFalsy();
    }
  }

  /**
   * Fills out the page using fields you put in [data.team].
   * The team name will have a random char sequence appended to it.
   * The password part will not be populated.
   * @param data
   */
  fillOutPageNoPassword(data) {
    enterText(this.teamNameInput, `${data.team.name}${Date.now()}`);
    enterText(this.teamGoalInput, data.team.goal);
    cy.get(this.isOpenToEveryoneRadioBtn).click();
    // the password area should not be displayed
    // expect(this.regPasswordInput.isPresent()).toBeFalsy();
  }
}


