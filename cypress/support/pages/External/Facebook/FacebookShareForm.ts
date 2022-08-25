import { elementById } from "../../../utils/actions";

/**
 * Represents the Facebook share page/form
 */
export class FacebookShareForm {
  container: any;
  postToFbBtn: any;

  /**
   * Sets all the selectors. This should be called once the Facebook login modal is actually shown.
   * Otherwise the selectors will be null;
   */
  bindSelectors() {
    this.container = elementById('form');
    this.postToFbBtn = elementById(this.container, '[name=__CONFIRM__]');
  }

  /**
   * Presses the "Post to Facebook" button
   */
  pressPostToFbBtn() {
    this.postToFbBtn.click();
  }
}
