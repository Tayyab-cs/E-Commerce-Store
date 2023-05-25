import logger from "../utils/logger.js";
import db from "../database/connect.js";

// ********************************************************************************** //
// ******************************** PRODUCT SERVICE ******************************** //
// ********************************************************************************** //

const findByNameService = async (name) => {
  logger.info(
    `<------------😉 ------------> Product Find-by-Name Service <------------😉 ------------>`
  );
  try {
    const result = await db.products.findOne({ where: { name } });
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const findByIdService = async (subCategoryId) => {
  logger.info(
    `<------------😉 ------------> Product Find-by-ID Service <------------😉 ------------>`
  );
  try {
    const result = await db.category.findOne({
      where: { parentId: subCategoryId },
    });
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const createService = async (
  name,
  description,
  price,
  quantity,
  subCategoryId
) => {
  logger.info(
    `<------------😉 ------------> Product Create Service <------------😉 ------------>`
  );
  try {
    const result = await db.products.create({
      name,
      description,
      price,
      quantity,
      subCategoryId,
    });
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const findAllService = async (filter, sortOptions) => {
  logger.info(
    `<------------😉 ------------> Product Find Service <------------😉 ------------>`
  );

  try {
    const result = await db.products.findAll({
      where: filter,
      order: sortOptions,
    });
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const deleteService = async (id, name) => {
  logger.info(
    `<------------😉 ------------> Product Delete Service <------------😉 ------------>`
  );

  try {
    await db.orderedProduct.destroy({ where: { productId: id } });
    const result = await db.products.destroy({ where: { id: id, name: name } });

    if (!result) throw new Error(`Product not found...`);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const paginationService = async (offset, pageSize) => {
  logger.info(
    `<------------😉 ------------> Product Pagination Service <------------😉 ------------>`
  );

  try {
    let result = await db.products.findAll({ offset, limit: pageSize });
    return result;
  } catch (error) {
    logger.error(error.message);
    return error.message;
  }
};

export {
  findByNameService,
  findByIdService,
  createService,
  findAllService,
  deleteService,
  paginationService,
};
