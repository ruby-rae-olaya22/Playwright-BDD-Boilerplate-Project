# Playwright + TypeScript + Cucumber Boilerplate

This project is intended as a boilerplate for using Playwright, TypeScript, and Playwright-BDD in a structured automation setup.

## Prerequisites

Make sure the following are already installed:

- Preferred IDE (for example, Visual Studio Code)
- Node.js
- Git
- Preferred AI tool for assistance

## Installation (if using the terminal)

Run the following commands in the project root:

```bash
npm init -y
npm init playwright@latest --with-deps
npm install -D playwright-bdd
npm install dotenv --save
npm i -g @playwright/cli@latest
npx playwright init-agents --loop=vscode
```

You may also convert this to a cucumber test runner but the workspace is currently utilizing the playwright-bdd to utilize the playwright test features, instead of manually configuring all of the cucumber ecosystem (assets, reporting tools, multi-language support, etc.)

If you need to do this in typescript, install the following
```bash
npm install -D ts-node typescript
npx tsc --init
```

## Recommended VS Code Extensions

If you are using Visual Studio Code, install the following extensions:

1. Playwright Test for VSCode by Microsoft
2. Cucumber by Cucumber

## VS Code Settings Update

To configure Cucumber properly in VS Code:

1. Go to File -> Preferences -> Settings
2. Expand Extensions -> Cucumber
3. Update the following settings:

```json
"cucumber.features": [
  "features/**/*.feature"
],
"cucumber.glue": [
  "src/step-definitions/**/*.ts"
]
```

## Project Structure

```text
config/
features/
.agents
  skills/
src/
  pages/
  step-definitions/
  support/
```

### Folder Descriptions

- config/: contains application and environment settings
- features/: contains what to test
- scripts/: contains helper utilities and automation scripts
- scripts/ai/: contains AI integration and related components
- .agents/skills/{skill name}/SKILL.md: contains reusable AI skills and workflows
- src/pages/: contains page locators and page actions
- src/step-definitions/: contains the implementation of feature steps
- src/support/: contains framework setup and hooks
- src/tests/.features-gen/.features/: contains the list of test steps that the playwright framework will use (generated after running the npm run test:bdd)

## Steps to Fork the Repository

1. Go to the repository page on GitHub.
2. Click the Fork button in the top-right corner.
3. Choose your GitHub account as the destination.
4. Clone your forked repository to your local machine.
5. Open the project in Visual Studio Code.
6. Install the dependencies using the commands listed above.

# How to use different AI template
## Initialize the AI persona for Test Case Generator
1. PIN or indicate the prompt file (scripts/ai/skills/test_case_generator.md) to use
2. Paste this in the chat thread wherein you'll change the Feature Name and the Functional Description
```textfield
Use the test_case_generator.md
Please generate the test suite using the template rules for the following feature:
FEATURE_NAME: {page}
FUNCTIONAL_DESCRIPTION: {acceptance criteria}
```

# Running the tests
1. Generate the tests from the specified step-definitions and run the test case
```bash
npm run test:bdd
```