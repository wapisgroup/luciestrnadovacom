import { LucyPage } from './app.po';

describe('lucy App', () => {
  let page: LucyPage;

  beforeEach(() => {
    page = new LucyPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
