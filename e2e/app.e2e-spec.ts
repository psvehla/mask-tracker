import { Page } from './app.po';

describe('App', () => {
  let page: Page;

  beforeEach(() => {
    page = new Page();
  });

  describe('default screen', () => {
    beforeEach(() => {
      page.navigateTo('/');
    });

    it("should have a title saying Mask Tracker", () => {
      page.getTitle().then(title => {
        expect(title).toEqual('Mask Tracker');
      });
    });

    it("should display a local storage warning popup when none is available", () => {
      // TODO
    });

    it("should have a dropdown set to 'Mask 1'", () => {
      // TODO
    });

    it("pollution range popups should be displayed correctly", () => {
      // TODO
    });

    it("should have + buttons enabled", () => {
      // TODO
    });

    it("should have counts set to 0", () => {
      // TODO
    });

    it("should have - buttons disabled", () => {
      // TODO
    });

    it("should have '100% remaining'", () => {
      // TODO
    });

    it("should have the DELETE button disabled", () => {
      // TODO
    });

    it("+ buttons should work", () => {
      // TODO
    });

    it("- buttons should work", () => {
      // TODO
    });

    it("should allow a mask to be added", () => {
      // TODO
    });

    it("should now have a dropdown set to 'Tom'", () => {
      // TODO
    });

    it("new mask should have + buttons enabled", () => {
      // TODO
    });

    it("new mask should have counts set to 0", () => {
      // TODO
    });

    it("new mask should have - buttons disabled", () => {
      // TODO
    });

    it("new mask should have '100% remaining'", () => {
      // TODO
    });

    it("new mask should have the DELETE button enabled", () => {
      // TODO
    });

    it("new mask should allow switch back to Mask 1", () => {
      // TODO
    });

    it("new mask should allow mask to be deleted after switching back to Mask 1", () => {
      // TODO
    });

    it("should display Tom's mask when Mask 1 is deleted", () => {
      // TODO
    });

    it("should have the DELETE button disabled when only one mask remains", () => {
      // TODO
    });
  })
});
