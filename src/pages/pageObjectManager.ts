import { Page } from '@playwright/test';
import { CatalogPage } from './catalog_page';
import { CartPage } from './cart_page';
import { CheckoutPage } from './checkout_page';
import { OrderConfirmationPage } from './order_confirmation_page';

export class PageObjectManager {
  constructor(private readonly page: Page) {}

  private _catalogPage?: CatalogPage;
  private _cartPage?: CartPage;
  private _checkoutPage?: CheckoutPage;
  private _orderConfirmationPage?: OrderConfirmationPage;

  get catalogPage(): CatalogPage {
    return (this._catalogPage ??= new CatalogPage(this.page));
  }

  get cartPage(): CartPage {
    return (this._cartPage ??= new CartPage(this.page));
  }

  get checkoutPage(): CheckoutPage {
    return (this._checkoutPage ??= new CheckoutPage(this.page));
  }

  get orderConfirmationPage(): OrderConfirmationPage {
    return (this._orderConfirmationPage ??= new OrderConfirmationPage(this.page));
  }
}
