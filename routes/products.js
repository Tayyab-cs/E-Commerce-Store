import express from "express";
const route = express.Router();

import { upload } from "../middlewares/uploadImage.js";
import { validateCreateProduct } from "../middlewares/validate.js";
import {
  createProduct,
  findAllProducts,
  updateProduct,
  delProduct,
  pagination,
} from "../controllers/products.js";

// <------------😉 ------------> Product Api's <------------😉 ------------>
route.post(
  "/create",
  upload.array("image"),
  validateCreateProduct,
  createProduct
);
route.get("/findAll", findAllProducts);
route.patch("/update", updateProduct);
route.delete("/delete", delProduct);
route.get("/pages", pagination);

export default route;
