import { Page, Locator } from '@playwright/test';

/**
 * LandingPage — Sauce Demo storefront (https://sauce-demo.myshopify.com/)
 *
 * Locator strategy: getByRole first, scoped by landmark to disambiguate
 * duplicate accessible names (e.g. "About Us" exists in header, sidebar and footer).
 * No XPath anywhere.
 */
export class LandingPage {
  readonly page: Page;

  // ---- Brand / header ----
  readonly websiteLogoLink: Locator;
  readonly websiteLogoImage: Locator;
  readonly taglineHeading: Locator;
  readonly pageTitle: Locator;

  // ---- Top navigation (header > nav, desktop) ----
  readonly topNav: Locator;
  readonly topNavSearchLink: Locator;
  readonly topNavAboutUsLink: Locator;
  readonly topNavLoginLink: Locator;
  readonly topNavSignUpLink: Locator;

  // ---- Search ----
  readonly searchForm: Locator;
  readonly searchInput: Locator;
  readonly searchSubmitButton: Locator;

  // ---- Cart ----
  readonly cartToggleDesktopLink: Locator;
  readonly cartMobileLink: Locator;
  readonly checkoutLink: Locator;

  // ---- Side / main menu (sidebar) ----
  readonly sideMenu: Locator;
  readonly sideMenuToggle: Locator;
  readonly sideMenuHomeLink: Locator;
  readonly sideMenuCatalogLink: Locator;
  readonly sideMenuBlogLink: Locator;
  readonly sideMenuAboutUsLink: Locator;
  readonly sideMenuWishListLink: Locator;
  readonly sideMenuReferFriendLink: Locator;
  readonly sideMenuLoginLink: Locator;
  readonly sideMenuCreateAccountLink: Locator;

  // ---- Social (sidebar) ----
  readonly socialFacebookLink: Locator;
  readonly socialTwitterLink: Locator;
  readonly socialInstagramLink: Locator;
  readonly socialPinterestLink: Locator;
  readonly socialRssLink: Locator;

  // ---- Product list ----
  readonly productGrid: Locator;
  readonly productCards: Locator;
  readonly productGreyJacketCard: Locator;
  readonly productNoirJacketCard: Locator;
  readonly productStripedTopCard: Locator;
  readonly productGreyJacketImage: Locator;
  readonly productNoirJacketImage: Locator;
  readonly productStripedTopImage: Locator;

  // ---- Footer (contentinfo landmark) ----
  readonly footer: Locator;
  readonly footerHeading: Locator;
  readonly footerAboutHeading: Locator;
  readonly footerSearchLink: Locator;
  readonly footerAboutUsLink: Locator;
  readonly footerPaymentAmexImage: Locator;
  readonly footerPaymentVisaImage: Locator;
  readonly footerPaymentMastercardImage: Locator;

  constructor(page: Page) {
    this.page = page;

    // ---- Brand / header (header landmark scoping avoids strict-mode collisions) ----
    const header = page.locator('header');
    this.websiteLogoLink = header.getByRole('link', { name: 'Sauce Demo' });
    this.websiteLogoImage = header.getByRole('img', { name: 'Sauce Demo' });
    this.taglineHeading = header.getByRole('heading', {
      name: 'Just a demo site showing off what Sauce can do.',
    });
    this.pageTitle = page.getByRole('link', { name: 'Sauce Demo' });

    // ---- Top navigation ----
    this.topNav = header.getByRole('navigation');
    this.topNavSearchLink = header.getByRole('link', { name: 'Search', exact: true });
    this.topNavAboutUsLink = header.getByRole('link', { name: 'About Us', exact: true });
    this.topNavLoginLink = header.getByRole('link', { name: 'Log In', exact: true });
    this.topNavSignUpLink = header.getByRole('link', { name: 'Sign up', exact: true });

    // ---- Search (role=search form; input has placeholder, no label) ----
    this.searchForm = header.getByRole('search');
    this.searchInput = header.getByPlaceholder('Search');
    this.searchSubmitButton = header.locator('#search-submit');

    // ---- Cart ----
    this.cartToggleDesktopLink = header.getByRole('link', { name: /My Cart/ }).first();
    this.cartMobileLink = header.getByRole('link', { name: /My Cart/ }).nth(1);
    this.checkoutLink = header.getByRole('link', { name: 'Check Out', exact: true });

    // ---- Side / main menu ----
    const sidebar = page.locator('#sidebar');
    const mainMenu = page.locator('#main-menu');
    this.sideMenu = sidebar.getByRole('navigation');
    this.sideMenuToggle = sidebar.getByRole('link', { name: 'Menu' });
    this.sideMenuHomeLink = mainMenu.getByRole('link', { name: 'Home', exact: true });
    this.sideMenuCatalogLink = mainMenu.getByRole('link', { name: 'Catalog', exact: true });
    this.sideMenuBlogLink = mainMenu.getByRole('link', { name: 'Blog', exact: true });
    this.sideMenuAboutUsLink = mainMenu.getByRole('link', { name: 'About Us', exact: true });
    this.sideMenuWishListLink = mainMenu.getByRole('link', { name: 'Wish list', exact: true });
    this.sideMenuReferFriendLink = mainMenu.getByRole('link', {
      name: 'Refer a friend',
      exact: true,
    });
    this.sideMenuLoginLink = mainMenu.getByRole('link', { name: 'Login', exact: true });
    this.sideMenuCreateAccountLink = mainMenu.getByRole('link', {
      name: 'Create account',
      exact: true,
    });

    // ---- Social (links are icon-only, disambiguated via CSS class scoping) ----
    const social = page.locator('#social');
    this.socialFacebookLink = social.locator('.facebook');
    this.socialTwitterLink = social.locator('.twitter');
    this.socialInstagramLink = social.locator('.instagram');
    this.socialPinterestLink = social.locator('.pinterest');
    this.socialRssLink = social.locator('.rss');

    // ---- Product list ----
    const grid = page.locator('section.product-grid');
    this.productGrid = grid;
    this.productCards = grid.getByRole('link');
    this.productGreyJacketCard = grid.getByRole('link', { name: /Grey jacket/ });
    this.productNoirJacketCard = grid.getByRole('link', { name: /Noir jacket/ });
    this.productStripedTopCard = grid.getByRole('link', { name: /Striped top/ });
    this.productGreyJacketImage = grid.getByRole('img', { name: 'Grey jacket' });
    this.productNoirJacketImage = grid.getByRole('img', { name: 'Noir jacket' });
    this.productStripedTopImage = grid.getByRole('img', { name: 'Striped top' });

    // ---- Footer (contentinfo landmark; getByRole priority preserved) ----
    this.footer = page.getByRole('contentinfo');
    this.footerHeading = this.footer.getByRole('heading', { name: 'Footer', exact: true });
    this.footerAboutHeading = this.footer.getByRole('heading', {
      name: 'About Us',
      exact: true,
    });
    this.footerSearchLink = this.footer.getByRole('link', { name: 'Search', exact: true }).first();
    this.footerAboutUsLink = this.footer
      .getByRole('link', { name: 'About Us', exact: true })
      .first();
    this.footerPaymentAmexImage = this.footer.getByRole('img', { name: 'We accept Amex' });
    this.footerPaymentVisaImage = this.footer.getByRole('img', { name: 'We accept Visa' });
    this.footerPaymentMastercardImage = this.footer.getByRole('img', {
      name: 'We accept Mastercard',
    });
  }

  // ---- Dynamic getters (keeps POM scalable for new menu items / products) ----

  getTopNavLink(name: string): Locator {
    return this.page.locator('header').getByRole('link', { name, exact: true });
  }

  getSideMenuLink(name: string): Locator {
    return this.page.locator('#main-menu').getByRole('link', { name, exact: true });
  }

  getFooterLink(name: string): Locator {
    return this.footer.getByRole('link', { name, exact: true });
  }

  getProductCard(productName: string): Locator {
    return this.productGrid.getByRole('link', { name: new RegExp(productName, 'i') });
  }

  getProductImage(productName: string): Locator {
    return this.productGrid.getByRole('img', { name: productName });
  }

  // ---- Actions ----

  async open(url: string): Promise<void> {
    await this.page.goto(url);
  }

  async clickSideMenuLink(name: string): Promise<void> {
    await this.getSideMenuLink(name).click();
  }

  async clickFooterLink(name: string): Promise<void> {
    await this.getFooterLink(name).first().click();
  }

  async clickProductCard(productName: string): Promise<void> {
    await this.getProductCard(productName).click();
  }

  async searchFor(query: string): Promise<void> {
    await this.searchInput.fill(query);
    await this.searchInput.press('Enter');
  }
}
