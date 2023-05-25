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

// <------------😉 ------------> Payment Api's <------------😉 ------------>
route.post("/stripeCustomer", validateStripeCustomer, createCustomer);
route.post("/addCard", validateAddCard, addCard);
route.post("/createCharge", validateCharge, createCharge);
route.get("/viewAllCards", viewAllCards);
route.patch("/updateCardDetails", updateCardDetails);
route.delete("/deleteCard", deleteCard);

export default route;
