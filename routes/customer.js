import express from "express";
const route = express.Router();

import { validateSignUpCustomer } from "../middlewares/validate.js";
import hashPassword from "../middlewares/hashPassword.js";
import {
  signUpCustomer,
  loginCustomer,
  updateCustomer,
  changePassword,
  forgetPassword,
  findAllCustomers,
  delCustomer,
} from "../controllers/customer.js";

import { decryptToken } from "../middlewares/decryptToken.js";
import { isAdmin } from "../middlewares/isAdmin.js";

// <-----😉 -----> Customer Api's <-----😉 ----->
route.post("/signUp", validateSignUpCustomer, hashPassword, signUpCustomer);
route.post("/login", loginCustomer);
route.patch("/update", decryptToken, updateCustomer);
route.patch("/changePassword", decryptToken, hashPassword, changePassword);
route.patch("/forgetPassword", forgetPassword);
route.get("/findAll", decryptToken, isAdmin, findAllCustomers);
route.delete("/delete/:id", decryptToken, isAdmin, delCustomer);

export default route;
