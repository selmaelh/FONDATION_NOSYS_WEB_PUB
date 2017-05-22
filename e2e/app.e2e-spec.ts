import { PublicWebPage } from './app.po';

describe('public-web App', () => {
  let page: PublicWebPage;

  beforeEach(() => {
    page = new PublicWebPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
