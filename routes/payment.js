import express from 'express';
import paymentController from '../controllers/payment';
import validate from '../middlewares/validate';
import validatePayment from '../validation/payment';
import decryptToken from '../middlewares/decryptToken';
import isCustomer from '../middlewares/isCustomer';

const route = express.Router();

// <-----😉 -----> Payment Api's <-----😉 ----->
route.post(
  '/stripeCustomer',
  decryptToken,
  isCustomer,
  validate(validatePayment.createStripeCustomer),
  paymentController.createCustomer,
);
route.post(
  '/addCard',
  decryptToken,
  isCustomer,
  validate(validatePayment.addCard),
  paymentController.addCard,
);
route.post(
  '/createCharge',
  decryptToken,
  isCustomer,
  validate(validatePayment.createCharge),
  paymentController.createCharge,
);
route.get('/viewAllCards', paymentController.viewAllCards);
route.patch('/updateCardDetails', paymentController.updateCardDetails);
route.delete('/deleteCard', paymentController.deleteCard);

export default route;
