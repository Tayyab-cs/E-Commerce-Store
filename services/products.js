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

const findAllService = async () => {
  logger.info(
    `<------------😉 ------------> Product FindAll Service <------------😉 ------------>`
  );

  try {
    const result = await db.products.findAll();
    return result;
  } catch (error) {
    console.error(err);
    throw err;
  }
};

export { findByNameService, findByIdService, createService, findAllService };
