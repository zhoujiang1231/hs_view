import { AlisportsPage } from './app.po';

describe('alisports App', () => {
  let page: AlisportsPage;

  beforeEach(() => {
    page = new AlisportsPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
