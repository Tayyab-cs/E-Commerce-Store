import logger from "../utils/logger.js";
import db from "../database/connect.js";

// ********************************************************************************** //
// ********************************** ORDER SERVICE ********************************* //
// ********************************************************************************** //

const findByPkService = async (customerId) => {
  logger.info(
    `<------------😉 ------------> Order find-customer-by-PK Service <------------😉 ------------>`
  );
  try {
    const result = await db.customer.findByPk(customerId);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const findByIdService = async (customerId) => {
  logger.info(
    `<------------😉 ------------> Order find-address-by-id Service <------------😉 ------------>`
  );
  try {
    const result = await db.address.findOne({ where: customerId });
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const findProductIdService = async (id) => {
  logger.info(
    `<------------😉 ------------> Order find-product-by-id Service <------------😉 ------------>`
  );
  try {
    const result = await db.products.findByPk(id);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const createOrderService = async (totalAmount, customerId) => {
  logger.info(
    `<------------😉 ------------> Order Create Service <------------😉 ------------>`
  );
  try {
    const result = await db.order.create({ totalAmount, customerId });
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const createOrderProductService = async (products) => {
  logger.info(
    `<------------😉 ------------> Ordered Product Create Service <------------😉 ------------>`
  );
  try {
    const result = await db.orderedProduct.bulkCreate(products);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const findAllService = async () => {
  logger.info(
    `<------------😉 ------------> Order findAll Service <------------😉 ------------>`
  );

  try {
    const result = await db.customer.findAll();
    return result;
  } catch (error) {
    console.error(err);
    throw err;
  }
};

export {
  findByPkService,
  findByIdService,
  findProductIdService,
  createOrderService,
  createOrderProductService,
  findAllService,
};
