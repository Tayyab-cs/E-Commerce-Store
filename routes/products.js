import express from "express";
const route = express.Router();

import { validateCreateProduct } from "../middlewares/validate.js";
import {
  createProduct,
  findAllProducts,
  updateProduct,
  findOneProduct,
  delProduct,
} from "../controllers/products.js";

// <------------😉 ------------> Product Api's <------------😉 ------------>
route.post("/create/:id", validateCreateProduct, createProduct);
route.get("/findAll", findAllProducts);
route.patch("/update", updateProduct);
route.get("/findOne", findOneProduct);
route.delete("/delete", delProduct);

export default route;
