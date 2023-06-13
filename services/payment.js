import stripe from 'stripe';
import dotenv from 'dotenv';
import logger from '../utils/logger.js';

dotenv.config();

const { STRIPE_SECRET_KEY } = process.env;
const stripeInstance = stripe(STRIPE_SECRET_KEY);

// ********************************************************************************** //
// ********************************* PAYMENT SERVICE ******************************** //
// ********************************************************************************** //

const stripeCustomer = async (name, email) => {
  logger.info(
    '<-----😉 -----> Payment Create Stripe Customer Service <-----😉 ----->',
  );
  try {
    const customer = await stripeInstance.customers.create({
      name,
      email,
    });
    return customer;
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

const cardToken = async (cardName, cardNumber, expMonth, expYear, cardCvc) => {
  logger.info(
    '<-----😉 -----> Payment Create Card Token Service <-----😉 ----->',
  );
  try {
    const token = await stripeInstance.tokens.create({
      card: {
        name: cardName,
        number: cardNumber,
        exp_month: expMonth,
        exp_year: expYear,
        cvc: cardCvc,
      },
    });
    return token;
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

const createCard = async (stripeCustomerId, cardTokenId) => {
  logger.info('<-----😉 -----> Payment Create Card Service <-----😉 ----->');
  try {
    const card = await stripeInstance.customers.createSource(stripeCustomerId, {
      source: `${cardTokenId}`,
    });
    return card;
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

const createCharge = async (cardId, stripeCustomerId, amount) => {
  logger.info('<-----😉 -----> Payment Create Charge Service <-----😉 ----->');
  try {
    const charge = await stripeInstance.charges.create({
      card: cardId,
      customer: stripeCustomerId,
      amount: parseInt(amount, 10) * 100,
      currency: 'Pkr',
      receipt_email: 'test@gmail.com',
      description: `Stripe Charge Of Amount ${amount} for Payment`,
    });
    return charge;
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

const viewAllCards = async (customerId) => {
  logger.info('<-----😉 -----> Payment View All Cards Service <-----😉 ----->');
  try {
    const savedCards = await stripeInstance.customers.listSources(customerId, {
      object: 'card',
    });
    return savedCards;
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

const updateCardDetails = async (
  customerId,
  cardId,
  cardName,
  cardExpMonth,
  cardExpYear,
) => {
  logger.info(
    '<-----😉 -----> Payment Update Card Details Service <-----😉 ----->',
  );
  try {
    const card = await stripeInstance.customers.updateSource(
      customerId,
      cardId,
      {
        name: cardName,
        exp_month: cardExpMonth,
        exp_year: cardExpYear,
      },
    );
    return card;
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

const deleteCard = async (customerId, cardId) => {
  logger.info('<-----😉 -----> Delete Card Service <-----😉 ----->');
  try {
    const del = await stripeInstance.customers.deleteSource(customerId, cardId);
    return del;
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

export default {
  stripeCustomer,
  cardToken,
  createCard,
  createCharge,
  viewAllCards,
  updateCardDetails,
  deleteCard,
};
