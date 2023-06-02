import express from "express";
const route = express.Router();

import {
  createCustomer,
  addCard,
  viewAllCards,
  updateCardDetails,
  deleteCard,
  createCharge,
} from "../controllers/payment.js";

import {
  validateStripeCustomer,
  validateAddCard,
  validateCharge,
} from "../middlewares/validate.js";

import { decryptToken } from "../middlewares/decryptToken.js";
import { isCustomer } from "../middlewares/isCustomer.js";

// <-----😉 -----> Payment Api's <-----😉 ----->
route.post(
  "/stripeCustomer",
  decryptToken,
  isCustomer,
  validateStripeCustomer,
  createCustomer
);
route.post("/addCard", decryptToken, isCustomer, validateAddCard, addCard);
route.post(
  "/createCharge",
  decryptToken,
  isCustomer,
  validateCharge,
  createCharge
);
route.get("/viewAllCards", viewAllCards);
route.patch("/updateCardDetails", updateCardDetails);
route.delete("/deleteCard", deleteCard);

export default route;
