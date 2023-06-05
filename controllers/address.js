import logger from "../utils/logger.js";
import { errorObject } from "../utils/errorObject.js";

import addressService from "../services/address.js";

// ********************************************************************************** //
// ******************************** ADDRESS CONTROLLER ******************************** //
// ********************************************************************************** //
const create = async (req, res, next) => {
  logger.info(`<-----😉 -----> Address Create Controller <-----😉 ----->`);

  try {
    const { houseNo, streetNo, area, city, state, postalCode, customerId } =
      req.body;

    // find customer
    const customer = await addressService.findById(customerId);
    if (!customer) throw errorObject("🤕 -> Customer not found", "notFound");

    // creating address
    const result = await addressService.create(
      houseNo,
      streetNo,
      area,
      city,
      state,
      postalCode,
      customerId
    );
    if (result) {
      logger.info(`🤗 -> Address Created Successfully `);
      res.status(201).json({
        success: true,
        successMessage: `🤗 -> Address Created Successfully`,
        address: result,
      });
    }
  } catch (error) {
    logger.error(`😡 -> Address not Created...`);
    return next(error);
  }
};

const update = async (req, res, next) => {
  logger.info(`<-----😉 -----> Address Update Controller <-----😉 ----->`);

  try {
    let { houseNo, streetNo, area, city, state, postalCode, customerId } =
      req.body;

    let updateInfo = {};
    // find customer
    const user = await addressService.findById(customerId);
    if (!user) throw errorObject("🤕 -> Customer not found", "notFound");
    houseNo && (updateInfo.houseNo = houseNo);
    streetNo && (updateInfo.streetNo = streetNo);
    area && (updateInfo.area = area);
    city && (updateInfo.city = city);
    state && (updateInfo.state = state);
    postalCode && (updateInfo.postalCode = postalCode);
    customerId && (updateInfo.customerId = customerId);

    // Update password
    const result = await addressService.update(updateInfo, customerId);

    logger.info(`🤗 -> Address updated Successfully `);
    res.status(201).json({
      success: true,
      successMessage: `🤗 -> Address updated Successfully `,
      address: result,
    });
  } catch (error) {
    logger.error(`😡 -> Address not Updated...`);
    return next(error);
  }
};

const findAll = async (req, res, next) => {
  logger.info(`<-----😉 -----> Address FindAll Controller <-----😉 ----->`);

  try {
    const { customerId, houseNo, streetNo, area, city, state, postalCode } =
      req.query;

    // Filter...
    const filter = {};
    customerId && (filter.customerId = customerId);
    houseNo && (filter.houseNo = houseNo);
    streetNo && (filter.streetNo = streetNo);
    area && (filter.area = area);
    city && (filter.city = city);
    state && (filter.state = state);
    postalCode && (filter.postalCode = postalCode);

    const address = await addressService.findAll(filter);

    logger.info(`🤗 -> All Address finded Successfully `);
    res.status(201).json({
      success: true,
      successMessage: `🤗 -> All Address finded Successfully`,
      address: address,
    });
  } catch (error) {
    logger.error(`😡 -> Address not Finded...`);
    return next(error);
  }
};

const del = async (req, res, next) => {
  logger.info(`<-----😉 -----> Address Delete Controller <-----😉 ----->`);

  try {
    const id = req.params.id;
    const result = await addressService.del(id);

    logger.info(`Address Deleted Successfully...`);
    res.status(201).json({
      success: true,
      successMessage: `Address Deleted Successfully...`,
      address: result,
    });
  } catch (error) {
    logger.error(`😡 -> Address not Deleted...`);
    return next(error);
  }
};

export default { create, update, findAll, del };
