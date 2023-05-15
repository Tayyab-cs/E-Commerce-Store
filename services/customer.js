import logger from "../utils/logger.js";
import db from "../database/connect.js";

// ********************************************************************************** //
// ********************************** CUSTOMER SERVICE ********************************* //
// ********************************************************************************** //

const findByEmailService = async (email) => {
  logger.info(
    `<------------😉 ------------> Customer SignUp Service <------------😉 ------------>`
  );
  try {
    const result = await db.customer.findOne({ where: { email } });
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const createService = async (
  firstName,
  lastName,
  email,
  password,
  address,
  postalCode,
  city,
  phone
) => {
  logger.info(
    `<------------😉 ------------> Customer Create Service <------------😉 ------------>`
  );
  try {
    const result = await db.customer.create({
      firstName,
      lastName,
      email,
      password,
      address,
      postalCode,
      city,
      phone,
    });
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const findAllService = async () => {
  logger.info(
    `<------------😉 ------------> Customer findAll Service <------------😉 ------------>`
  );

  try {
    const result = await db.customer.findAll();
    return result;
  } catch (error) {
    console.error(err);
    throw err;
  }
};

export { findByEmailService, createService, findAllService };
