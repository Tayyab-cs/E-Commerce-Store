import express from "express";
const route = express.Router();

import { validate } from "../middlewares/validate.js";
import validateAddress from "../validation/address.js";
import { decryptToken } from "../middlewares/decryptToken.js";
import { isCustomer } from "../middlewares/isCustomer.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import addressController from "../controllers/address.js";

// <-----😉 -----> Address Api's <-----😉 ----->
route.post(
  "/create",
  validate(validateAddress.address),
  decryptToken,
  isCustomer,
  addressController.create
);
route.patch("/update", decryptToken, isCustomer, addressController.update);
route.get("/findAll", decryptToken, isAdmin, addressController.findAll);
route.delete("/delete/:id", decryptToken, isCustomer, addressController.del);

export default route;
