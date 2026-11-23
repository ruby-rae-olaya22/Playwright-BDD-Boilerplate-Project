# Playwright BDD Test Automation Suite

A robust, enterprise-grade test automation framework built with **Playwright-BDD** and **TypeScript** to validate the e-commerce web application [Sauce Demo Shopify Store](https://sauce-demo.myshopify.com/).

This project demonstrates a multi-layered testing strategy combining Behavioral Driven Development (BDD), UI automation using the **Page Object Model (POM)** pattern, direct **API integration tests**, and essential **Security audit checks**.

---

## Tech Stack & Key Technologies

- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Test Runner & Automation:** [Playwright](https://playwright.dev/)
- **BDD Framework:** [playwright-bdd](https://github.com/vitalets/playwright-bdd) (Cucumber / Gherkin syntax)
- **Reporting:** HTML Reports / Allure Reports
- **CI/CD:** GitHub Actions (ready)

---

## Framework Features & Architecture

- **Page Object Model (POM):** Clean separation between UI locators/actions and test scenarios for high maintainability.
- **Custom Fixtures & Helpers:** Context-aware Playwright fixtures to automatically inject page objects, API clients, and common utilities into test steps.
- **API Testing Layer:** Fast backend data preparation and standalone API endpoint assertions using Playwright's `APIRequestContext`.
- **Security Test Integration:** Standard security checks (e.g., OWASP headers inspection, XSS/SQLi payload injection checks, SSL checks, sensitive cookie flags).
- **Reusability & Utilities:** Shared helper functions for data generation, configuration management, and dynamic assertions.

---

## Directory Structure

```text
├── .github/
│   └── workflows/          # CI/CD pipeline configurations
├── features/               # Gherkin feature files (.feature)
│   ├── ui/                 # E-commerce UI user scenarios
│   ├── api/                # API functional validation scenarios
│   └── security/           # Security audit and vulnerability scenarios
├── src/
│   ├── fixtures/           # Custom Playwright-BDD fixtures
│   ├── helpers/            # Action wrappers & custom assertions
│   ├── pages/              # Page Object classes (UI locators & actions)
│   ├── steps/              # BDD Step definitions mapped to feature files
│   └── utils/              # Data generators, API clients, config helpers
├── playwright.config.ts    # Core Playwright execution settings
├── package.json
└── README.md
```

---

## Getting Started

### Prerequisites

Ensure you have the following installed locally:

- **Node.js** `>= 18.x`
- **npm** or **yarn**

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/playwright-bdd-saucedemo.git
   cd playwright-bdd-saucedemo
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Install Playwright Browsers:**
   ```bash
   npx playwright install --with-deps
   ```

---

## Configuration & Environment

Create a `.env` file in the root directory (optional, or use defaulted configs in `playwright.config.ts`):

```env
BASE_URL=https://sauce-demo.myshopify.com/
API_BASE_URL=https://sauce-demo.myshopify.com/api
HEADLESS=true
```

---

## Running Tests

### 1. Generate BDD Step Code
`playwright-bdd` translates `.feature` files into Playwright test files before execution:

```bash
npx bddgen
```

### 2. Execute All Tests
Run the entire test suite (UI, API, Security):

```bash
npm run test:bdd
```

### 3. Run Specific Test Suites

- **UI Tests only:**
  ```bash
  npm run test:ui
  ```

- **API Tests only:**
  ```bash
  npm run test:api
  ```

- **Security Scenarios only:**
  ```bash
  npm run test:security
  ```

- **Run in Headed Mode (Browser visible):**
  ```bash
  npm run test:headed
  ```

---

## Test Reporting

View the HTML execution report after running tests:

```bash
npx playwright show-report
```

---

## Standard Security Test Coverage

The security suite included in this framework evaluates standard web application hygiene:
- **HTTP Security Headers:** Validates `Content-Security-Policy`, `X-Frame-Options`, `Strict-Transport-Security`, and `X-Content-Type-Options`.
- **Cookie Security:** Verifies `HttpOnly`, `Secure`, and `SameSite` flags on session cookies.
- **Form Input Injection:** Basic resilience tests against XSS scripts and SQL injection payloads on search inputs and login forms.
- **CORS & Information Disclosure:** Checks for server header leaks (`Server`, `X-Powered-By`).

---

## Contributing

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## License

Distributed under the MIT License. See `LICENSE` for more information.