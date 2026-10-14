# Using AI skills when prompting

An AI skill is a set of task-specific instructions in a `SKILL.md` file. It tells the assistant when the workflow applies, what information it needs, and how to shape its output. In this repository, skills live under `.agents/skills/<skill-name>/`.

## Choose the right skill

Start with the skill's description and its **When to Use**, **Inputs**, and **Output** sections. Choose a skill when its purpose matches the work you want done; a skill is not a general-purpose command for unrelated tasks.

This repository currently contains:

| Skill | Use it for |
| --- | --- |
| `qa-test-case-generator` | Turning a feature description into assumptions, product clarification questions, and comprehensive Playwright-BDD-compatible Gherkin test scenarios. |
| `playwright-page-object-generator` | Generating Playwright-TypeScript page object classes with resilient locators and registering the page in `PageObjectManager`. |
| `playwright-bdd-step-generator` | Turning a Gherkin `.feature` file + an existing page object file into Playwright-BDD step definitions (`src/steps/*.steps.ts`) that drive the page object. |

As more skills are added, list them here with a short summary of when to use each.

## Invoke a skill

In a VS Code chat that supports agent skills, you can:

1. **Select it directly:** type `/` and choose the skill by name if it appears in the picker. For example, choose `/qa-test-case-generator`.
2. **Ask for the task naturally:** describe the work and include the skill's key terms. The assistant may load a matching skill automatically when automatic skill invocation is enabled.
3. **Be explicit when needed:** name the skill in your prompt if you want a particular workflow, or if more than one skill could apply.

Skill availability and slash-command behavior depend on the chat host and its configuration. If the skill is not available in the picker, make sure the repository is open in the supported environment and that the skill is installed or otherwise discoverable there.

## Give the skill useful input

Include the information named by the skill. Be specific about the feature, expected behavior, constraints, and desired output. If required details are missing, ask the assistant to state assumptions and identify questions instead of silently inventing requirements.

For `qa-test-case-generator`, provide at least:

- **Feature name**
- **Functional description**

Useful additional context includes target users, UI or API behavior, validation rules, authentication and permissions, error handling, state transitions, rate limits, and any project-specific test conventions.

### Example: QA test generation

```text
/qa-test-case-generator

Feature name: Password reset
Functional description: A signed-in user can request a password reset email
                  and use a time-limited link to set a new password.

Context:
- The reset link expires after 30 minutes and can be used once.
- Do not reveal whether an email address has an account.
- Cover UI behavior, API responses, validation, failures, and security cases.

Return assumptions and product questions first, followed by tagged,
Playwright-BDD-compatible Gherkin scenarios with measurable expected outcomes.
```

If you invoke the skill from the picker, you can omit the slash-command line and provide the rest of the prompt.

### Example: automatic skill discovery for generating test scenarios in a gherkin format

```text
Create Gherkin test cases for the checkout feature. Include assumptions,
open product questions, happy paths, validation and network failures, and
security-relevant scenarios. The feature lets a customer apply a discount
code before placing an order.
```


For `playwright-page-object-generator`, provide at least:

- **Page Name**
- **File Name**
- **Elements**

Useful additional context includes base URL/navigation flow, label/placeholder/role text, required vs optional fields, native HTML5 vs custom error handling, existing `PageObjectManager` content, and locator constraints (getByRole priority, no XPath).

### Example: Page object generation

```text
/playwright-page-object-generator

Task: Create page object for Search Loan Application page
Context: Playwright-TypeScript, files in src/pages/, register in PageObjectManager
Elements:
- username input #username "Enter your username here.."
- password input "Enter your password here.."
- Sign In button
- "No data found." exact-text label
Output: src/pages/search_loan_application_page.ts + updated pageObjectManager.ts + usage snippet
```

### Example: automatic skill discovery for generating page object

```text
Generate locators for the login page and wire it into PageObjectManager. Username textbox, password textbox, Sign In button, No data found label. Follow getByRole priority, no XPath.
```

For `playwright-bdd-step-generator`, provide at least:

- **Feature File** (full `.feature` text or path under `src/features/`)
- **Page Object File** (full `src/pages/*.ts` text or path)
- **PageObjectManager Getter** (e.g. `pages.searchLoanApplicationPage`) if known

### Example: Convert the feature and page object into steps:

```text
/playwright-bdd-step-generator

Feature File: src/features/search_loan_application.feature
Page Object File: src/pages/search_loan_application_page.ts
PageObjectManager Getter: pages.searchLoanApplicationPage

Return the coverage map followed by src/steps/search_loan_application.steps.ts
using createBdd(test), pages.<getter> calls only, and expect() in steps.
Flag any Gherkin step with no matching page method under Missing Coverage.
```

### Example: automatic skill discovery for generating steps from the feature + page object files

```text
Generate step definitions for the search loan application feature file in src/features/search_loan_application.feature using the existing page object in src/pages/search_loan_application_page.ts. Write src/steps/search_loan_application.steps.ts with Playwright-BDD Given/When/Then definitions that call pages.searchLoanApplicationPage methods only, assert with expect() in the steps, and flag any Gherkin step with no matching page method under Missing Coverage.
```


## Prompting for other skills

Use this pattern and replace the bracketed text with the selected skill's actual requirements:

```text
/<skill-name>

Task: [what you want completed]
Context: [relevant product, codebase, or user information]
Constraints: [rules, boundaries, or conventions to follow]
Output: [format and level of detail you want]
```

When a skill lists required inputs, provide them explicitly. When a skill defines an output format, request it by name if the format matters. Avoid combining unrelated tasks into one prompt; use the skill that owns the main workflow, then request any complementary work separately.

## Tips

- **Describe the outcome, not just the role.** “Write test cases for account lockout after five failed logins” is more actionable than “act as a QA expert.”
- **State boundaries.** Say which platforms, user states, integrations, or scenarios are in or out of scope.
- **Request verifiable results.** For tests, specify observable UI outcomes, API status codes, payload expectations, or other measurable criteria.
- **Review generated assumptions.** Resolve important product questions before treating generated scenarios as final requirements.
- **Ask for a revision with concrete feedback.** For example: “Add cases for expired links and repeated use, and keep every scenario independently executable.”
