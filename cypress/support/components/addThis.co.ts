/**
 * Represents the AddThis component found on various pages
 */
export class AddThisComponent {
    container: any;
    facebookBtn: any;
    constructor() {
        this.container = $('div[addthis-toolbox]');
        this.facebookBtn = this.container.$('[title=Facebook]');
    }

    /**
     * Press the Fb share button in the AddThis component
     */
    pressFacebookBtn() {
        this.facebookBtn.click();
    }
}

