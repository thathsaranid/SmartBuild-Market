const dotenv = require('dotenv');
dotenv.config(); // Load variables from .env

const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

module.exports = stripe;
