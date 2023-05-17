import express from "express";
const route = express.Router();

import {
  validateSignUp,
  validateLogin,
  validateUpdate,
} from "../middlewares/validate.js";
import hashPassword from "../middlewares/hashPassword.js";
import {
  signUp,
  login,
  update,
  findAll,
  findOne,
  del,
} from "../controllers/admin.js";

// <------------😉 ------------> Admin Api's <------------😉 ------------>
route.post("/signUp", validateSignUp, hashPassword, signUp);
route.get("/login", validateLogin, login);
route.get("/findAll", findAll);
route.patch("/update", validateUpdate, update);
route.get("/findOne", findOne);
route.delete("/delete", del);

export default route;
