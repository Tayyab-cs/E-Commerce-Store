import logger from "../utils/logger.js";
import db from "../database/connect.js";

// ********************************************************************************** //
// ******************************** CATEGORY SERVICE ******************************** //
// ********************************************************************************** //

const findByIdService = async (id) => {
  logger.info(`<-----😉 -----> Category Find-by-Name Service <-----😉 ----->`);
  try {
    const result = await db.category.findOne({ where: { id } });
    return result;
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

const findByNameService = async (name) => {
  logger.info(`<-----😉 -----> Category Find-by-Name Service <-----😉 ----->`);
  try {
    const result = await db.category.findOne({ where: { name } });
    return result;
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

const createService = async (name, description, parentId) => {
  logger.info(`<-----😉 -----> Category Create Service <-----😉 ----->`);
  try {
    const result = await db.category.create({
      name,
      description,
      parentId,
    });
    return result;
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

const findAllService = async (filter) => {
  logger.info(`<-----😉 -----> Category FindAll Service <-----😉 ----->`);

  try {
    const result = await db.category.findAll({ where: filter });
    return result;
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

const deleteService = async (id) => {
  logger.info(`<-----😉 -----> Category Delete Service <-----😉 ----->`);
  console.log(id);

  try {
    const result = await db.category.destroy({ where: { id } });
    return result;
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

export {
  findByIdService,
  findByNameService,
  createService,
  findAllService,
  deleteService,
};
