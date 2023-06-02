import logger from "../utils/logger.js";
import db from "../database/connect.js";

// ********************************************************************************** //
// ******************************** PRODUCT SERVICE ******************************** //
// ********************************************************************************** //

const findByNameService = async (name) => {
  logger.info(`<-----😉 -----> Product Find-by-Name Service <-----😉 ----->`);
  try {
    const result = await db.products.findOne({ where: { name } });
    return result;
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

const findByPkService = async (productId) => {
  logger.info(`<-----😉 -----> Product Find-by-Pk Service <-----😉 ----->`);

  try {
    const result = await db.products.findByPk(productId);
    return result;
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

const findByIdService = async (categoryId) => {
  logger.info(`<-----😉 -----> Product Find-by-ID Service <-----😉 ----->`);
  try {
    const result = await db.category.findByPk(categoryId);
    return result;
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

const createService = async (
  name,
  description,
  price,
  quantity,
  categoryId
) => {
  logger.info(`<-----😉 -----> Product Create Service <-----😉 ----->`);
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

const findAllService = async (filter, sortOptions, offset, pageSize) => {
  logger.info(`<-----😉 -----> Product Find Service <-----😉 ----->`);

  try {
    let result = await db.products.findAll({
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

const findAllImagService = async (productIds) => {
  logger.info(
    `<-----😉 -----> Product Find All Images Service <-----😉 ----->`
  );

  try {
    let result = await db.image.findAll({ where: { id: productIds } });
    return result;
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

const deleteService = async (productId) => {
  logger.info(`<-----😉 -----> Product Delete Service <-----😉 ----->`);

  try {
    await db.orderedProduct.destroy({ where: { productId: productId } });
    await db.image.destroy({ where: { productId: prod } });
    const result = await db.products.destroy({ where: { id: productId } });

    if (!result) throw new Error(`Product not found...`);
    return result;
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

export {
  findByNameService,
  findByIdService,
  findByPkService,
  createService,
  findAllService,
  findAllImagService,
  deleteService,
};
