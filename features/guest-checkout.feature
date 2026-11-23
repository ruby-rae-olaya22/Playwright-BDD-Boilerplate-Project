Feature: Guest user checkout

  A guest shopper can add a product to the cart and place an order without
  creating an account.

  @smoke @positive
  Scenario: Add a product to the cart and complete checkout as a guest
    Given the guest user is viewing the product catalog
    When the guest user adds "Quantum VR Headset" to the cart
    Then the cart should contain "Quantum VR Headset" with quantity 1
    When the guest user proceeds to checkout
    Then the guest checkout option should be available without signing in
    When the guest user enters valid contact, shipping, and payment details
    And the guest user places the order
    Then an order confirmation should be displayed
    And the confirmation should include an order reference
    And the cart should be empty

  @regression @negative
  Scenario: Prevent checkout when the cart is empty
    Given the guest user has an empty cart
    When the guest user proceeds to checkout
    Then checkout should not be available
    And the guest user should be prompted to add a product to the cart
