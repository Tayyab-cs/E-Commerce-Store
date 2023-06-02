import logger from "../utils/logger.js";
import db from "../database/connect.js";
import { where } from "sequelize";

// ********************************************************************************** //
// ********************************** CUSTOMER SERVICE ********************************* //
// ********************************************************************************** //

const findByEmailService = async (email) => {
  logger.info(`<-----😉 -----> Customer SignUp Service <-----😉 ----->`);
  try {
    const result = await db.customer.findOne({ where: { email } });
    return result;
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

const createService = async (firstName, lastName, email, password, phone) => {
  logger.info(`<-----😉 -----> Customer Create Service <-----😉 ----->`);
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

const findAllService = async (filter) => {
  logger.info(`<-----😉 -----> Customer findAll Service <-----😉 ----->`);

  try {
    const result = await db.customer.findAll({ where: filter });
    return result;
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

const findOneService = async (id) => {
  logger.info(`<-----😉 -----> Customer findOne Service <-----😉 ----->`);

  try {
    const result = await db.customer.findByPk(id);
    return result;
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

const deleteService = async (id) => {
  logger.info(`<-----😉 -----> Customer Delete Service <-----😉 ----->`);

  try {
    const result = await db.customer.destroy({ where: { id } });
    return result;
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

export {
  findByEmailService,
  createService,
  findAllService,
  findOneService,
  deleteService,
};
