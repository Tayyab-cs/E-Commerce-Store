import logger from "../utils/logger.js";
import db from "../database/connect.js";

// ********************************************************************************** //
// ********************************** ADDRESS SERVICE ********************************* //
// ********************************************************************************** //

const findByIdService = async (customerId) => {
  logger.info(
    `<------------😉 ------------> Address find-by-Id Service <------------😉 ------------>`
  );
  try {
    const result = await db.customer.findByPk(customerId);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const createService = async (
  houseNo,
  streetNo,
  area,
  city,
  state,
  postalCode,
  customerId
) => {
  logger.info(
    `<------------😉 ------------> Address Create Service <------------😉 ------------>`
  );
  console.log(state);
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
    console.error(error);
    throw error;
  }
};

const updateService = async (updateInfo, customerId) => {
  logger.info(
    `<------------😉 ------------> Address Update Service <------------😉 ------------>`
  );

  try {
    const result = await db.address.update(updateInfo, {
      where: { customerId },
    });
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const findAllService = async () => {
  logger.info(
    `<------------😉 ------------> Address findAll Service <------------😉 ------------>`
  );

  try {
    const result = await db.address.findAll();
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export { findByIdService, createService, updateService, findAllService };
