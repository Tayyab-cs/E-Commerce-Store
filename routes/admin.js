import express from "express";
const route = express.Router();

import {
  signUp,
  login,
  update,
  findAll,
  findOne,
  del,
} from "../controllers/admin.js";
import {
  validateSignUp,
  validateLogin,
  validateUpdate,
} from "../middlewares/validate.js";

// <------------😉 ------------> Admin Api's <------------😉 ------------>
route.post("/signUp", validateSignUp, signUp);
route.get("/login", validateLogin, login);
route.get("/findAll", findAll);
route.patch("/update", validateUpdate, update);
route.get("/findOne", findOne);
route.delete("/delete", del);

export default route;
