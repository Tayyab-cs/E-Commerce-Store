import logger from '../utils/logger';
import paymentService from '../services/payment';

// Create a new customer for stripe
const createCustomer = async (req, res, next) => {
  logger.info(
    '<-----😉 -----> Create Stripe Customer Controller <-----😉 ----->',
  );
  const { name, email } = req.body;

  try {
    const customer = await paymentService.stripeCustomer(name, email);
    logger.info('🤗 -> Stripe Customer Created successfully...');
    return res.status(200).json({
      success: true,
      message: '🤗 -> Stripe Customer Created successfully...',
      stripeCustomer: customer,
    });
  } catch (error) {
    logger.error('😡 -> Stripe customer not created...');
    return next(error);
  }
};

// Add a new card of the customer
const addCard = async (req, res, next) => {
  logger.info('<-----😉 -----> Add Card Controller <-----😉 ----->');
  // eslint-disable-next-line operator-linebreak
  const { stripeCustomerId, cardName, cardNumber, expMonth, expYear, cardCvc } =
    req.body;

  try {
    const cardToken = await paymentService.cardToken(
      cardName,
      cardNumber,
      expMonth,
      expYear,
      cardCvc,
    );
    const card = await paymentService.createCard(
      stripeCustomerId,
      cardToken.id,
    );

    logger.info('🤗 -> Card Add Successfully...');
    return res.status(200).json({
      success: true,
      message: '🤗 -> Card Add Successfully...',
      card: card.id,
    });
  } catch (error) {
    logger.error('😡 -> Card not Added...');
    return next(error);
  }
};

// Get List of all saved card of the customers
const viewAllCards = async (req, res, next) => {
  logger.info('<-----😉 -----> View All Cards Controller <-----😉 ----->');
  const cards = [];
  try {
    const { customerId } = req.body;
    const savedCards = await paymentService.viewAllCards(customerId);
    const cardDetails = Object.values(savedCards.data);

    cardDetails.forEach((cardData) => {
      const obj = {
        cardId: cardData.id,
        cardType: cardData.brand,
        cardExpDetails: `${cardData.exp_month}/${cardData.exp_year}`,
        cardLast4: cardData.last4,
      };
      cards.push(obj);
    });

    logger.info('🤗 -> Cards for Specific Customer fetched Successfully...');
    return res.status(200).json({
      success: true,
      message: '🤗 -> Cards for Specific Customer fetched Successfully...',
      cardDetails: cards,
    });
  } catch (error) {
    logger.error('😡 -> Cards not Found...');
    return next(error);
  }
};

// Update saved card details of the customer
const updateCardDetails = async (req, res, next) => {
  logger.info('<-----😉 -----> Update Card Details Controller <-----😉 ----->');
  const { customerId, cardId, cardName, cardExpMonth, cardExpYear } = req.body;

  try {
    const card = await paymentService.updateCardDetails(
      customerId,
      cardId,
      cardName,
      cardExpMonth,
      cardExpYear,
    );
    logger.info('🤗 -> Card details updated Successfully...');
    return res.status(200).json({
      success: true,
      message: '🤗 -> Card details updated Successfully...',
      cardDetails: card,
    });
  } catch (error) {
    logger.error('😡 -> Cards not Found...');
    return next(error);
  }
};

// Delete a saved card of the customer
const deleteCard = async (req, res, next) => {
  logger.info('<-----😉 -----> Delete Card Controller <-----😉 ----->');
  const { customerId, cardId } = req.body;

  try {
    const del = await paymentService.deleteCard(customerId, cardId);
    logger.info('🤗 -> Card Deleted Successfully...');
    return res.status(200).json({
      success: true,
      message: '🤗 -> Card Deleted Successfully...',
      cardDetails: del,
    });
  } catch (error) {
    logger.error('😡 -> Cards not Found...');
    return next(error);
  }
};

// Create a payment charge
const createCharge = async (req, res, next) => {
  logger.info(
    '<-----😉 -----> Create Charge for Customer Controller <-----😉 ----->',
  );
  const { cardId, stripeCustomerId, amount } = req.body;

  try {
    const charge = await paymentService.createCharge(
      cardId,
      stripeCustomerId,
      amount,
    );
    if (charge.status === 'succeeded') {
      logger.info('🤗 -> Charge Created Successfully...');
      return res.status(200).json({
        success: true,
        message: '🤗 -> Charge Created Successfully...',
        charge: createCharge,
      });
    }
    return res
      .status(400)
      .send({ Error: 'Please try again later for payment' });
  } catch (error) {
    logger.error('😡 -> Charge not created...');
    return next(error);
  }
};

export default {
  createCustomer,
  addCard,
  viewAllCards,
  updateCardDetails,
  deleteCard,
  createCharge,
};
