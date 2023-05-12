import { Sequelize, DataTypes } from "sequelize";
import dbConfig from "../config/config.js";
const { username, password, database, host, dialect } = dbConfig.development;
import category from "./models/category.js";
import admin from "./models/admin.js";
import products from "./models/products.js";
import customer from "./models/customer.js";
import orderDetails from "./models/orderDetails.js";
import orderItems from "./models/orderItems.js";
import productInventory from "./models/productInventory.js";
import logger from "../utils/logger.js";

// <--------------------------> Connect to the DB <------------😉------------>
const sequelize = new Sequelize({
  username,
  host: host,
  dialect: dialect,
  password,
  database,
  logging: false,
});

try {
  await sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

const db = {};
// <--------------------------> Calling the Model Functions <------------😉------------>

db.category = category(sequelize, DataTypes);
db.admin = admin(sequelize, DataTypes);
db.products = products(sequelize, DataTypes);
db.customer = customer(sequelize, DataTypes);
db.orderDetails = orderDetails(sequelize, DataTypes);
db.orderItems = orderItems(sequelize, DataTypes);
db.productInventory = productInventory(sequelize, DataTypes);
db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
