import { Page, Locator } from '@playwright/test';

export class DemoPage {
  readonly page: Page;
  readonly heading: Locator;
  readonly heroText: Locator;
  readonly navHome: Locator;
  readonly navHistory: Locator;
  readonly navWallet: Locator;
  readonly navWalletAccounts: Locator;
  readonly navWalletPayments: Locator;
  readonly navPlan: Locator;
  readonly navPlanUpcoming: Locator;
  readonly navPlanBudgets: Locator;
  readonly navPlanCategories: Locator;
  readonly navPlanTags: Locator;
  readonly navPlanTemplates: Locator;
  readonly navPlanRecurring: Locator;
  readonly navPlanInstallments: Locator;
  readonly navPlanGoals: Locator;
  readonly navPlanGoalActivity: Locator;
  readonly navPlanDebts: Locator;
  readonly navPlanDebtActivity: Locator;
  readonly navPlanOwedToYou: Locator;
  readonly navPlanReceivableActivity: Locator;
  readonly navStatistics: Locator;
  readonly navSettings: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole('heading', { name: 'Tarsi Web' });
    this.heroText = page.getByText('Budget Tracker', { exact: true });
    this.navHome = page.getByRole('link', { name: 'Home' });
    this.navHistory = page.getByRole('link', { name: 'History' });
    this.navWallet = page.getByRole('link', { name: 'Wallet' });
    this.navWalletAccounts = page.getByRole('link', { name: 'Accounts' });
    this.navWalletPayments = page.getByRole('link', { name: 'Payments' });
    this.navPlan = page.getByRole('link', { name: 'Plan' });
    this.navPlanUpcoming = page.getByRole('link', { name: 'Upcoming' });
    this.navPlanBudgets = page.getByRole('link', { name: 'Budgets' });
    this.navPlanCategories = page.getByRole('link', { name: 'Categories' });
    this.navPlanTags = page.getByRole('link', { name: 'Tags' });
    this.navPlanTemplates = page.getByRole('link', { name: 'Templates' });
    this.navPlanRecurring = page.getByRole('link', { name: 'Recurring' });
    this.navPlanInstallments = page.getByRole('link', { name: 'Installments' });
    this.navPlanGoals = page.getByRole('link', { name: 'Goals' });
    this.navPlanGoalActivity = page.getByRole('link', { name: 'Goal activity' });
    this.navPlanDebts = page.getByRole('link', { name: 'Debts' });
    this.navPlanDebtActivity = page.getByRole('link', { name: 'Debt activity' });
    this.navPlanOwedToYou = page.getByRole('link', { name: 'Owed to You' });
    this.navPlanReceivableActivity = page.getByRole('link', { name: 'Receivable activity' });
    this.navStatistics = page.getByRole('link', { name: 'Statistics' });
    this.navSettings = page.getByRole('link', { name: 'Settings' });
  }

  // async open(url: string): Promise<void> {
  //   await this.page.goto(url);
  // }

  async isHeadingVisible(): Promise<boolean> {
    return this.heading.isVisible();
  }

  async isHeroTextVisible(): Promise<boolean> {
    return this.heroText.isVisible();
  }

  // async isDescriptionVisible(): Promise<boolean> {
  //   return this.description.isVisible();
  // }

  // async isStartWithDemoVisible(): Promise<boolean> {
  //   return this.startWithDemoLink.isVisible();
  // }

  // async isSignInWithGoogleVisible(): Promise<boolean> {
  //   return this.signInWithGoogleButton.isVisible();
  // }

  // async isSignInWithAppleVisible(): Promise<boolean> {
  //   return this.signInWithAppleButton.isVisible();
  // }

  // async isChooseJsonOrCsvVisible(): Promise<boolean> {
  //   return this.chooseJsonOrCsvButton.isVisible();
  // }

  // async isDownloadOnTheAppStoreVisible(): Promise<boolean> {
  //   return this.downloadAppStoreLink.isVisible();
  // }

  // async isGetItOnTheGooglePlayVisible(): Promise<boolean> {
  //   return this.googlePlayLink.isVisible();
  // }

  // async clickStartWithDemo(): Promise<void> {
  //   await this.startWithDemoLink.click();
  // }

  // async clickSignInWithGoogle(): Promise<void> {
  //   await this.signInWithGoogleButton.click();
  // }

  // async clickSignInWithApple(): Promise<void> {
  //   await this.signInWithAppleButton.click();
  // }

  // async clickChooseJsonOrCsv(): Promise<void> {
  //   await this.chooseJsonOrCsvButton.click();
  // }

  // async clickDownloadOnAppStore(): Promise<void> {
  //   await this.downloadAppStoreLink.click();
  // }

  // async clickGetItOnGooglePlay(): Promise<void> {
  //   await this.googlePlayLink.click();
  // }
}
