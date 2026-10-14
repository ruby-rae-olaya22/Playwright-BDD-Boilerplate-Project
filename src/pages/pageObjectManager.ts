import { Page } from '@playwright/test';
import { LandingPage } from './landing_page';
// import { DemoPage } from './demo_page';
// import { DashboardPage } from './DashboardPage';
// import { ProfilePage } from './ProfilePage';

export class PageObjectManager {
  constructor(private readonly page: Page) {}

  private _landingPage?: LandingPage;
  // private _demoPage?: DemoPage;
//   private _dashboardPage?: DashboardPage;
//   private _profilePage?: ProfilePage;

  get landingPage() {
    return this._landingPage ??= new LandingPage(this.page);
  }

  // get demoPage() {
  //   return this._demoPage ??= new DemoPage(this.page);
  // }
}