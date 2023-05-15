import express from "express";
const route = express.Router();

import { validateSignUpCustomer } from "../middlewares/validate.js";
import {
  signUpCustomer,
  loginCustomer,
  updateCustomer,
  findAllCustomers,
  findOneCustomer,
  delCustomer,
} from "../controllers/customer.js";

// <------------😉 ------------> Customer Api's <------------😉 ------------>
route.post("/signUp", validateSignUpCustomer, signUpCustomer);
route.get("/login", loginCustomer);
route.patch("/update", updateCustomer);
route.get("/findAll", findAllCustomers);
route.get("/findOne", findOneCustomer);
route.delete("/delete", delCustomer);

export default route;
