import { Page, Locator } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly cartItems: Locator;
  readonly emptyCartMessage: Locator;
  readonly addProductPrompt: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartItems = page.getByRole('region', { name: 'Cart items' });
    this.emptyCartMessage = page.getByTestId('empty-cart-message');
    this.addProductPrompt = page.getByText(/add .* to (your )?cart/i);
    this.checkoutButton = page.getByRole('button', { name: /checkout/i });
  }

  async open(): Promise<void> {
    await this.page.getByTestId('cart-link').click();
  }

  getCartItem(productId: string): Locator {
    return this.cartItems.getByTestId(`cart-item-${productId}`);
  }

  getItemQuantity(productId: string): Locator {
    return this.getCartItem(productId).getByTestId(`qty-input-${productId}`);
  }

  async isEmpty(): Promise<boolean> {
    return this.emptyCartMessage.isVisible();
  }

  async isCheckoutAvailable(): Promise<boolean> {
    if (!(await this.checkoutButton.isVisible())) return false;
    return this.checkoutButton.isEnabled();
  }

  async proceedToCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }
}
