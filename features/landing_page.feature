Feature: Validate the Tarsi Web landing page UI and primary navigation actions
  As a visitor
  I want to see the landing page content and use the main buttons or links
  So that I can start the demo experience and verify the page loads correctly

  Scenario: Display the landing page with core branding and actions
    Given the user opens the landing page
    Then the browser title should contain "Tarsi"
    And the landing page heading should be visible
    And the hero text "Budget Tracker" should be visible
    And the landing page description should mention "Sign in with Google or Apple"
    And the "Download on the App Store" button should be visible
    And the "Get it on Google Play" button should be visible
    And the "Sign in with Google" button should be visible
    And the "Sign in with Apple" button should be visible
    And the "Choose JSON or CSV" button should be visible
    And the "Start with a demo" link should be visible

  Scenario: Navigate by clicking the Start with a demo link
    Given the user opens the landing page
    When the user clicks the "Start with a demo" link
    Then the demo flow should begin or the demo page should be displayed

  Scenario: Navigate to Google sign-in when clicking Sign in with Google
    Given the user opens the landing page
    When the user clicks the "Sign in with Google" button
    Then the Google sign-in flow or redirect should begin

  Scenario: Navigate to Apple sign-in when clicking Sign in with Apple
    Given the user opens the landing page
    When the user clicks the "Sign in with Apple" button
    Then the Apple sign-in flow or redirect should begin

  Scenario: Open file import when clicking Choose JSON or CSV
    Given the user opens the landing page
    When the user clicks the "Choose JSON or CSV" button
    Then a file picker or import dialog should appear
    # And the landing page should remain visible behind the import request

  Scenario: Verify app store download buttons are shown
    Given the user opens the landing page
    Then the "Download on the App Store" button should be visible
    And the "Get it on Google Play" button should be visible
    And both store buttons should expose the expected labels

  Scenario: Navigate to Google Play Store when clicking "Get it on Google Play"
    Given the user opens the landing page
    When the user clicks the "Get it on Google Play" button
    Then the Google Play Store should be opened

  Scenario: Navigate to Apple App Store when clicking "Download on the App Store"
    Given the user opens the landing page
    When the user clicks the "Download on the App Store" button
    Then the Apple App Store should be opened