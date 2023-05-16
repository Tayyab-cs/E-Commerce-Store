import logger from "../utils/logger.js";
import {
  findByIdService,
  createService,
  updateService,
  findAllService,
} from "../services/address.js";

// ********************************************************************************** //
// ******************************** ADDRESS CONTROLLER ******************************** //
// ********************************************************************************** //
const createAddress = async (req, res, next) => {
  logger.info(
    `<------------😉 ------------> Address Create Controller <------------😉 ------------>`
  );

  try {
    const { houseNo, streetNo, area, city, state, postalCode, customerId } =
      req.body;

    // find customer
    const customer = await findByIdService(customerId);
    console.log(customer);

    if (!customer) {
      throw new Error(`Customer not exists.`);
    } else {
      // creating address
      const result = await createService(
        houseNo,
        streetNo,
        area,
        city,
        state,
        postalCode,
        customerId
      );
      if (result) {
        logger.info(`🤗 ==> Address Created Successfully `);
        res.status(201).json({ successMessage: result });
      }
    }
  } catch (error) {
    logger.error(`😡 ==> ${error.message}`);
    return next(error);
  }
};

const updateAddress = async (req, res, next) => {
  logger.info(
    `<------------😉 ------------> Address Update Controller <------------😉 ------------>`
  );

  try {
    let { houseNo, streetNo, area, city, state, postalCode, customerId } =
      req.body;

    let updateInfo = {};

    // find customer
    const user = await findByIdService(customerId);
    if (!user) throw new Error("Customer not found");
    houseNo && (updateInfo.houseNo = houseNo);
    streetNo && (updateInfo.streetNo = streetNo);
    area && (updateInfo.area = area);
    city && (updateInfo.city = city);
    state && (updateInfo.state = state);
    postalCode && (updateInfo.postalCode = postalCode);
    customerId && (updateInfo.customerId = customerId);

    // Update password
    await updateService(updateInfo, customerId);

    logger.info(`🤗 ==> Address updated Successfully `);
    res
      .status(200)
      .json({ successMessage: `🤗 ==> Address updated successfully` });
  } catch (error) {
    logger.error(error.message);
    return next(error);
  }
};

const findAllAddress = async (req, res) => {
  logger.info(
    `<------------😉 ------------> Address FindAll Controller <------------😉 ------------>`
  );

  try {
    const address = await findAllService();
    logger.info(`🤗 ==> All Address finded Successfully `);
    res.status(200).json(address);
  } catch (error) {
    logger.error(error.message);
    return next(error);
  }
};

const findOneAddress = async (req, res) => {
  logger.info(
    `<------------😉 ------------> Address FindOne Controller <------------😉 ------------>`
  );

  try {
    res.status(200).json(`coming soon 🙂`);
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ errorMessage: error.message });
  }
};

const delAddress = async (req, res) => {
  logger.info(
    `<------------😉 ------------> Address Delete Controller <------------😉 ------------>`
  );

  try {
    res.status(200).json(`coming soon 🙂`);
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ errorMessage: error.message });
  }
};

const testApi = (req, res, next) => {
  console.log(`test Api............`);
  next();
};

export {
  createAddress,
  updateAddress,
  findAllAddress,
  findOneAddress,
  delAddress,
  testApi,
};
