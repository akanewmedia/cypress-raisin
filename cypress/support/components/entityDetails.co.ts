//The information regarding the libraries
import { buildSelector, clickElement, elementByClass } from "../utils/actions";

export class EnitytDetails {
  container: any;
  participantTop: any;
  teamPageButton: any;
  joinTeamButton: any;
  sideDonateNowButton: any;
  honourRoll: any;
  thermometerContainer: any;
  locationLink: any;
  locationLinkDisabled: any;
  constructor() {
    this.container = buildSelector('.base-page');
    this.participantTop = buildSelector(this.container, '.rs-preview__header');
    this.teamPageButton = buildSelector(this.participantTop, 'a[rx-team-link][isjointeam="false"]');
    this.joinTeamButton = buildSelector(this.participantTop, '.btn-join');
    this.sideDonateNowButton = buildSelector(this.participantTop, 'a.btn-donate');
    this.honourRoll = buildSelector(this.container, '.honour-roll');
    this.thermometerContainer = buildSelector(this.container, '.thermometer-container');
    this.locationLink = buildSelector(this.participantTop, '.team-links [widget-group-name] div a');
    this.locationLinkDisabled = buildSelector(this.participantTop, '.page-details [widget-group-name] div a.disable');
  }

  joinTeam() {
    clickElement(this.joinTeamButton);
  }

  sideDonateNow() {
    clickElement(this.sideDonateNowButton);
  }

  /**
   * Clicks on the location name anchor tag near the top of the page
   */
  clickLocationName() {
    this.locationLink.click();
  }
}

