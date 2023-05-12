import express from "express";
import db from "./database/connect.js";
const app = express();

import dotenv from "dotenv";
dotenv.config();
const { PORT } = process.env;

import adminRoute from "./routes/admin.js";
import categoryRoute from "./routes/category.js";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/admin", adminRoute);
app.use("/api/category", categoryRoute);

// <--------------------------> Listening Server <------------😉------------>
db.sequelize.sync({ force: false, alter: false }).then(() => {
  app.listen(PORT || 5000, () => {
    console.log(`Server is running on PORT: ${PORT} ...`);
  });
});
