import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';

import { test } from '../support/fixtures';
export const { Given, When, Then } = createBdd(test);

// Helper to resolve string values or environment variable keys dynamically
function getEnvValue(key: string): string {
    return process.env[key] || key;
}

Given('the user opens the landing page', async ({ pages }) => {
    await pages.landingPage.open(getEnvValue('BASE_URL'));
});

Then('the browser title should contain {string}', async ({ page }, keyword) => {
    await expect(page).toHaveTitle(new RegExp(keyword));
});

Then('the landing page heading should be visible', async ({ pages }) => {
    await pages.landingPage.isHeadingVisible();
});

Then('the hero text "Budget Tracker" should be visible', async ({ pages }) => {
    await pages.landingPage.isHeroTextVisible();
});

Then('the landing page description should mention "Sign in with Google or Apple"', async ({ pages }) => {
    await pages.landingPage.isDescriptionVisible();
});

Then('the "Download on the App Store" button should be visible', async ({ pages }) => {
    await pages.landingPage.isDownloadOnTheAppStoreVisible();
});

Then('the "Get it on Google Play" button should be visible', async ({ pages }) => {
    await pages.landingPage.isGetItOnTheGooglePlayVisible();
});

Then('both store buttons should expose the expected labels', async ({ pages }) => {
    const appStoreLabel = await pages.landingPage.downloadAppStoreLink.textContent();
    const googlePlayLabel = await pages.landingPage.googlePlayLink.textContent(); 
});

When('the user clicks the "Get it on Google Play" button', async ({ pages }) => {
    await pages.landingPage.clickGetItOnGooglePlay();
});

Then('the Google Play Store should be opened', async ({ page }) => {
    const newTabPromise = page.context().waitForEvent('page');
    const newPage = await newTabPromise;
    await expect(newPage).toHaveURL(/https:\/\/play\.google\.com\/store\/apps\/details\?id=com\.tarsi\.app/);
});

When('the user clicks the "Download on the App Store" button', async ({ pages }) => {
    await pages.landingPage.clickDownloadOnTheAppStore();
});

Then('the Apple App Store should be opened', async ({ page }) => {
    const newTabPromise = page.context().waitForEvent('page');
    const newPage = await newTabPromise;
    await expect(newPage).toHaveURL(/apps\.apple\.com\/us\/app\/tarsi-budget-tracker\/id6760278399/);
});

Then('the "Sign in with Google" button should be visible', async ({ pages }) => {
    await pages.landingPage.isSignInWithGoogleVisible();
});

Then('the "Sign in with Apple" button should be visible', async ({ pages }) => {
    await pages.landingPage.isSignInWithAppleVisible();
});

Then('the "Choose JSON or CSV" button should be visible', async ({ pages }) => {
    await pages.landingPage.isChooseJsonOrCsvVisible();
});

Then('the "Start with a demo" link should be visible', async ({ pages }) => {
    await pages.landingPage.isStartWithDemoVisible();
});

When('the user clicks the "Start with a demo" link', async ({ pages }) => {
    await pages.landingPage.clickStartWithDemo();
});

Then('the demo flow should begin or the demo page should be displayed', async ({ pages }) => {
    await pages.demoPage.isHeadingVisible();
    await pages.demoPage.isHeroTextVisible();
});

When('the user clicks the "Sign in with Google" button', async ({ pages }) => {
    await pages.landingPage.clickSignInWithGoogle();
});

Then('the Google sign-in flow or redirect should begin', async ({ page }) => {
    // Verify that the Google sign-in page is displayed
    await expect(page).toHaveURL(/accounts\.google\.com/);
    const emailField = page.getByRole('textbox', { name: 'Email or phone' });
    const accountSelector = page.getByText('Choose an account', { exact: false });

    await expect(emailField.or(accountSelector)).toBeVisible({ timeout: 7000 });
});

When('the user clicks the "Sign in with Apple" button', async ({ pages }) => {
    await pages.landingPage.clickSignInWithApple();
});

Then('the Apple sign-in flow or redirect should begin', async ({ page }) => {
    // Verify that the Apple sign-in page is displayed
    await expect(page).toHaveURL(/.*appleid\.apple\.com.*/);
    const appleIdInput = page.getByRole('textbox', { name: 'Email or Phone Number' });
    const continueButton = page.getByRole('button', { name: 'Sign in with iPhone' });

    await expect(appleIdInput.or(continueButton)).toBeVisible({ timeout: 7000 });
});

When('the user clicks the "Choose JSON or CSV" button', async ({ pages }) => {
    await pages.landingPage.clickChooseJsonOrCsv();
});

Then('a file picker or import dialog should appear', async ({ page }) => { // Try if it works
    // 1. Set up the event listener promise (Do not use 'await' here)
    const fileChooserPromise = page.waitForEvent('filechooser');

    // 2. Trigger the action that opens the file explorer
    await page.getByRole('button', { name: 'Upload Files' }).click();

    // 3. Await the event to verify it successfully opened
    const fileChooser = await fileChooserPromise;

    // 4. (Optional) Pass files to the dialog to continue your test workflow
    await fileChooser.setFiles('path/to/your/file.txt');
});

// When('the user logs in using an invalid credential', async ({ pages }) => {
//   await pages.loginPage.fillCredentials({
//     username: generateRandomText(12),
//     password: generateRandomText(12),
//   });
// });

// When('the user leaves {string} blank', async ({ pages }, field: string) => {
//   await pages.loginPage.fillCredentials({
//     username: '',
//     password: '',
//   });
// });

// When('the user submits the login form', async ({ pages }) => {
//   await pages.loginPage.clickSignIn();
// });

// When('the user has not configured biometrics, the prompt text contains {string}', async ({ pages }, expectedText: string) => {
//   await pages.loginPage.verifyBiometricPromptText(expectedText);
// });

// When('the UI displays an inline validation error for {string}', async ({ pages }, field: string) => {
//   await pages.loginPage.verifyRequiredFieldError(pages.loginPage.txtUsername);
//   await pages.loginPage.verifyRequiredFieldError(pages.loginPage.txtPassword);
// });

// When('the UI displays "Invalid username or password."', async ({ pages }) => {
//   await pages.loginPage.verifyInvalidCredentialsMessage();
// });

// Then('the user is not redirected directly to the dashboard', async ({ pages }) => {
//   await pages.loginPage.verifyNotOnDashboard();
// });

// Then('the biometric setup prompt closes', async ({ pages }) => {
//   await pages.loginPage.verifyBiometricPromptClosed();
// });

// When('the dashboard is displayed', async ({ pages }) => {
//   await pages.dashboardPage.verifyDashboardDisplayed();
// });