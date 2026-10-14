import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';
import { test } from '../support/fixtures';

export const { Given, When, Then } = createBdd(test);

function getEnvValue(key: string): string {
  return process.env[key] || key;
}

// ---------- Given ----------

Given('the user opens the landing page', async ({ pages }) => {
  await pages.landingPage.open(getEnvValue('BASE_URL'));
});

// ---------- Title / headings ----------

Then('the browser title should contain {string}', async ({ page }, keyword: string) => {
  await expect(page).toHaveTitle(new RegExp(keyword));
});

Then('the page heading {string} should be visible', async ({ pages }, heading: string) => {
  // Logo is an image-only link: "Sauce Demo" lives in the img alt /
  // accessible name, not in text content, so assert alt + visibility.
  await expect(pages.landingPage.websiteLogoLink).toBeVisible();
  await expect(pages.landingPage.websiteLogoImage).toBeVisible();
  await expect(pages.landingPage.websiteLogoImage).toHaveAttribute('alt', heading);
  await expect(pages.landingPage.pageTitle).toBeVisible();
});

Then('the page subtitle {string} should be visible', async ({ pages }, subtitle: string) => {
  await expect(pages.landingPage.taglineHeading).toBeVisible();
  await expect(pages.landingPage.taglineHeading).toContainText(subtitle);
});

// ---------- Links / nav visibility ----------

Then('the {string} navigation link should be visible', async ({ pages }, name: string) => {
  await expect(pages.landingPage.getSideMenuLink(name)).toBeVisible();
});

Then('the {string} link should be visible', async ({ pages }, name: string) => {
  // Covers header links: Log In, Sign up, My Cart (0), Check Out
  const headerLink = pages.landingPage.page.locator('header').getByRole('link', { name });
  const sideLink = pages.landingPage.getSideMenuLink(name);
  await expect(headerLink.or(sideLink).first()).toBeVisible();
});

Then(
  'the product cards {string}, {string}, and {string} should be visible',
  async ({ pages }, p1: string, p2: string, p3: string) => {
    for (const name of [p1, p2, p3]) {
      await expect(pages.landingPage.getProductCard(name)).toBeVisible();
      await expect(pages.landingPage.getProductImage(name)).toBeVisible();
    }
  }
);

// ---------- Clicks ----------

When('the user clicks the {string} navigation link', async ({ pages }, name: string) => {
  await pages.landingPage.clickSideMenuLink(name);
});

When('the user clicks the {string} link', async ({ pages }, name: string) => {
  // Header-scoped first (Log In), falls back to side menu
  const headerLink = pages.landingPage.page
    .locator('header')
    .getByRole('link', { name, exact: true });
  if ((await headerLink.count()) > 0) {
    await headerLink.first().click();
  } else {
    await pages.landingPage.clickSideMenuLink(name);
  }
});

When('the user clicks the {string} product card', async ({ pages }, name: string) => {
  await pages.landingPage.clickProductCard(name);
});

When('the user searches for {string}', async ({ pages }, query: string) => {
  await pages.landingPage.searchFor(query);
});

// ---------- Collection / catalog ----------

Then('the product collection page should be displayed', async ({ page }) => {
  await expect(page).toHaveURL(/\/collections\/all/);
});

Then('the collection title or catalog layout should be visible', async ({ page }) => {
  const title = page.getByRole('heading', { name: /catalog|collection|products/i });
  const grid = page.locator('section.product-grid, .product-grid, #main');
  await expect(title.or(grid).first()).toBeVisible();
});

// ---------- About Us ----------

Then('the About Us page should be displayed', async ({ page }) => {
  await expect(page).toHaveURL(/\/pages\/about-us/);
});

Then('the page should contain Sauce brand information', async ({ page }) => {
  await expect(page.getByText(/Sauce/i).first()).toBeVisible();
});

// ---------- Product detail ----------

Then('the product detail page for {string} should be displayed', async ({ page }, name: string) => {
  const slug = name.toLowerCase().replace(/\s+/g, '-');
  await expect(page).toHaveURL(new RegExp(`/products/${slug}`));
  await expect(page.getByRole('heading', { name: new RegExp(name, 'i') }).first()).toBeVisible();
});

Then('the price {string} should be visible', async ({ page }, price: string) => {
  await expect(page.getByText(price).first()).toBeVisible();
});

Then('the add-to-cart action should be available', async ({ page }) => {
  const addToCart = page.getByRole('button', { name: /add to cart/i });
  await expect(addToCart).toBeVisible();
  await expect(addToCart).toBeEnabled();
});

// ---------- Login ----------

Then('the login page should be displayed', async ({ page }) => {
  await expect(page).toHaveURL(/\/account\/login/);
});

// ---------- Search results ----------

Then('the search results page should show matching product results', async ({ page }) => {
  await expect(page).toHaveURL(/\/search/);
  const results = page.locator('section.product-grid, .product-grid, #main, [class*="result"]');
  await expect(results.first()).toBeVisible();
});

Then('the search results should include {string} or {string}', async ({ page }, p1: string, p2: string) => {
  const first = page.getByText(new RegExp(p1, 'i')).first();
  const second = page.getByText(new RegExp(p2, 'i')).first();
  await expect(first.or(second).first()).toBeVisible();
});
