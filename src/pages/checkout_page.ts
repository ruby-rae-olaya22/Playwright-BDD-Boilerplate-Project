import { Page, Locator } from '@playwright/test';

export interface GuestCheckoutDetails {
  email: string;
  fullName: string;
  address: string;
  city: string;
  postalCode: string;
  cardNumber: string;
  expirationDate: string;
  securityCode: string;
}

export class CheckoutPage {
  readonly page: Page;
  readonly guestCheckoutOption: Locator;
  readonly emailInput: Locator;
  readonly fullNameInput: Locator;
  readonly addressInput: Locator;
  readonly cityInput: Locator;
  readonly postalCodeInput: Locator;
  readonly cardNumberInput: Locator;
  readonly expirationDateInput: Locator;
  readonly securityCodeInput: Locator;
  readonly placeOrderButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.guestCheckoutOption = page.getByTestId('proceed-to-checkout');
    this.emailInput = page.getByLabel('Email');
    this.fullNameInput = page.getByLabel('Full name');
    this.addressInput = page.getByLabel('Address');
    this.cityInput = page.getByLabel('City');
    this.postalCodeInput = page.getByLabel('Postal code');
    this.cardNumberInput = page.getByLabel('Card number');
    this.expirationDateInput = page.getByLabel('Expiration date');
    this.securityCodeInput = page.getByLabel('Security code');
    this.placeOrderButton = page.getByRole('button', {
      name: /place order|complete purchase/i,
    });
  }

  async isGuestCheckoutAvailable(): Promise<boolean> {
    return this.guestCheckoutOption.isVisible();
  }

  async continueAsGuest(): Promise<void> {
    await this.guestCheckoutOption.click();
  }

  async fillGuestDetails(details: GuestCheckoutDetails): Promise<void> {
    await this.emailInput.fill(details.email);
    await this.fullNameInput.fill(details.fullName);
    await this.addressInput.fill(details.address);
    await this.cityInput.fill(details.city);
    await this.postalCodeInput.fill(details.postalCode);
    await this.cardNumberInput.fill(details.cardNumber);
    await this.expirationDateInput.fill(details.expirationDate);
    await this.securityCodeInput.fill(details.securityCode);
  }

  async placeOrder(): Promise<void> {
    await this.placeOrderButton.click();
  }
}
