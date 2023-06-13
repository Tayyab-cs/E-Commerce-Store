import { Sequelize, DataTypes } from 'sequelize';
import dbConfig from '../config/config.js';
import category from './models/category.js';
import admin from './models/admin.js';
import products from './models/products.js';
import customer from './models/customer.js';
import order from './models/order.js';
import orderedProduct from './models/orderedProduct.js';
import address from './models/address.js';
import image from './models/image.js';

// eslint-disable-next-line object-curly-newline
const { username, password, database, host, dialect } = dbConfig.development;

// <------------😉------------> Connect to the DB <------------😉------------>
const sequelize = new Sequelize({
  username,
  host,
  dialect,
  password,
  database,
  logging: false,
});

await sequelize.authenticate();

const db = {};
// <------------😉------------> Calling the Model Functions <------------😉------------>

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
