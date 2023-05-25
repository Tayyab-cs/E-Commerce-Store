import express from "express";
const route = express.Router();

import { validateSignUpCustomer } from "../middlewares/validate.js";
import hashPassword from "../middlewares/hashPassword.js";
import {
  signUpCustomer,
  loginCustomer,
  updateCustomer,
  findAllCustomers,
  findOneCustomer,
  delCustomer,
} from "../controllers/customer.js";

import { decryptToken } from "../middlewares/decryptToken.js";

// <------------😉 ------------> Customer Api's <------------😉 ------------>
route.post("/signUp", validateSignUpCustomer, hashPassword, signUpCustomer);
route.get("/login", loginCustomer);
route.patch("/update", updateCustomer);
route.get("/findAll", findAllCustomers);
route.get("/findOne", decryptToken, findOneCustomer);
route.delete("/delete", decryptToken, delCustomer);

export default route;
