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
  changePassword,
  forgetPassword,
} from "../controllers/admin.js";
import { decryptToken } from "../middlewares/decryptToken.js";
import { isAdmin } from "../middlewares/isAdmin.js";

// <-----😉 -----> Admin Api's <-----😉 ----->
route.post("/signUp", validateSignUp, hashPassword, signUp);
route.post("/login", validateLogin, login);
route.patch("/update", decryptToken, update);
route.patch(
  "/changePassword",
  validateUpdate,
  decryptToken,
  hashPassword,
  changePassword
);
route.patch("/forgetPassword", forgetPassword);

export default route;
