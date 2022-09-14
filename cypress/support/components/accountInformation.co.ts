import { buildSelector, elementById, enterText } from "../utils/actions";

export class AccountInformation {
  fundraisingGoal: any;
  username: any;
  password: any;
  constructor(private accountContainer: any) {
    this.username = buildSelector(this.accountContainer, '#username');
    this.password = buildSelector(this.accountContainer, '#password');
    this.fundraisingGoal = buildSelector(this.accountContainer, '#goal');
  }

  enterGoal(goal) {
    enterText(this.fundraisingGoal, goal);
  }

  enterUsername(username) {
    enterText(this.username, username);
  }

  enterPassword(password) {
    enterText(this.password, password);
  }

  enterUsernameAndPassword(username, password) {
    this.enterUsername(username);
    this.enterPassword(password);
  }

  enterDetails(username, password, goal) {
    this.enterUsernameAndPassword(username, password);
    this.enterGoal(goal);
  }
}