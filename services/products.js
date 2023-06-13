import logger from '../utils/logger.js';
import db from '../database/connect.js';

// ********************************************************************************** //
// ******************************** PRODUCT SERVICE ******************************** //
// ********************************************************************************** //

const findByName = async (name) => {
  logger.info('<-----😉 -----> Product Find-by-Name Service <-----😉 ----->');
  try {
    const result = await db.products.findOne({ where: { name } });
    return result;
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

const findByPk = async (productId) => {
  logger.info('<-----😉 -----> Product Find-by-Pk Service <-----😉 ----->');

  try {
    const result = await db.products.findByPk(productId);
    return result;
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

const findById = async (categoryId) => {
  logger.info('<-----😉 -----> Product Find-by-ID Service <-----😉 ----->');
  try {
    const result = await db.category.findByPk(categoryId);
    return result;
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

const create = async (name, description, price, quantity, categoryId) => {
  logger.info('<-----😉 -----> Product Create Service <-----😉 ----->');
  try {
    const result = await db.products.create({
      name,
      description,
      price,
      quantity,
      categoryId,
    });
    return result;
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

const findAll = async (filter, sortOptions, offset, pageSize) => {
  logger.info('<-----😉 -----> Product Find Service <-----😉 ----->');

  try {
    const result = await db.products.findAll({
      where: filter,
      order: sortOptions,
      offset,
      limit: pageSize,
    });

    return result;
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

const findAllImages = async (productIds) => {
  logger.info(
    '<-----😉 -----> Product Find All Images Service <-----😉 ----->',
  );

  try {
    const result = await db.image.findAll({ where: { id: productIds } });
    return result;
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

const del = async (productId) => {
  logger.info('<-----😉 -----> Product Delete Service <-----😉 ----->');

  try {
    await db.orderedProduct.destroy({ where: { productId } });
    await db.image.destroy({ where: { productId } });
    const result = await db.products.destroy({ where: { id: productId } });

    if (!result) throw new Error('Product not found...');
    return result;
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

export default {
  findByName,
  findById,
  findByPk,
  create,
  findAll,
  findAllImages,
  del,
};
