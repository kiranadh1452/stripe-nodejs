// require dependencies
const Stripe = require("stripe");
require("dotenv").config();

// create a stripe instance
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

exports.listAllProducts = async (limit = undefined) => {
    try {
        const products = await stripe.products.list({
            limit,
        });
        console.log(products);
        return products;
    } catch (error) {
        console.log(error);
    }
};

exports.retrieveProduct = async (productId) => {
    try {
        const product = await stripe.products.retrieve(productId);
        console.log(product);
        return product;
    } catch (error) {
        console.log(error);
    }
};

exports.retrievePrice = async (priceId) => {
    try {
        const price = await stripe.prices.retrieve(priceId);
        console.log(price);
        return price;
    } catch (error) {
        console.log(error);
    }
};
