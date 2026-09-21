Feature: Validate the Sauce Demo landing page UI and primary navigation
  As a visitor
  I want to see the homepage storefront content and use its main navigation links
  So that I can browse products, access shopping accounts, and reach key storefront pages

  Scenario: Display the homepage hero and core storefront elements
    Given the user opens the landing page
    Then the browser title should contain "Sauce Demo"
    And the page heading "Sauce Demo" should be visible
    And the page subtitle "Just a demo site showing off what Sauce can do." should be visible
    And the "Home" navigation link should be visible
    And the "Catalog" navigation link should be visible
    And the "Blog" navigation link should be visible
    And the "About Us" navigation link should be visible
    And the "Log In" link should be visible
    And the "Sign up" link should be visible
    And the "My Cart (0)" link should be visible
    And the "Check Out" link should be visible
    And the product cards "Grey jacket", "Noir jacket", and "Striped top" should be visible

  Scenario: Open the catalog page from the main navigation
    Given the user opens the landing page
    When the user clicks the "Catalog" navigation link
    Then the product collection page should be displayed
    And the collection title or catalog layout should be visible

  Scenario: Open the About Us page from the homepage footer or header
    Given the user opens the landing page
    When the user clicks the "About Us" navigation link
    Then the About Us page should be displayed
    And the page should contain Sauce brand information

  Scenario: View a featured product from the homepage
    Given the user opens the landing page
    When the user clicks the "Grey jacket" product card
    Then the product detail page for "Grey jacket" should be displayed
    And the price "£55.00" should be visible

  Scenario: Open the login page from the header
    Given the user opens the landing page
    When the user clicks the "Log In" link
    Then the login page should be displayed

  Scenario: Add a product to the cart via the storefront card
    Given the user opens the landing page
    When the user clicks the "Noir jacket" product card
    Then the product detail page for "Noir jacket" should be displayed
    And the add-to-cart action should be available

  Scenario: Search for a product from the storefront search field
    Given the user opens the landing page
    When the user searches for "jacket"
    Then the search results page should show matching product results
    And the search results should include "Grey jacket" or "Noir jacket"