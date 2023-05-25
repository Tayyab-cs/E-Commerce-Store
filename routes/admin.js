import express from "express";
const route = express.Router();
import hashPassword from "../middlewares/hashPassword.js";
import {
  validateSignUp,
  validateLogin,
  validateUpdate,
} from "../middlewares/validate.js";
import {
  signUp,
  login,
  update,
  findAll,
  findOne,
  del,
} from "../controllers/admin.js";
import { decryptToken } from "../middlewares/decryptToken.js";

// <------------😉 ------------> Admin Api's <------------😉 ------------>
route.post("/signUp", validateSignUp, hashPassword, signUp);
route.get("/login", validateLogin, login);
route.get("/findAll", findAll);
route.patch("/update", validateUpdate, update);
route.get("/findOne", decryptToken, findOne);
route.delete("/delete", decryptToken, del);

export default route;
