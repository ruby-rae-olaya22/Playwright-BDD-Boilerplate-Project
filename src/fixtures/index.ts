import { test as base } from 'playwright-bdd';
import { PageObjectManager } from '../pages/pageObjectManager';

export const test = base.extend<{ pages: PageObjectManager }>({
  pages: async ({ page }, use) => {
    await use(new PageObjectManager(page));
  },
});

export { expect } from '@playwright/test';
