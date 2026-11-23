Feature: Product catalog (landing page)

  The catalog landing page of The Test Automation Website displays 24 seeded
  products that can be searched, filtered by category, sorted and paginated.
  Every state (search, category, sort, page) is reflected in the URL so any
  view can be deep-linked. Product cards show name, price, rating and stock,
  and items can be added to the cart without leaving the page.

  Background:
    Given the user opens the catalog landing page
    And the catalog data has finished loading

  # ---------- Positive cases ----------

  @smoke @positive
  Scenario: Display the catalog landing page
    Then the browser title should contain "The Test Automation Website"
    And the "Catalog" heading should be visible
    And the page intro describing the catalog should be visible
    And the search box should be visible
    And the sort dropdown should be visible
    And the category chips should be visible
    And the result count should read "24 product(s) found"
    And 12 product cards should be displayed
    And the pagination status should read "Page 1 of 2"
    And the "Previous" button should be disabled
    And the "Next" button should be enabled

  @smoke @positive
  Scenario: Search products by keyword
    When the user types "wireless" into the search box
    And waits for the 300 ms debounce to elapse
    Then the URL should contain "search=wireless"
    And the result count should read "2 product(s) found"
    And the product list should contain "Pulse True Wireless Earbuds"
    And the product list should contain "Aurora Wireless Headphones"

  @smoke @positive
  Scenario: Filter products by category
    When the user selects the "Audio" category chip
    Then the "Audio" category chip should be marked active
    And the URL should contain "category=audio"
    And the result count should read "5 product(s) found"
    And every displayed product should belong to the "audio" category

  @smoke @positive
  Scenario: Sort products by price ascending
    When the user selects sort option "Price: low to high"
    Then the URL should contain "sort=price-asc"
    And the products should be ordered by price ascending

  @regression @positive
  Scenario: Sort products by price descending
    When the user selects sort option "Price: high to low"
    Then the URL should contain "sort=price-desc"
    And the products should be ordered by price descending

  @regression @positive
  Scenario: Sort products by name ascending
    When the user selects sort option "Name: A to Z"
    Then the URL should contain "sort=name-asc"
    And the products should be ordered by name ascending

  @regression @positive
  Scenario: Sort products by rating descending
    When the user selects sort option "Rating: high to low"
    Then the URL should contain "sort=rating-desc"
    And the products should be ordered by rating descending

  @regression @positive
  Scenario: Navigate to the next page
    When the user clicks the "Next" button
    Then the pagination status should read "Page 2 of 2"
    And the URL should contain "page=2"
    And 12 product cards should be displayed
    And the "Previous" button should be enabled
    And the "Next" button should be disabled

  @regression @positive
  Scenario: Navigate back to the previous page
    Given the user is on catalog page 2
    When the user clicks the "Previous" button
    Then the pagination status should read "Page 1 of 2"
    And the URL should contain "page=1"

  @regression @positive
  Scenario: Add a product to the cart
    When the user clicks "Add to cart" on "Quantum VR Headset"
    Then the cart count should increase by 1
    And the user should remain on the catalog page

  @regression @positive
  Scenario: Open product details from a card
    When the user clicks the "Quantum VR Headset" product name
    Then the browser should navigate to the product detail page
    And the product detail URL should contain "prod-quantum-headset"

  @regression @positive
  Scenario Outline: Deep-link to a filtered catalog state
    Given the user opens the URL "<url>"
    Then the search box should contain "<search>"
    And the sort dropdown should have value "<sort>"
    And the active category chip should be "<category>"
    And the pagination status should be "<pageStatus>"

    Examples:
      | url                                                                 | search   | sort     | category | pageStatus      |
      | /shop/catalog?search=wireless&sort=price-asc&category=audio&page=1   | wireless | price-asc| audio    | hidden          |
      | /shop/catalog?sort=newest&page=2                                    |          | newest   | all      | Page 2 of 2     |

  @regression @positive
  Scenario: Clear all filters restores the full catalog
    Given the user opens the URL "/shop/catalog?search=zzzzzzzzz"
    And the empty state should be displayed
    When the user clicks the "Clear all filters" button
    Then the URL should be the catalog base URL
    And the result count should read "24 product(s) found"
    And 12 product cards should be displayed

  # ---------- Negative cases ----------

  @regression @negative
  Scenario: Search with no matching products shows empty state
    When the user types "zzzzzzzzz" into the search box
    And waits for the 300 ms debounce to elapse
    Then the result count should read "0 product(s) found"
    And the empty state message "No products match your filters" should be visible
    And the "Clear all filters" button should be visible

  @regression @negative
  Scenario: Filter by an unknown category shows empty state
    Given the user opens the URL "/shop/catalog?category=foobar"
    Then the result count should read "0 product(s) found"
    And the empty state should be displayed

  @regression @negative
  Scenario: Page number out of range shows empty state
    Given the user opens the URL "/shop/catalog?page=999"
    Then the empty state should be displayed

  @regression @negative
  Scenario: Whitespace-only search yields no matches
    When the user types "   " into the search box
    And waits for the 300 ms debounce to elapse
    Then the result count should read "0 product(s) found"
    And the empty state should be displayed

  # ---------- Security cases ----------

  @security
  Scenario: XSS payload in search is not executed
    When the user types "<script>alert(1)</script>" into the search box
    And waits for the 300 ms debounce to elapse
    Then no JavaScript alert should be triggered
    And the search box value should be treated as plain text

  @security
  Scenario: SQL injection payload in search does not break the catalog
    When the user types "' OR 1=1 --" into the search box
    And waits for the 300 ms debounce to elapse
    Then the page should not crash
    And the result count should read "0 product(s) found"

  @security
  Scenario: Tampered sort parameter falls back to default
    Given the user opens the URL "/shop/catalog?sort=foobar"
    Then the sort dropdown should have value "newest"
    And the result count should read "24 product(s) found"

  @security
  Scenario: Tampered page parameter is sanitized
    Given the user opens the URL "/shop/catalog?page=abc"
    Then the pagination status should read "Page 1 of 2"

  # ---------- API / network validation ----------

  @api
  Scenario: Products API returns a successful response
    When the user opens the catalog landing page
    Then the products API should return status 200
    And the response should contain items, page, pageSize, total and totalPages

  @api
  Scenario: Categories API returns the category list
    When the user opens the catalog landing page
    Then the categories API should return status 200
    And the response should contain 5 categories

  @api
  Scenario Outline: Query parameters are forwarded to the products API
    Given the user opens the URL "<url>"
    Then the products API request URL should contain "<param>"

    Examples:
      | url                                      | param             |
      | /shop/catalog?search=wireless             | search=wireless   |
      | /shop/catalog?category=audio              | category=audio    |
      | /shop/catalog?sort=price-asc             | sort=price-asc    |
      | /shop/catalog?page=2                     | page=2            |

  # ---------- Non-functional ----------

  @nonfunctional @accessibility
  Scenario: Catalog page is keyboard navigable
    When the user navigates the catalog page using the keyboard
    Then the search box should be reachable
    And the sort dropdown should be reachable
    And the category chips should be reachable
    And the "Add to cart" buttons should be reachable
    And the pagination controls should be reachable

  @nonfunctional @accessibility
  Scenario: Product links expose an accessible name
    Then each product card link should have an aria-label containing the product name

  @nonfunctional @responsive
  Scenario: Catalog renders on a mobile viewport
    Given the viewport is 375 pixels wide
    When the user opens the catalog landing page
    Then the product cards should be visible
    And the search box should be visible

  @nonfunctional @cross-browser
  Scenario: Catalog page loads in Chromium, Firefox and WebKit
    When the user opens the catalog landing page
    Then the result count should read "24 product(s) found"
