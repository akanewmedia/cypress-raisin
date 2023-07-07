import { buildSelector, enterText, selectMatDropDownOption } from "../utils/actions";

export class AccountInformation {
  fundraisingGoal: any;
  username: any;
  password: any;
  fund:any;
  constructor(private accountContainer: any) {
    this.username = buildSelector(this.accountContainer, '#username');
    this.password = buildSelector(this.accountContainer, '#password');
    this.fundraisingGoal = buildSelector(this.accountContainer, '#goal');
    this.fund = buildSelector(this.accountContainer, '#participantFund')
  }

  enterGoal(goal) {
    enterText(this.fundraisingGoal, goal);
  }

  selectFund(fund){
    selectMatDropDownOption(this.fund, fund);
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

  enterDetails(username, password, goal, fund) {
    this.enterUsernameAndPassword(username, password);
    this.enterGoal(goal);
    if(fund){
      this.selectFund(fund)
    }
  }
}