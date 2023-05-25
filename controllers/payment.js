import logger from "../utils/logger.js";
import {
  stripeCustomerService,
  cardTokenService,
  createCardService,
  createChargeService,
} from "../services/payment.js";

// Create a new customer for stripe
const createCustomer = async (req, res, next) => {
  logger.info(
    `<------------😉 ------------> Create Stripe Customer Controller <------------😉 ------------>`
  );
  const { name, email } = req.body;

  try {
    const customer = await stripeCustomerService(name, email);
    return res.status(200).json({
      success: true,
      message: `Stripe Customer Created successfully!`,
      stripeCustomer: customer,
    });
  } catch (error) {
    logger.error(`Stripe customer not created...`);
    return next(error.message);
  }
};

// Add a new card of the customer
const addCard = async (req, res, next) => {
  logger.info(
    `<------------😉 ------------> Add Card Controller <------------😉 ------------>`
  );
  const { stripeCustomerId, cardName, cardNumber, expMonth, expYear, cardCvc } =
    req.body;

  try {
    const cardToken = await cardTokenService(
      cardName,
      cardNumber,
      expMonth,
      expYear,
      cardCvc
    );
    console.log(cardToken);
    const card = await createCardService(stripeCustomerId, cardToken.id);
    console.log(card);

    return res.status(200).json({
      success: true,
      message: "Card Add Successfully!",
      card: card.id,
    });
  } catch (error) {
    logger.error(`Card not Added...`);
    return next(error.message);
  }
};

// Get List of all saved card of the customers
const viewAllCards = async (req, res) => {
  let cards = [];
  try {
    const savedCards = await stripeInstance.customers.listSources(customerId, {
      object: "card",
    });
    const cardDetails = Object.values(savedCards.data);

    cardDetails.forEach((cardData) => {
      let obj = {
        cardId: cardData.id,
        cardType: cardData.brand,
        cardExpDetails: `${cardData.exp_month}/${cardData.exp_year}`,
        cardLast4: cardData.last4,
      };
      cards.push(obj);
    });
    return res.status(200).send({
      cardDetails: cards,
    });
  } catch (error) {
    return res.status(400).send({
      Error: error.raw.message,
    });
  }
};

// Update saved card details of the customer
const updateCardDetails = async (req, res) => {
  const { cardName, cardExpMonth, cardExpYear, cardId } = req.body;

  if (!cardId) {
    return res.status(400).send({
      Error: "CardID is Required to update",
    });
  }
  try {
    const card = await stripeInstance.customers.updateSource(
      customerId,
      cardId,
      {
        name: cardName,
        exp_month: cardExpMonth,
        exp_year: cardExpYear,
      }
    );
    return res.status(200).send({
      updatedCard: card,
    });
  } catch (error) {
    return res.status(400).send({
      Error: error.raw.message,
    });
  }
};

// Delete a saved card of the customer
const deleteCard = async (req, res) => {
  console.log("\n\n Body Passed:", req.body);
  const { cardId } = req.body;
  if (!cardId) {
    return res.status(400).send({
      Error: "CardId is required to delete Card",
    });
  }
  try {
    const deleteCard = await stripeInstance.customers.deleteSource(
      customerId,
      cardId
    );
    return res.status(200).send(deleteCard);
  } catch (error) {
    return res.status(400).send({
      Error: error.raw.message,
    });
  }
};

// Create a payment charge
const createCharge = async (req, res, next) => {
  logger.info(
    `<------------😉 ------------> Create Charge for Customer Controller <------------😉 ------------>`
  );
  const { cardId, stripeCustomerId, amount } = req.body;

  try {
    const createCharge = await createChargeService(
      cardId,
      stripeCustomerId,
      amount
    );
    if (createCharge.status === "succeeded") {
      return res.status(200).json({
        success: true,
        message: "Sign-up completed successfully!",
        charge: createCharge,
      });
    } else {
      return res
        .status(400)
        .send({ Error: "Please try again later for payment" });
    }
  } catch (error) {
    logger.error(`Charge not created...`);
    return next(error.message);
  }
};

export {
  createCustomer,
  addCard,
  viewAllCards,
  updateCardDetails,
  deleteCard,
  createCharge,
};
