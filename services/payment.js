import logger from "../utils/logger.js";
import dotenv from "dotenv";
dotenv.config();

const { STRIPE_PUBLISHABLE_KEY, STRIPE_SECRET_KEY } = process.env;
import stripe from "stripe";
const stripeInstance = stripe(STRIPE_SECRET_KEY);

// ********************************************************************************** //
// ********************************* PAYMENT SERVICE ******************************** //
// ********************************************************************************** //

const stripeCustomerService = async (name, email) => {
  logger.info(
    `<------------😉 ------------> Payment Create Stripe Customer Service <------------😉 ------------>`
  );
  try {
    const stripeCustomer = await stripeInstance.customers.create({
      name,
      email,
    });
    return stripeCustomer;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const cardTokenService = async (
  cardName,
  cardNumber,
  expMonth,
  expYear,
  cardCvc
) => {
  logger.info(
    `<------------😉 ------------> Payment Create Card Token Service <------------😉 ------------>`
  );
  try {
    const cardToken = await stripeInstance.tokens.create({
      card: {
        name: cardName,
        number: cardNumber,
        exp_month: expMonth,
        exp_year: expYear,
        cvc: cardCvc,
      },
    });
    return cardToken;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const createCardService = async (stripeCustomerId, cardTokenId) => {
  logger.info(
    `<------------😉 ------------> Payment Create Card Service <------------😉 ------------>`
  );
  try {
    const card = await stripeInstance.customers.createSource(stripeCustomerId, {
      source: `${cardTokenId}`,
    });
    return card;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const createChargeService = async (cardId, stripeCustomerId, amount) => {
  logger.info(
    `<------------😉 ------------> Payment Create Charge Service <------------😉 ------------>`
  );
  try {
    const createCharge = await stripeInstance.charges.create({
      card: cardId,
      customer: stripeCustomerId,
      amount: parseInt(amount) * 100,
      currency: "Pkr",
      receipt_email: `test@gmail.com`,
      description: `Stripe Charge Of Amount ${amount} for Payment`,
    });
    return createCharge;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export {
  stripeCustomerService,
  cardTokenService,
  createCardService,
  createChargeService,
};
