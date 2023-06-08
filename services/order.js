import logger from '../utils/logger';
import db from '../database/connect';

// ********************************************************************************** //
// ********************************** ORDER SERVICE ********************************* //
// ********************************************************************************** //

const findByPk = async (id) => {
  logger.info(
    '<-----😉 -----> Order find-customer-by-PK Service <-----😉 ----->',
  );

  try {
    const result = await db.customer.findByPk(id);
    return result;
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

const findById = async (customerId) => {
  logger.info(
    '<-----😉 -----> Order find-address-by-id Service <-----😉 ----->',
  );
  try {
    const result = await db.address.findOne({ where: { customerId } });
    return result;
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

const findProductId = async (id) => {
  logger.info(
    '<-----😉 -----> Order find-product-by-id Service <-----😉 ----->',
  );
  try {
    const result = await db.products.findByPk(id);
    return result;
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

const createOrder = async (totalAmount, customerId) => {
  logger.info('<-----😉 -----> Order Create Service <-----😉 ----->');
  try {
    const result = await db.order.create({ totalAmount, customerId });
    return result;
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

const createOrderProduct = async (products) => {
  logger.info('<-----😉 -----> Ordered Product Create Service <-----😉 ----->');
  try {
    const result = await db.orderedProduct.bulkCreate(products);
    return result;
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

const findAll = async () => {
  logger.info('<-----😉 -----> Order findAll Service <-----😉 ----->');

  try {
    const result = await db.customer.findAll();
    return result;
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

export default {
  findByPk,
  findById,
  findProductId,
  createOrder,
  createOrderProduct,
  findAll,
};
