import express from "express";
const route = express.Router();

import { validateCreateCategory } from "../middlewares/validate.js";
import { decryptToken } from "../middlewares/decryptToken.js";

import {
  createCategories,
  findAllCategories,
  updateCategory,
  delelteCategory,
} from "../controllers/category.js";

// <-----😉 -----> Category Api's <-----😉 ----->
route.post("/create", decryptToken, validateCreateCategory, createCategories);
route.get("/findAll", decryptToken, findAllCategories);
route.patch("/update/:id", decryptToken, updateCategory);
route.delete("/delete/:id", decryptToken, delelteCategory);

export default route;
