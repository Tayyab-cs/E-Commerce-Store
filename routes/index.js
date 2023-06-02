import express from "express";
const router = express.Router();

import adminApis from "../routes/admin.js";
import categoryApis from "../routes/category.js";
import productApis from "../routes/products.js";
import customerApis from "../routes/customer.js";
import addressApis from "../routes/address.js";
import imageApis from "../routes/image.js";
import orderApis from "../routes/order.js";
import paymentApis from "../routes/payment.js";

router.use("/admin", adminApis);
router.use("/category", categoryApis);
router.use("/product", productApis);
router.use("/customer", customerApis);
router.use("/address", addressApis);
router.use("/image", imageApis);
router.use("", orderApis);
router.use("", paymentApis);

export { router };
