import express from "express";
import db from "./database/connect.js";
const app = express();

import dotenv from "dotenv";
dotenv.config();
const { PORT } = process.env;

import { errorHandler } from "./middlewares/errorHandling.js";
import { superAdmin } from "./dbSeed/superAdmin.js";
import { config } from "./config/app-config.js";

import adminApis from "./routes/admin.js";
import categoryApis from "./routes/category.js";
import productApis from "./routes/products.js";
import customerApis from "./routes/customer.js";
import addressApis from "./routes/address.js";
import imageApis from "./routes/image.js";
import orderApis from "./routes/order.js";
import paymentApis from "./routes/payment.js";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.post("/login", (req, res, next) => {
  next(new Error("badRequest"));
});
app.use("/api/admin", adminApis);
app.use("/api/category", categoryApis);
app.use("/api/product", productApis);
app.use("/api/customer", customerApis);
app.use("/api/address", addressApis);
app.use("/api/image", imageApis);
app.use("/api", orderApis);
app.use("/api", paymentApis);

// <------------😉------------> using error handling middleware <------------😉------------>
app.use(errorHandler);

// <------------😉------------> Listening Server <------------😉------------>
db.sequelize.sync({ force: config.force, alter: config.alter }).then(() => {
  app.listen(PORT || 5000, () => {
    console.log(`Server is running on PORT: ${PORT} ...`);
  });

  // calling superAdmin seeder...
  if (config.force === true) {
    superAdmin();
  }
});
