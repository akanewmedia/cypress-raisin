import { LoginComponent } from '../component/login.component';
import { TokenByPass } from '../interface/TokenByPass';
import { PledgeNavBarComponent } from "../../../support/components/pledgeNavbar.co";

const navbarCO = new PledgeNavBarComponent();


export class LoginPage {
  private loginCO: LoginComponent;
  constructor() {
    this.loginCO = new LoginComponent();
  }

  // async navigateTo(
  //   organizationId: number,
  //   subEventCustomPart: string
  // ): Promise<void> {
  //   return browser.get(`/${organizationId}/${subEventCustomPart}/login`);
  // }

  // async navigateToByPass(
  //   organizationId: number,
  //   subEventCustomPart: string,
  //   data: TokenByPass
  // ): Promise<void> {
  //   const baseLoginUrl = `/${organizationId}/${subEventCustomPart}/login`;
  //   const roles = JSON.stringify(data.roles);
  //   const loginUrl = `${baseLoginUrl}?token=${data.access_token}&culture=${data.culture}&roles=${roles}&userId=${1123456}&fl=false`;
  //   console.log(loginUrl);
  //   return browser.get(loginUrl);
  // }

  async enterUsernameAndPassword(
    username: string,
    password: string
  ): Promise<void> {
    this.loginCO.enterUsername(username);
    this.loginCO.enterPassword(password);
  }

  async login(username: string, password: string): Promise<any> {
    navbarCO.login()
    this.enterUsernameAndPassword(username, password);
    this.loginCO.clickLoginButton();
  }

  async isPresent() {
    this.loginCO.isPresent();
  }
}
