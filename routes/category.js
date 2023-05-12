import express from "express";
const route = express.Router();

import { validateCreateCategory } from "../middlewares/validate.js";

import {
  createCategories,
  findAllCategories,
  findOneCategory,
  updateCategory,
  delelteCategory,
} from "../controllers/category.js";

// <------------😉 ------------> Category Routes <------------😉 ------------>
route.post("/create", validateCreateCategory, createCategories);
route.get("/findAll", findAllCategories);
route.get("/findAll", findOneCategory);
route.patch("/update", updateCategory);
route.patch("/delete", delelteCategory);

export default route;
