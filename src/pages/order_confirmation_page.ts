import { Page, Locator } from '@playwright/test';

export class OrderConfirmationPage {
  readonly confirmationHeading: Locator;
  readonly orderReference: Locator;

  constructor(page: Page) {
    this.confirmationHeading = page.getByRole('heading', {
      name: /order confirmed|thank you/i,
    });
    this.orderReference = page.getByTestId('order-reference');
  }

  async isDisplayed(): Promise<boolean> {
    return this.confirmationHeading.isVisible();
  }

  async getOrderReference(): Promise<string> {
    return (await this.orderReference.textContent())?.trim() || '';
  }
}
