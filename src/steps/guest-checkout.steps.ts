import { expect, type Page } from '@playwright/test';
import { createBdd } from 'playwright-bdd';
import { test } from '../fixtures';
import type { GuestCheckoutDetails } from '../pages/checkout_page';
import { generateRandomEmail } from '../utils/random_email';

const { Given, When, Then } = createBdd(test);

const checkoutAvailabilityByPage = new WeakMap<Page, boolean>();

const guestCheckoutDetails: GuestCheckoutDetails = {
  email: generateRandomEmail(),
  fullName: 'Test Guest',
  address: '123 Test Street',
  city: 'Testville',
  postalCode: '12345',
  cardNumber: '4242424242424242',
  expirationDate: '12/30',
  securityCode: '123',
};

Given('the guest user is viewing the product catalog', async ({ pages }) => {
  await pages.catalogPage.open(process.env.BASE_CATALOG_URL);
  await pages.catalogPage.waitForCatalogLoaded();
});

When('the guest user adds {string} to the cart', async ({ pages }, productName: string) => {
  await pages.catalogPage.clickAddToCartByName(productName);
  await expect(pages.catalogPage.page.getByTestId('toast')).toContainText(
    `${productName} added to your cart.`,
  );
});

Then(
  'the cart should contain {string} with quantity {int}',
  async ({ pages }, productName: string, quantity: number) => {
    const productId = await pages.catalogPage.getProductIdByName(productName);
    await pages.cartPage.open();
    await expect(pages.cartPage.getCartItem(productId)).toBeVisible();
    await expect(pages.cartPage.getItemQuantity(productId)).toHaveValue(String(quantity));
  },
);

Given('the guest user has an empty cart', async ({ pages }) => {
  await pages.catalogPage.open(process.env.BASE_CATALOG_URL);
  await pages.catalogPage.waitForCatalogLoaded();
  await pages.cartPage.open();
  await expect(pages.cartPage.emptyCartMessage).toBeVisible();
});

When('the guest user proceeds to checkout', async ({ page, pages }) => {
  const isAvailable = await pages.cartPage.isCheckoutAvailable();
  checkoutAvailabilityByPage.set(page, isAvailable);
  if (isAvailable) {
    await pages.cartPage.proceedToCheckout();
  }
});

Then('the guest checkout option should be available without signing in', async ({ pages }) => {
  await expect(pages.checkoutPage.guestCheckoutOption).toBeVisible();
});

When('the guest user enters valid contact, shipping, and payment details', async ({ pages }) => {
  await pages.checkoutPage.continueAsGuest();
  await pages.checkoutPage.fillGuestDetails(guestCheckoutDetails);
});

When('the guest user places the order', async ({ pages }) => {
  await pages.checkoutPage.placeOrder();
});

Then('an order confirmation should be displayed', async ({ pages }) => {
  await expect(pages.orderConfirmationPage.confirmationHeading).toBeVisible();
});

Then('the confirmation should include an order reference', async ({ pages }) => {
  await expect(pages.orderConfirmationPage.orderReference).toHaveText(/\S+/);
});

Then('the cart should be empty', async ({ pages }) => {
  await pages.cartPage.open();
  await expect(pages.cartPage.emptyCartMessage).toBeVisible();
});

Then('checkout should not be available', async ({ page }) => {
  expect(checkoutAvailabilityByPage.get(page)).toBe(false);
});

Then('the guest user should be prompted to add a product to the cart', async ({ pages }) => {
  await expect(pages.cartPage.addProductPrompt).toBeVisible();
});