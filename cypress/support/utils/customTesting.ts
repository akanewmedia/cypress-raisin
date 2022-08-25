import { PageSetup } from "./pageSetup";

let pageSetup: PageSetup = new PageSetup();
/**
 * Util functions here are to facilitate any external/custom testing Such as in modal popups,
 * the legacy V3 website, the AddThis popup, PayPal, Facebook, etc.
 */


/**
 * Should be used to switch to a pop up window, then back to the main window after the test.
 * @param windowDesc - Description of the pop up window
 * @param windowName - Actual window name (open a console in popup and type window.name)
 * @returns {Function}
 */
export const testModal = (windowDesc, windowName) => (testDesc, testFn) => {
    it(`Should switch to ${windowDesc} window`, () => {
        pageSetup.setIsExternal(true);
        pageSetup.setWindow(windowName);
    });
    it(testDesc, testFn);
    it('Should switch back to the main window', () => {
        pageSetup.setWindow('');
        pageSetup.setIsExternal(false);
    });
};


/**
 * Should be used to switch to a pop up window, then back to the main window after the test.
 * Since we don't know the name of the window beforehand, we need to write some extra code
 * to fetch the first modal window.
 * @param windowDesc - Description of the pop up window
 * @returns {Function}
 */
export const testFirstModal = (windowDesc) => (testDesc, testFn) => {
    it(`Should switch to ${windowDesc} window`, async () => {
        pageSetup.setIsExternal(true);
        await pageSetup.switchToFirstPopup();
    });
    it(testDesc, testFn);
    it('Should switch back to the main window', () => {
        pageSetup.setWindow('');
        pageSetup.setIsExternal(false);
    });
};


/**
 * Returns a function that can be used just like it(desc, fn);
 * but the test can navigate to a external sites like V3 login and PayPal
 * @param description - text describing the external site
 * @returns {Function}
 */
export const testExternal = (description) => (testDesc, testFn) => {
    it(description, () => pageSetup.setIsExternal(true));
    it(testDesc, testFn);
};


/**
 * The test will venture into PayPal
 * @type {Function}
 */
export const inPayPal = testExternal('Should be in PayPal');

/**
 * The test will venture into V3
 * @type {Function}
 */
export const inV3 = testExternal('Should be in V3');

/**
 * Switches to the facebook login window spawned by AddThis
 * @type {Function}
 */
export const inAddThisFB = testModal('Facebook', 'addthis_share');

/**
 * Switches to the facebook login window
 * @type {Function}
 */
export const inFB = testFirstModal('Facebook');
