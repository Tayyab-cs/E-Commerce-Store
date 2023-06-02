import express from "express";
const route = express.Router();

import { upload } from "../middlewares/uploadImage.js";
import { validateCreateProduct } from "../middlewares/validate.js";
import {
  createProduct,
  findAllProducts,
  updateProduct,
  delProduct,
} from "../controllers/products.js";

import { decryptToken } from "../middlewares/decryptToken.js";
import { isAdmin } from "../middlewares/isAdmin.js";

// <-----😉 -----> Product Api's <-----😉 ----->
route.post(
  "/create",
  decryptToken,
  upload.array("image"),
  validateCreateProduct,
  createProduct
);
route.get("/findAll", decryptToken, isAdmin, findAllProducts);
route.patch("/update/:id", decryptToken, isAdmin, updateProduct);
route.delete("/delete/:id", decryptToken, isAdmin, delProduct);

export default route;
