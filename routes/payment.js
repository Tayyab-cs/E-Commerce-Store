import express from "express";
const route = express.Router();

import paymentController from "../controllers/payment.js";

import { validate } from "../middlewares/validate.js";
import validatePayment from "../validation/payment.js";

import { decryptToken } from "../middlewares/decryptToken.js";
import { isCustomer } from "../middlewares/isCustomer.js";

// <-----😉 -----> Payment Api's <-----😉 ----->
route.post(
  "/stripeCustomer",
  decryptToken,
  isCustomer,
  validate(validatePayment.createStripeCustomer),
  paymentController.createCustomer
);
route.post(
  "/addCard",
  decryptToken,
  isCustomer,
  validate(validatePayment.addCard),
  paymentController.addCard
);
route.post(
  "/createCharge",
  decryptToken,
  isCustomer,
  validate(validatePayment.createCharge),
  paymentController.createCharge
);
route.get("/viewAllCards", paymentController.viewAllCards);
route.patch("/updateCardDetails", paymentController.updateCardDetails);
route.delete("/deleteCard", paymentController.deleteCard);

export default route;
