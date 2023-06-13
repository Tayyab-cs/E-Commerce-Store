import logger from '../utils/logger.js';
import db from '../database/connect.js';

// ********************************************************************************** //
// ******************************** CATEGORY SERVICE ******************************** //
// ********************************************************************************** //

const findById = async (id) => {
  logger.info('<-----😉 -----> Category Find-by-Name Service <-----😉 ----->');
  try {
    const result = await db.category.findOne({ where: { id } });
    return result;
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

const findByName = async (name) => {
  logger.info('<-----😉 -----> Category Find-by-Name Service <-----😉 ----->');
  try {
    const result = await db.category.findOne({ where: { name } });
    return result;
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

const create = async (name, description, parentId) => {
  logger.info('<-----😉 -----> Category Create Service <-----😉 ----->');
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

const findAll = async (filter) => {
  logger.info('<-----😉 -----> Category FindAll Service <-----😉 ----->');

  try {
    const result = await db.category.findAll({ where: filter });
    return result;
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

const del = async (id) => {
  logger.info('<-----😉 -----> Category Delete Service <-----😉 ----->');

  try {
    const result = await db.category.destroy({ where: { id } });
    return result;
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

export default {
  findById,
  findByName,
  create,
  findAll,
  del,
};
