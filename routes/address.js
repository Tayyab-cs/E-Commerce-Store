import express from "express";
const route = express.Router();

import { validateAddress } from "../middlewares/validate.js";
import {
  createAddress,
  updateAddress,
  findAllAddress,
  findOneAddress,
  delAddress,
} from "../controllers/address.js";

// <------------😉 ------------> Address Api's <------------😉 ------------>
route.post("/signUp", validateAddress, createAddress);
route.patch("/update", updateAddress);
route.get("/findAll", findAllAddress);
route.get("/findOne", findOneAddress);
route.delete("/delete", delAddress);

export default route;
