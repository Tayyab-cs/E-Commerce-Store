import logger from "../utils/logger.js";
import db from "../database/connect.js";

// ********************************************************************************** //
// ********************************** ADMIN SERVICE ********************************* //
// ********************************************************************************** //

const findByEmail = async (email) => {
  logger.info(`<-----😉 -----> Admin SignUp Service <-----😉 ----->`);
  try {
    const result = await db.admin.findOne({ where: { email } });
    return result;
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

const create = async (firstName, lastName, email, password) => {
  logger.info(`<-----😉 -----> Admin Create Service <-----😉 ----->`);
  try {
    const result = await db.admin.create({
      firstName,
      lastName,
      email,
      password,
    });
    return result;
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

export default { findByEmail, create };
