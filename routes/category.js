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

// <------------😉 ------------> Category Api's <------------😉 ------------>
route.post("/create", validateCreateCategory, createCategories);
route.get("/findAll", findAllCategories);
route.patch("/update", updateCategory);
route.get("/findAll", findOneCategory);
route.patch("/delete", delelteCategory);

export default route;
