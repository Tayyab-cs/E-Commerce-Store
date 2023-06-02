import joi from "joi";

// <-----😉 -----> validate Create Stripe Customer object keys <-----😉 ----->
const createStripeCustomer = joi.object().keys({
  name: joi.string().required(),
  email: joi.string().email().required(),
});

// <-----😉 -----> validate Add Card object keys <-----😉 ----->
const addCard = joi.object().keys({
  stripeCustomerId: joi.string().required(),
  cardName: joi.string().required(),
  cardNumber: joi.number().required(),
  expMonth: joi.number().required(),
  expYear: joi.number().required(),
  cardCvc: joi.number().required(),
});

// <-----😉 -----> validate Create Charge object keys <-----😉 ----->
const createCharge = joi.object().keys({
  cardId: joi.string().required(),
  stripeCustomerId: joi.string().required(),
  amount: joi.number().required(),
});

export { createStripeCustomer, addCard, createCharge };
