## Stripe Implementation

> Click [here](https://stripe.com/docs/api?lang=node) for API Reference

### General Product Structure

-   id : Product Id
-   object : Type of object (product)
-   active : Boolean value indicating if the product is currently available for purchase
-   created: Timestamp of when the product was created
-   default_price: The ID of the price object representing the default price for the product
-   description: Description of the product
-   images: Array of images for the product
-   livemode: Boolean value indicating if the product is available in live mode
-   metadata: A set of key/value pairs that you can attach to a product object. It can be useful for storing additional information about the product in a structured format.
-   name: The product’s name
-   package_dimensions: The dimensions of this product for shipping purposes
-   shippable: Whether or not the product is shipped (i.e. physical goods)
-   statement_descriptor: Extra information about a product which will appear on your customer’s credit card statement
-   type: The type of the product. The product is either of type `good, service, or shipping`.
-   tax_code: The tax code that the product is registered under, if any. This affects how the product is taxed in certain countries.
-   unit_label: A label that represents units of this product in Stripe and on customers’ receipts and invoices. When set, this will be included in associated invoice line item descriptions.
-   updated: Timestamp of when the product was last updated
-   url: A URL of a publicly-accessible webpage for this product.

### General Price Structure

-   id : Price Id
-   object : Type of object (price)
-   active : Boolean value indicating if the price is currently available for purchase
-   billing_scheme : Describes how to compute the price per period. Either per_unit or tiered.
-   created: Timestamp of when the price was created
-   currency: Three-letter ISO currency code, in lowercase. Must be a supported currency. (eg: usd, inr)
-   custom_unit_amount: The unit amount in cents to be charged, represented as a whole integer if possible. If you want to charge $10.50, pass 1050. If you want to charge ¥7, pass 700. The minimum amount is $0.50 US or equivalent in charge currency. The amount value supports up to eight digits (e.g., a value of 99999999 for a USD charge of $999,999.99).
-   livemode: Boolean value indicating if the price is available in live mode
-   lookup_key: A lookup key used to retrieve prices dynamically from a static string.
-   metadata: A set of key/value pairs that you can attach to a price object. It can be useful for storing additional information about the price in a structured format.
-   nickname: A brief description of the price, hidden from customers.
-   product: The ID of the product this price is associated with.
-   recurring: Describes the recurring components of a price such as interval, interval_count, usage_type, aggregate_usage, interval_count.
-   tiers_mode: Defines if the tiering price should be `graduated` or `volume` based. In volume-based tiering, the maximum quantity within a period determines the per unit price, in graduated tiering pricing can successively change as the quantity grows.
-   type: The type of the price. The price can be of type `recurring`, `one_time` or `tiered`.
