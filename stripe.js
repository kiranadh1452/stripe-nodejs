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
        throw new Error("Error while retrieving products", error.message);
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
        throw new Error("Error while retrieving product", error.message);
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
        throw new Error("Error while retrieving prices", error.message);
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
        throw new Error("Error while retrieving price", error.message);
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
exports.createCheckoutSession = async ({
    success_url,
    cancel_url,
    line_items,
    mode = "subscription",
    metadata = {},
    customer,
}) => {
    try {
        const session = await stripe.checkout.sessions.create({
            success_url,
            cancel_url,
            customer,
            line_items,
            metadata,
            mode,
        });
        return session;
    } catch (error) {
        console.log("Error occured", error.message);
        throw new Error("Error while creating checkout session", error.message);
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
            "Error while retrieving checkout session",
            error.message
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
        throw new Error("Error while expiring checkout session", error.message);
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
        throw new Error("Error while creating customer", error.message);
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
        throw new Error("Error while retrieving customer", error.message);
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
        throw new Error("Error while creating webhook", error.message);
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
        throw new Error("Error while creating subscription", error.message);
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
        throw new Error("Error while retrieving subscription", error.message);
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
            "Error while updating subscription",
            subscriptionId,
            error.message
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
            "Error while adding subscription item",
            subscriptionId,
            error.message
        );
    }
};
