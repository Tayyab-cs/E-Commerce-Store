import express from "express";
import db from "./database/connect.js";
const app = express();

import dotenv from "dotenv";
dotenv.config();
const { PORT } = process.env;

import adminApis from "./routes/admin.js";
import categoryApis from "./routes/category.js";
import productApis from "./routes/products.js";
import customerApis from "./routes/customer.js";
import addressApis from "./routes/address.js";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/admin", adminApis);
app.use("/api/category", categoryApis);
app.use("/api/product", productApis);
app.use("/api/customer", customerApis);
app.use("/api/address", addressApis);

// <--------------------------> Listening Server <------------😉------------>
db.sequelize.sync({ force: false, alter: false }).then(() => {
  app.listen(PORT || 5000, () => {
    console.log(`Server is running on PORT: ${PORT} ...`);
  });
});
