import { Page, Locator } from '@playwright/test';

export class LandingPage {
  readonly page: Page;
  readonly heading: Locator;
  readonly heroText: Locator;
  readonly description: Locator;
  readonly startWithDemoLink: Locator;
  readonly signInWithGoogleButton: Locator;
  readonly signInWithAppleButton: Locator;
  readonly chooseJsonOrCsvButton: Locator;
  readonly downloadAppStoreLink: Locator;
  readonly googlePlayLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole('heading', { name: 'Tarsi Web' });
    this.heroText = page.getByText('Budget Tracker', { exact: true });
    this.description = page.getByText(/Sign in with Google or Apple/i);
    this.startWithDemoLink = page.getByRole('link', { name: 'Start with a demo' });
    this.signInWithGoogleButton = page.getByRole('button', { name: 'Sign in with Google' });
    this.signInWithAppleButton = page.getByRole('button', { name: 'Sign in with Apple' });
    this.chooseJsonOrCsvButton = page.getByRole('button', { name: 'Choose JSON or CSV' });
    this.downloadAppStoreLink = page.getByRole('link', { name: /Download on the App Store/i });
    this.googlePlayLink = page.getByRole('link', { name: /Get it on Google Play/i });
  }

  async open(url: string): Promise<void> {
    await this.page.goto(url);
  }

  async isHeadingVisible(): Promise<boolean> {
    return this.heading.isVisible();
  }

  async isHeroTextVisible(): Promise<boolean> {
    return this.heroText.isVisible();
  }

  async isDescriptionVisible(): Promise<boolean> {
    return this.description.isVisible();
  }

  async isStartWithDemoVisible(): Promise<boolean> {
    return this.startWithDemoLink.isVisible();
  }

  async isSignInWithGoogleVisible(): Promise<boolean> {
    return this.signInWithGoogleButton.isVisible();
  }

  async isSignInWithAppleVisible(): Promise<boolean> {
    return this.signInWithAppleButton.isVisible();
  }

  async isChooseJsonOrCsvVisible(): Promise<boolean> {
    return this.chooseJsonOrCsvButton.isVisible();
  }

  async isDownloadOnTheAppStoreVisible(): Promise<boolean> {
    return this.downloadAppStoreLink.isVisible();
  }

  async isGetItOnTheGooglePlayVisible(): Promise<boolean> {
    return this.googlePlayLink.isVisible();
  }

  async clickStartWithDemo(): Promise<void> {
    await this.startWithDemoLink.click();
  }

  async clickSignInWithGoogle(): Promise<void> {
    await this.signInWithGoogleButton.click();
  }

  async clickSignInWithApple(): Promise<void> {
    await this.signInWithAppleButton.click();
  }

  async clickChooseJsonOrCsv(): Promise<void> {
    await this.chooseJsonOrCsvButton.click();
  }

  async clickDownloadOnTheAppStore(): Promise<void> {
    await this.downloadAppStoreLink.click();
  }

  async clickGetItOnGooglePlay(): Promise<void> {
    await this.googlePlayLink.click();
  }
}
