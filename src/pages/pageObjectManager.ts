import { Page } from '@playwright/test';
import { CatalogPage } from './catalog_page';

export class PageObjectManager {
  constructor(private readonly page: Page) {}

  private _catalogPage?: CatalogPage;

  get catalogPage(): CatalogPage {
    return (this._catalogPage ??= new CatalogPage(this.page));
  }
}
