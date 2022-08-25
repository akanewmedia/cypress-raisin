import { PledgeNavBarComponent } from '../../components/pledgeNavbar.co';
import { PledgeV3LoginFormComponent } from '../../components/pledgeV3LoginForm.co'


/**
 * Represents the login page on the v3 platform
 */
export class V3LoginPage {
    navbar: PledgeNavBarComponent;
    loginForm: PledgeV3LoginFormComponent;
    constructor() {
        this.navbar = new PledgeNavBarComponent();
        this.loginForm = new PledgeV3LoginFormComponent();
    }

    /**
     * Fills out the login form and presses the login button
     * @param data
     */
    doLogin(data) {
        this.loginForm.enterUsernameAndPassword(data.loginForm.username, data.loginForm.password);
        this.loginForm.pressRaisinLoginBtn();
    }
}