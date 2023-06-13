import logger from '../utils/logger.js';
import db from '../database/connect.js';

// ********************************************************************************** //
// ********************************** CUSTOMER SERVICE ********************************* //
// ********************************************************************************** //

const findByEmail = async (email) => {
  logger.info('<-----😉 -----> Customer SignUp Service <-----😉 ----->');
  try {
    const result = await db.customer.findOne({ where: { email } });
    return result;
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

const create = async (firstName, lastName, email, password, phone) => {
  logger.info('<-----😉 -----> Customer Create Service <-----😉 ----->');
  try {
    const result = await db.customer.create({
      firstName,
      lastName,
      email,
      password,
      phone,
    });
    return result;
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

const findAll = async (filter) => {
  logger.info('<-----😉 -----> Customer findAll Service <-----😉 ----->');

  try {
    const result = await db.customer.findAll({ where: filter });
    return result;
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

const findOne = async (id) => {
  logger.info('<-----😉 -----> Customer findOne Service <-----😉 ----->');

  try {
    const result = await db.customer.findByPk(id);
    return result;
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

const del = async (id) => {
  logger.info('<-----😉 -----> Customer Delete Service <-----😉 ----->');

  try {
    const result = await db.customer.destroy({ where: { id } });
    return result;
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

export default {
  findByEmail,
  create,
  findAll,
  findOne,
  del,
};
