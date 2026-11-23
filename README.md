# Playwright BDD Catalog Tests

This repository contains a TypeScript end-to-end test suite for the Catalog page on [The Test Automation Website](https://joanesquivel.github.io/the-test-automation-website/shop/catalog). Scenarios are written in Gherkin and run with Playwright through `playwright-bdd`.

## What the tests cover

- Catalog display, product search, category filtering, sorting, pagination, cart actions, product details, and deep links
- Empty states and invalid or tampered query parameters
- Products and categories API responses and catalog query parameters
- Search-input handling, keyboard navigation, accessible product links, and a mobile viewport

The security-tagged scenarios are focused input and query-parameter checks; they are not a comprehensive security audit. The Playwright configuration currently enables Chromium only.

## Project structure

```text
├── .github/
│   └── workflows/                    # GitHub Actions workflows
├── features/                         # Gherkin scenarios
├── src/
│   ├── fixtures/                     # Shared Playwright-BDD fixtures
│   ├── pages/                        # Page objects; add one module per application page
│   └── steps/                        # Gherkin bindings; add modules per feature or domain
├── .features-gen/                    # Generated BDD tests
├── test-results/                     # Test results and artifacts
└── playwright-report/                # HTML report
```

Add page objects in `src/pages/`, shared test fixtures in `src/fixtures/`, and step definitions in `src/steps/`. The BDD configuration discovers step and fixture TypeScript files recursively, so they can be grouped into subfolders by feature or domain. Generated tests, results, and reports are placed in their corresponding output folders shown above.

## Requirements and installation

- Node.js and npm

Install dependencies and the configured browser:

```bash
npm ci
npx playwright install chromium
```

## Configuration

The Playwright configuration loads variables from a root-level environment file using `dotenv`. Set the catalog URL for the environment you want to test:

```env
BASE_URL=https://joanesquivel.github.io/the-test-automation-website/shop/catalog
BASE_CATALOG_URL=https://joanesquivel.github.io/the-test-automation-website/shop/catalog
```

`BASE_URL` configures Playwright's `baseURL`; `BASE_CATALOG_URL` is used by the catalog steps. The page object also has a fallback to the public catalog URL when opening the landing page.

## Run the tests

Generate the Playwright tests from the Gherkin feature and run them:

```bash
npm run test:bdd
```

Open the HTML report after a run:

```bash
npx playwright show-report
```

## Continuous integration

The GitHub Actions workflow runs for pushes and pull requests targeting `main` or `master`. It installs dependencies and Playwright browsers, runs `npx playwright test`, and uploads `playwright-report/` as an artifact for up to 30 days.
