import express from "express";
const route = express.Router();

import { order } from "../controllers/order.js";
import { decryptToken } from "../middlewares/decryptToken.js";
import { isCustomer } from "../middlewares/isCustomer.js";

// <-----😉 -----> Order Api's <-----😉 ----->
route.post("/order", decryptToken, isCustomer, order);

export default route;
