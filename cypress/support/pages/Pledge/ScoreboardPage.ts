
import { TopGroupsWidget } from '../../components/topGroupsWidget.co';
import { elementByClass } from '../../utils/actions';

/**
 * Represents the scoreboard page on RXF events
 */
export class ScoreboardPage {
  container: any;
  topGroups: TopGroupsWidget;
  constructor() {
    this.container = elementByClass('#base-page-top .tab-standings');
    this.topGroups = new TopGroupsWidget(this.container);
  }
}

