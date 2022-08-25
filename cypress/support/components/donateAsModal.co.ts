/**
 * Represents the Donate As modal that comes up when you try to donate while logged in.
 */
export class DonateAsComponent {
    container: any;
    sponsorBtn: any;
    sponsorNewBtn: any;
    constructor() {
        this.container = $(".returning-user");
        this.sponsorBtn = this.container.$('#sponsor');
        this.sponsorNewBtn = this.container.$('#sponsorNew');
    }

    /**
     * Presses the sponsor "As Yourself" button in the "donate as" modal
     */
    pressSponorAsYourselfBtn() {
        this.sponsorBtn.click();
    }

    /**
     * Presses the sponsor "As New Donor" button in the "donate as" modal
     */
    pressSponorAsNewDonorBtn() {
        this.sponsorNewBtn.click();
    }
}
