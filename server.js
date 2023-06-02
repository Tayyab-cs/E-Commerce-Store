import express from "express";
const app = express();

import dotenv from "dotenv";
dotenv.config();
const { PORT } = process.env;

import db from "./database/connect.js";
import { errorHandler } from "./middlewares/errorHandling.js";
import { superAdmin } from "./dbSeed/superAdmin.js";
import { config } from "./config/app-config.js";
import { router } from "./routes/index.js";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", router);

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
