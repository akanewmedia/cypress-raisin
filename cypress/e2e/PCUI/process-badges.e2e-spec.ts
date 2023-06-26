import { MainToolbar } from '../../pc-ui-e2e/src/component/main-toolbar';
import { userLogin } from '../../pc-ui-e2e/src/utils/actions';

describe('process badges:', () => {
  let mainToolbar: MainToolbar;

  beforeEach(() => {
    mainToolbar = new MainToolbar();
  });

  it('should log in', () => {
    userLogin('DaveHeaderOneTestOne');
  });

  it('should render toolbar', () => {
    expect(mainToolbar.container.isPresent()).toBeTruthy();
  });

  it('should have badgeCount greater than zero', () => {
    expect(mainToolbar.getBadgeCount()).toBeGreaterThan(0);
  });

  it('should remove badgeCount on click', () => {
    mainToolbar.badgeButton.click();
    mainToolbar.closeBadgeDialog();
    expect(mainToolbar.getBadgeCount()).toBe(0);
  });
});
