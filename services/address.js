import logger from '../utils/logger.js';
import db from '../database/connect.js';

// ********************************************************************************** //
// ********************************** ADDRESS SERVICE ********************************* //
// ********************************************************************************** //

const findById = async (customerId) => {
  logger.info('<-----😉 -----> Address find-by-Id Service <-----😉 ----->');
  try {
    const result = await db.customer.findByPk(customerId);
    return result;
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

const create = async (
  houseNo,
  streetNo,
  area,
  city,
  state,
  postalCode,
  customerId,
) => {
  logger.info('<-----😉 -----> Address Create Service <-----😉 ----->');
  try {
    const result = await db.address.create({
      houseNo,
      streetNo,
      area,
      city,
      state,
      postalCode,
      customerId,
    });
    return result;
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

const update = async (updateInfo, customerId) => {
  logger.info('<-----😉 -----> Address Update Service <-----😉 ----->');

  try {
    const result = await db.address.update(updateInfo, {
      where: { customerId },
    });
    return result;
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

const findAll = async (filter) => {
  logger.info('<-----😉 -----> Address findAll Service <-----😉 ----->');

  try {
    const result = await db.address.findAll({ where: filter });
    return result;
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

const del = async (id) => {
  logger.info('<-----😉 -----> Address findAll Service <-----😉 ----->');

  try {
    const result = await db.address.destroy({ where: { id } });
    return result;
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

export default {
  findById,
  create,
  update,
  findAll,
  del,
};
