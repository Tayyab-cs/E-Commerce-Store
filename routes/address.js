import express from "express";
const route = express.Router();

import { validateAddress } from "../middlewares/validate.js";
import {
  createAddress,
  updateAddress,
  findAllAddress,
  delAddress,
} from "../controllers/address.js";

import { decryptToken } from "../middlewares/decryptToken.js";
import { isCustomer } from "../middlewares/isCustomer.js";
import { isAdmin } from "../middlewares/isAdmin.js";

// <-----😉 -----> Address Api's <-----😉 ----->
route.post("/create", decryptToken, isCustomer, validateAddress, createAddress);
route.patch("/update", decryptToken, isCustomer, updateAddress);
route.get("/findAll", decryptToken, isAdmin, findAllAddress);
route.delete("/delete/:id", decryptToken, isCustomer, delAddress);

export default route;
