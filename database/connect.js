import { Sequelize, DataTypes } from "sequelize";
import dbConfig from "../config/config.js";
const { username, password, database, host, dialect } = dbConfig.development;
import category from "./models/category.js";
import admin from "./models/admin.js";
import products from "./models/products.js";
import customer from "./models/customer.js";
import order from "./models/order.js";
import orderedProduct from "./models/orderedProduct.js";
import address from "./models/address.js";
import image from "./models/image.js";

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
db.order = order(sequelize, DataTypes);
db.orderedProduct = orderedProduct(sequelize, DataTypes);
db.address = address(sequelize, DataTypes);
db.image = image(sequelize, DataTypes);
db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
