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
        console.log(price);
        return price;
    } catch (error) {
        console.log(error);
    }
};