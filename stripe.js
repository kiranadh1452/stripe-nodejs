// require dependencies
const Stripe = require("stripe");
require("dotenv").config();

// create a stripe instance
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

/**
 * description: list all products available in stripe
 * @param {number} limit - number of products to retrieve
 * @returns {object} products
 */
exports.retrieveAllProducts = async (limit = undefined) => {
    try {
        const products = await stripe.products.list({
            limit,
        });
        return products;
    } catch (error) {
        console.log(error);
        throw new Error(`Error while retrieving products, ${error.message}`);
    }
};

/**
 * description: retrieve a product by id
 * @param {string} productId - id of the product
 * @returns {object} product
 */
exports.retrieveProduct = async (productId) => {
    try {
        const product = await stripe.products.retrieve(productId);
        return product;
    } catch (error) {
        console.log(error);
        throw new Error(
            `Error while retrieving product ${productId}, ${error.message}`
        );
    }
};

/**
 * description: Retrieve all prices
 * @param {number} limit - number of prices to retrieve
 * @returns {object} prices
 */
exports.retrieveAllPrice = async (limit = undefined) => {
    try {
        const prices = await stripe.prices.list({
            limit,
        });
        return prices;
    } catch (error) {
        console.log(error);
        throw new Error(`Error while retrieving prices, ${error.message}`);
    }
};

/**
 * description: retrieve a price by id
 * @param {string} priceId - id of the price
 * @returns {object} price
 */
exports.retrievePrice = async (priceId) => {
    try {
        const price = await stripe.prices.retrieve(priceId);
        return price;
    } catch (error) {
        console.log(error);
        throw new Error(
            `Error while retrieving price ${priceId}, ${error.message}`
        );
    }
};

/**
 * description: create a checkout session
 * @params {string} success_url - url to redirect to on successful payment
 * @params {string} cancel_url - url to redirect to on cancel payment
 * @params {string} line_items - Array of purchase objects with price and quantity
 * @params {customer} customer - id of the customer making the purchase
 * @returns {object} session
 */
exports.createCheckoutSession = async (sessionData) => {
    try {
        const session = await stripe.checkout.sessions.create(sessionData);
        return session;
    } catch (error) {
        console.log("Error occured", error.message);
        throw new Error(
            `Error while creating checkout session, ${error.message}`
        );
    }
};

/**
 * description: retrieve a checkout session
 * @params {string} sessionId - id of the session to retrieve
 * @returns {object} session
 */
exports.retrieveCheckoutSession = async (sessionId) => {
    try {
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        return session;
    } catch (error) {
        console.log(error);
        throw new Error(
            `Error while retrieving checkout session ${sessionId}, ${error.message}`
        );
    }
};

/**
 * description: expire a checkout session
 * @params {string} sessionId - id of the session to expire
 * @returns {boolean} success status
 */
exports.expireCheckoutSession = async (sessionId) => {
    try {
        const expired = await stripe.checkout.sessions.expire(sessionId);
        return expired ? true : false;
    } catch (error) {
        console.log(error);
        throw new Error(
            `Error while expiring checkout session ${sessionId}, ${error.message}`
        );
    }
};

/**
 * description: create a customer
 * @params {string} email - email of the customer
 * @params {string} id - id of the customer
 * @returns {object} customer
 */
exports.addNewCustomer = async ({ id, email }) => {
    try {
        const customer = await stripe.customers.create({
            id,
            email,
        });

        return customer;
    } catch (error) {
        console.log(error);
        throw new Error(
            `Error while creating customer with id ${id}, ${error.message}`
        );
    }
};

/**
 * description: retrieve a customer
 * @params {string} customerId - id of the customer
 * @returns {object} customer
 */
exports.getCustomerById = async (id) => {
    try {
        const customer = await stripe.customers.retrieve(id);
        return customer;
    } catch (error) {
        // console.log(error);
        throw new Error(
            `Error while retrieving customer ${id}, ${error.message}`
        );
    }
};

/**
 * description: create an event hook
 * @params {object} rawBody - raw body of the request
 * @params {string} signature - signature of the request
 * @returns {object} event
 */
exports.createWebhook = async (rawBody, signature) => {
    try {
        const event = await stripe.webhooks.constructEvent(
            rawBody,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET
        );
        return event;
    } catch (error) {
        console.log(error);
        throw new Error(`Error while creating webhook, ${error.message}`);
    }
};

/*********************************************************************************************
 *          Subscriptions Related Functions
 *********************************************************************************************/

/**
 * description: create a subscription
 * @params {string} customer - id of the customer
 * @params {string} items - array of item (item is an object with price) to subscribe to
 * @param {object} metadata - metadata to attach to the subscription
 * @returns {object} subscription
 */
exports.createSubscription = async ({
    customer,
    items,
    metadata = {},
    billing_cycle_anchor = 1611008505,
}) => {
    try {
        const subscription = await stripe.subscriptions.create({
            customer,
            items,
            billing_cycle_anchor,
            metadata,
        });
        return subscription;
    } catch (error) {
        console.log(error);
        throw new Error(`Error while creating subscription, ${error.message}`);
    }
};

/**
 * description: retrieve a subscription
 * @params {string} subscriptionId - id of the subscription
 * @returns {object} subscription
 */
exports.retrieveSubscription = async (subscriptionId) => {
    try {
        const subscription = await stripe.subscriptions.retrieve(
            subscriptionId
        );
        return subscription;
    } catch (error) {
        console.log(error);
        throw new Error(
            `Error while retrieving subscription ${subscriptionId}, ${error.message}`
        );
    }
};

/**
 * description: retrieve all subscriptions
 * @params {number} limit - number of subscriptions to retrieve
 * @params {string} customer - id of the customer
 * @params {string} price - id of the price
 * @params {string} status - status of the subscription
 * @returns {object} subscriptions
 */
exports.retrieveAllSubscriptions = async ({
    limit = 100,
    customer,
    price,
    status,
    start_after,
    ending_before,
    current_period_start,
    current_period_end,
    created,
}) => {
    try {
        const subscriptions = await stripe.subscriptions.list({
            limit,
            customer,
            price,
            status,
            start_after,
            ending_before,
            current_period_start,
            current_period_end,
            created,
        });
        return subscriptions;
    } catch (error) {
        console.log(error);
        throw new Error(
            `Error while retrieving subscriptions, ${error.message}`
        );
    }
};

/**
 * description: update a subscription
 * @params {string} subscriptionId - id of the subscription
 * @params {object} data - data to update
 * @returns {object} subscription
 */
exports.updateSubscription = async (subscriptionId, data) => {
    try {
        const subscription = await stripe.subscriptions.update(
            subscriptionId,
            data
        );
        return subscription;
    } catch (error) {
        console.log(error);
        throw new Error(
            `Error while updating subscription ${subscriptionId} : ${error.message}`
        );
    }
};

/**
 * description: add a item to a subscription
 * @params {string} subscriptionId - id of the subscription
 * @params {string} priceId - id of the price
 * @params {number} quantity - quantity of the item
 * @returns {object} subscription item
 */
exports.addSubscriptionItem = async (subscriptionId, priceId, quantity) => {
    try {
        const subItem = await stripe.subscriptionItems.create({
            subscription: subscriptionId,
            price: priceId,
            quantity: quantity,
        });
        return subItem;
    } catch (error) {
        console.log(error);
        throw new Error(
            `Error while adding subscription item with price ${priceId} to subscription ${subscriptionId} : ${error.message}`
        );
    }
};

/*********************************************************************************************
 *          Coupons, Discounts and Promo-codes Related Functions
 *********************************************************************************************/

/**
 * description: create a coupon
 * @params {string} couponId - id of the coupon
 * `coupounData` could have following params:
    @subparams - percent_off - A positive integer between 1 and 100 that represents the discount the coupon will apply (required if amount_off is not passed)
    @subparams - amount_off - A positive integer representing how much to subtract from an invoice total (required if percent_off is not passed)
    @subparams - currency - Three-letter ISO currency code, in lowercase. Must be a supported currency (required if amount_off is passed)
    @subparams - duration - One of forever, once, or repeating. Describes how long a customer who applies this coupon will get the discount. Defaults to repeating.
    @subparams - duration_in_months - If duration is repeating, the number of months the coupon applies. Null if coupon duration is forever or once.
    @subparams - max_redemptions - Maximum number of times this coupon can be redeemed, in total, before it is no longer valid. For example, you might have a 50% off coupon that the first 20 customers can use.
    @subparams - name - Name of the coupon displayed to customers on for instance invoices or receipts.
 */
exports.createCoupon = async (couponData) => {
    try {
        const coupon = await stripe.coupons.create(couponData);
        return coupon;
    } catch (error) {
        console.log(error);
        throw new Error(`Error while creating coupon, ${error.message}`);
    }
};

/**
 * description: retrieve a coupon
 * @params {string} couponId - id of the coupon
 * @returns {object} coupon
 */
exports.retrieveCoupon = async (couponId) => {
    try {
        const coupon = await stripe.coupons.retrieve(couponId);
        return coupon;
    } catch (error) {
        console.log(error);
        throw new Error(
            `Error while retrieving coupon ${couponId}, ${error.message}`
        );
    }
};

/**
 * description: update a coupon
 * @params {string} couponId - id of the coupon
 * @params {object} data - data to update
 * @returns {object} coupon
 */
exports.updateCoupon = async (couponId, data) => {
    try {
        const coupon = await stripe.coupons.update(couponId, data);
        return coupon;
    } catch (error) {
        console.log(error);
        throw new Error(
            `Error while updating coupon ${couponId}, ${error.message}`
        );
    }
};

/**
 * description: delete a coupon
 * @params {string} couponId - id of the coupon
 * @returns {object} coupon
 */
exports.deleteCoupon = async (couponId) => {
    try {
        const coupon = await stripe.coupons.del(couponId);
        return coupon;
    } catch (error) {
        console.log(error);
        throw new Error(
            `Error while deleting coupon ${couponId}, ${error.message}`
        );
    }
};

/**
 * description: list all coupons
 * @params {number} limit - limit of coupons to return
 * @returns {object} coupons
 */
exports.listCoupons = async (limit = 10) => {
    try {
        const coupons = await stripe.coupons.list({ limit });
        return coupons;
    } catch (error) {
        console.log(error);
        throw new Error(`Error while listing coupons, ${error.message}`);
    }
};

/**
 * description: create a new promocode
 * @params {Object} promoCodeData - object of the promocode
 * @returns {Object} promocode
 */
exports.createPromoCode = async (promoCodeData) => {
    try {
        const promoCode = await stripe.promotionCodes.create(promoCodeData);
        return promoCode;
    } catch (error) {
        console.log(error);
        throw new Error(`Error while creating promo code, ${error.message}`);
    }
};

/**
 * description: update a promocode
 * @params {string} promoCodeId - id of the promocode
 * @params {Object} promoCodeData - object of the promocode
 * @returns {Object} promoCode
 */
exports.updatePromoCode = async (promoCodeId, promoCodeData) => {
    try {
        const promoCode = await stripe.promotionCodes.update(
            promoCodeId,
            promoCodeData
        );
        return promoCode;
    } catch (error) {
        console.log(error);
        throw new Error(
            `Error while updating promo code ${promoCodeId}, ${error.message}`
        );
    }
};

/**
 * description: retrieve a promocode
 * @params {string} promoCodeId - id of the promocode
 * @returns {Object} promoCode
 */
exports.retrievePromoCode = async (promoCodeId) => {
    try {
        const promoCode = await stripe.promotionCodes.retrieve(promoCodeId);
        return promoCode;
    } catch (error) {
        console.log(error);
        throw new Error(
            `Error while retrieving promo code ${promoCodeId}, ${error.message}`
        );
    }
};

/**
 * description: list all promocodes
 * @params {number} limit - limit of promocodes to return
 * @returns {Object} promoCodes
 */
exports.listPromoCodes = async (limit = 10) => {
    try {
        const promoCodes = await stripe.promotionCodes.list({ limit });
        return promoCodes;
    } catch (error) {
        console.log(error);
        throw new Error(`Error while listing promo codes, ${error.message}`);
    }
};

exports.retrieveInvoice = async (invoiceId) => {
    try {
        const invoice = await stripe.invoices.retrieve(invoiceId);
        return invoice;
    } catch (error) {
        console.log(error);
        throw new Error(
            `Error while retrieving invoice ${invoiceId}, ${error.message}`
        );
    }
};

exports.retrieveAllInvoices = async ({
    limit = 100,
    subscription,
    status,
    customer,
    collection_method,
    created,
    due_date,
    ending_before,
    starting_after,
}) => {
    try {
        const invoices = await stripe.invoices.list({
            limit,
            subscription,
            status,
            customer,
            collection_method,
            created,
            due_date,
            ending_before,
            starting_after,
        });
        return invoices;
    } catch (error) {
        console.log(error);
        throw new Error(`Error while listing invoices, ${error.message}`);
    }
};
