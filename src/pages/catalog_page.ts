import { Page, Locator } from '@playwright/test';

/**
 * Page Object for the Catalog landing page
 * (https://joanesquivel.github.io/the-test-automation-website/shop/catalog).
 *
 * Covers search, category filtering, sorting, pagination, add-to-cart and
 * navigation to product details. No assertions live here; state is returned
 * to the step definitions.
 */
export class CatalogPage {
  readonly page: Page;

  // ---- Header / intro ----
  readonly pageIntro: Locator;
  readonly catalogHeading: Locator;

  // ---- Filters ----
  readonly searchBox: Locator;
  readonly sortDropdown: Locator;
  readonly categoryChips: Locator;
  readonly categoryChipAll: Locator;

  // ---- Results ----
  readonly resultCount: Locator;
  readonly productCards: Locator;
  readonly emptyState: Locator;
  readonly clearFiltersButton: Locator;
  readonly outOfStockErrorMessage: Locator;

  // ---- Pagination ----
  readonly paginationNav: Locator;
  readonly paginationPrev: Locator;
  readonly paginationNext: Locator;
  readonly paginationStatus: Locator;

  // ---- Cart ----
  readonly cartLink: Locator;
  readonly cartCount: Locator;

  constructor(page: Page) {
    this.page = page;

    this.pageIntro = page.getByTestId('page-intro');
    this.catalogHeading = page.getByRole('heading', { name: 'Catalog', exact: true });
    this.searchBox = page.getByTestId('catalog-search');
    this.sortDropdown = page.getByTestId('catalog-sort');
    this.categoryChips = page.locator('[data-testid^="category-chip-"]');
    this.categoryChipAll = page.getByTestId('category-chip-all');

    this.resultCount = page.getByTestId('catalog-result-count');
    this.productCards = page.locator('[data-testid^="product-card-"]');
    this.emptyState = page.getByText('No products match your filters', { exact: true });
    this.clearFiltersButton = page.getByTestId('clear-filters');
    this.outOfStockErrorMessage = page.getByText('This product is out of stock', {
      exact: true,
    });

    this.paginationNav = page.getByTestId('catalog-pagination');
    this.paginationPrev = page.getByTestId('pagination-prev');
    this.paginationNext = page.getByTestId('pagination-next');
    this.paginationStatus = page.getByTestId('pagination-status');

    this.cartLink = page.getByTestId('cart-link');
    this.cartCount = page.getByTestId('cart-count');
  }

  // ---- Navigation ----
  async open(url?: string): Promise<void> {
    const base =
      process.env.BASE_URL ||
      'https://joanesquivel.github.io/the-test-automation-website/shop/catalog';

    let targetUrl = base;
    if (!url || url.trim() === '' || url === '/shop/catalog') {
      targetUrl = base;
    } else if (/^https?:\/\//i.test(url)) {
      targetUrl = url;
    } else {
      // Relative path or query string: resolve against BASE_URL so the
      // hosted base path (/the-test-automation-website) is preserved.
      const queryIndex = url.indexOf('?');
      const query = queryIndex >= 0 ? url.slice(queryIndex) : '';
      const hashIndex = url.indexOf('#');
      const hash = hashIndex >= 0 ? url.slice(hashIndex) : '';
      targetUrl = base + query + hash;
    }

    await this.page.goto(targetUrl);
    await this.waitForCatalogLoaded();
  }

  async waitForCatalogLoaded(): Promise<void> {
    await this.page.waitForFunction(() => {
      const text = document
        .querySelector('[data-testid="catalog-result-count"]')
        ?.textContent?.trim();
      return /^\d+ product\(s\) found$/.test(text ?? '');
    });
  }

  // ---- Filters ----
  async search(term: string): Promise<void> {
    await this.searchBox.fill(term);
    await this.waitForCatalogLoaded();
  }

  async selectSort(label: string): Promise<void> {
    await this.sortDropdown.selectOption({ label });
    await this.waitForCatalogLoaded();
  }

  async selectCategory(name: string): Promise<void> {
    await this.page
      .getByRole('button', { name: new RegExp(name, 'i') })
      .first()
      .click();
  }

  async clearFilters(): Promise<void> {
    await this.clearFiltersButton.click();
    await this.page
      .waitForURL((url) => !url.searchParams.has('search') && !url.searchParams.has('category'), {
        timeout: 5000,
      })
      .catch(() => {});
  }

  // ---- Pagination ----
  async clickNext(): Promise<void> {
    await this.paginationNext.click();
    await this.page
      .waitForURL((url) => url.searchParams.get('page') === '2', { timeout: 5000 })
      .catch(() => {});
    await this.page
      .waitForFunction(
        () => {
          const el = document.querySelector('[data-testid="pagination-status"]');
          return !!el && /Page 2 of/.test(el.textContent || '');
        },
        { timeout: 5000 },
      )
      .catch(() => {});
  }

  async clickPrevious(): Promise<void> {
    await this.paginationPrev.click();
    await this.page
      .waitForURL((url) => url.searchParams.get('page') === '1', { timeout: 5000 })
      .catch(() => {});
    await this.page
      .waitForFunction(
        () => {
          const el = document.querySelector('[data-testid="pagination-status"]');
          return !!el && /Page 1 of/.test(el.textContent || '');
        },
        { timeout: 5000 },
      )
      .catch(() => {});
  }

  // ---- Cart ----
  async clickAddToCart(productId: string): Promise<void> {
    await this.page.getByTestId(`add-to-cart-${productId}`).click();
  }

  async isProductOutOfStock(productId: string): Promise<boolean> {
    const stockLabel = await this.getStockBadge(productId).innerText();
    return /out of stock/i.test(stockLabel.trim());
  }

  async isAddToCartDisabled(productId: string): Promise<boolean> {
    return this.getAddToCartButton(productId).isDisabled();
  }

  async clickAddToCartByName(productName: string): Promise<void> {
    const productId = await this.getProductIdByName(productName);
    await this.clickAddToCart(productId);
  }

  async clickAddToCartAndGetLabelChange(
    productName: string,
  ): Promise<{ before: string; after: string }> {
    const productId = await this.getProductIdByName(productName);
    const testId = `add-to-cart-${productId}`;
    const button = this.getAddToCartButton(productId);
    const before = (await button.innerText()).trim();

    await button.click();
    await this.page.waitForFunction(
      ({ buttonTestId, previousLabel }) => {
        const currentButton = Array.from(
          document.querySelectorAll<HTMLElement>('[data-testid]'),
        ).find((element) => element.dataset.testid === buttonTestId);
        return currentButton !== undefined && currentButton.innerText.trim() !== previousLabel;
      },
      { buttonTestId: testId, previousLabel: before },
    );

    return { before, after: (await button.innerText()).trim() };
  }

  async clickProductName(productName: string): Promise<void> {
    const productId = await this.getProductIdByName(productName);
    await this.page.getByTestId(`product-name-${productId}`).click();
  }

  // ---- Resolvers ----
  async getProductIdByName(name: string): Promise<string> {
    await this.waitForCatalogLoaded();
    const productId = await this.page.evaluate((productName) => {
      const card = Array.from(document.querySelectorAll('[data-testid^="product-card-"]')).find((el) =>
        (el.textContent || '').includes(productName),
      );
      const testId = card?.getAttribute('data-testid');
      return testId?.startsWith('product-card-') ? testId.slice('product-card-'.length) : null;
    }, name);

    if (!productId) {
      throw new Error(`Product "${name}" was not found in the loaded catalog`);
    }

    return productId;
  }

  // ---- State getters ----
  async getResultCountText(): Promise<string> {
    return (await this.resultCount.textContent())?.trim() || '';
  }

  async getProductCardCount(): Promise<number> {
    return this.productCards.count();
  }

  async getProductNames(): Promise<string[]> {
    return this.page
      .locator('[data-testid^="product-name-"]')
      .allTextContents();
  }

  async getProductPrices(): Promise<number[]> {
    const texts = await this.page
      .locator('[data-testid^="product-price-"]')
      .allTextContents();
    return texts.map((t) => parseFloat(t.replace(/[^0-9.]/g, '')));
  }

  async getProductRatings(): Promise<number[]> {
    const texts = await this.page
      .locator('[data-testid^="product-rating-"]')
      .allTextContents();
    return texts.map((t) => {
      const m = t.match(/(\d+(?:\.\d+)?)/);
      return m ? parseFloat(m[1]) : 0;
    });
  }

  async getProductLinkAriaLabels(): Promise<(string | null)[]> {
    const links = this.page.locator('[data-testid^="product-link-"]');
    const count = await links.count();
    const result: (string | null)[] = [];
    for (let i = 0; i < count; i++) {
      result.push(await links.nth(i).getAttribute('aria-label'));
    }
    return result;
  }

  async getPaginationStatusText(): Promise<string | null> {
    if (await this.paginationStatus.count() === 0) return null;
    return (await this.paginationStatus.textContent())?.trim() || null;
  }

  async isPreviousDisabled(): Promise<boolean> {
    return this.paginationPrev.isDisabled();
  }

  async isNextDisabled(): Promise<boolean> {
    return this.paginationNext.isDisabled();
  }

  async isNextEnabled(): Promise<boolean> {
    return this.paginationNext.isEnabled();
  }

  async getCartCount(): Promise<string> {
    return (await this.cartCount.textContent())?.trim() || '';
  }

  async getSortValue(): Promise<string> {
    return this.sortDropdown.inputValue();
  }

  async getSearchValue(): Promise<string> {
    return this.searchBox.inputValue();
  }

  async getActiveCategoryChip(): Promise<string | null> {
    const active = this.page.locator('[data-testid^="category-chip-"][aria-pressed="true"]');
    if ((await active.count()) === 0) return null;
    return active.first().getAttribute('data-testid');
  }

  async isEmptyStateVisible(): Promise<boolean> {
    return this.emptyState.isVisible();
  }

  async isClearFiltersVisible(): Promise<boolean> {
    return this.clearFiltersButton.isVisible();
  }

  // ---- Locators for a specific product ----
  getProductCard(productId: string): Locator {
    return this.page.getByTestId(`product-card-${productId}`);
  }

  getProductNameLink(productId: string): Locator {
    return this.page.getByTestId(`product-name-${productId}`);
  }

  getProductPrice(productId: string): Locator {
    return this.page.getByTestId(`product-price-${productId}`);
  }

  getProductRating(productId: string): Locator {
    return this.page.getByTestId(`product-rating-${productId}`);
  }

  getStockBadge(productId: string): Locator {
    return this.page.getByTestId(`stock-badge-${productId}`);
  }

  getAddToCartButton(productId: string): Locator {
    return this.page.getByTestId(`add-to-cart-${productId}`);
  }
}
