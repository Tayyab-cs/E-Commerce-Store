import logger from "../utils/logger.js";
import db from "../database/connect.js";

// ********************************************************************************** //
// ******************************** CATEGORY SERVICE ******************************** //
// ********************************************************************************** //

const findByNameService = async (name) => {
  logger.info(
    `<------------😉 ------------> Category Find-by-Name Service <------------😉 ------------>`
  );
  try {
    const result = await db.category.findOne({ where: { name } });
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const createService = async (name, description, parentId) => {
  logger.info(
    `<------------😉 ------------> Category Create Service <------------😉 ------------>`
  );
  try {
    const result = await db.category.create({
      name,
      description,
      parentId,
    });
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const findAllService = async () => {
  logger.info(
    `<------------😉 ------------> Category FindAll Service <------------😉 ------------>`
  );

  try {
    const result = await db.category.findAll();
    return result;
  } catch (error) {
    console.error(err);
    throw err;
  }
};

export { findByNameService, createService, findAllService };
