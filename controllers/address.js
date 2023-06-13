import logger from '../utils/logger.js';
import errorObject from '../utils/errorObject.js';
import addressService from '../services/address.js';
// ********************************************************************************** //
// ******************************** ADDRESS CONTROLLER ******************************** //
// ********************************************************************************** //
const create = async (req, res, next) => {
  logger.info('<-----😉 -----> Address Create Controller <-----😉 ----->');

  try {
    // eslint-disable-next-line operator-linebreak
    const { houseNo, streetNo, area, city, state, postalCode, customerId } =
      req.body;

    // find customer
    const customer = await addressService.findById(customerId);
    if (!customer) throw errorObject('🤕 -> Customer not found', 'notFound');

    // creating address
    const result = await addressService.create(
      houseNo,
      streetNo,
      area,
      city,
      state,
      postalCode,
      customerId,
    );
    if (result) {
      logger.info('🤗 -> Address Created Successfully ');
      res.status(201).json({
        success: true,
        successMessage: '🤗 -> Address Created Successfully',
        address: result,
      });
    }
  } catch (error) {
    logger.error('😡 -> Address not Created...');
    return next(error);
  }
};

const update = async (req, res, next) => {
  logger.info('<-----😉 -----> Address Update Controller <-----😉 ----->');

  try {
    // eslint-disable-next-line operator-linebreak
    const { houseNo, streetNo, area, city, state, postalCode, customerId } =
      req.body;

    const updateInfo = {};
    // find customer
    const user = await addressService.findById(customerId);
    if (!user) throw errorObject('🤕 -> Customer not found', 'notFound');
    if (houseNo) updateInfo.houseNo = houseNo;
    if (streetNo) updateInfo.streetNo = streetNo;
    if (area) updateInfo.area = area;
    if (city) updateInfo.city = city;
    if (state) updateInfo.state = state;
    if (postalCode) updateInfo.postalCode = postalCode;
    if (customerId) updateInfo.customerId = customerId;

    // Update password
    const result = await addressService.update(updateInfo, customerId);

    logger.info('🤗 -> Address updated Successfully ');
    res.status(201).json({
      success: true,
      successMessage: '🤗 -> Address updated Successfully ',
      address: result,
    });
  } catch (error) {
    logger.error('😡 -> Address not Updated...');
    return next(error);
  }
};

const findAll = async (req, res, next) => {
  logger.info('<-----😉 -----> Address FindAll Controller <-----😉 ----->');

  try {
    // eslint-disable-next-line operator-linebreak
    const { customerId, houseNo, streetNo, area, city, state, postalCode } =
      req.query;

    // Filter...
    const filter = {};
    if (customerId) filter.customerId = customerId;
    if (houseNo) filter.houseNo = houseNo;
    if (streetNo) filter.streetNo = streetNo;
    if (area) filter.area = area;
    if (city) filter.city = city;
    if (state) filter.state = state;
    if (postalCode) filter.postalCode = postalCode;

    const address = await addressService.findAll(filter);

    logger.info('🤗 -> All Address finded Successfully ');
    res.status(201).json({
      success: true,
      successMessage: '🤗 -> All Address finded Successfully',
      address,
    });
  } catch (error) {
    logger.error('😡 -> Address not Finded...');
    return next(error);
  }
};

const del = async (req, res, next) => {
  logger.info('<-----😉 -----> Address Delete Controller <-----😉 ----->');

  try {
    const { id } = req.params.id;
    const result = await addressService.del(id);

    logger.info('Address Deleted Successfully...');
    res.status(201).json({
      success: true,
      successMessage: 'Address Deleted Successfully...',
      address: result,
    });
  } catch (error) {
    logger.error('😡 -> Address not Deleted...');
    return next(error);
  }
};

export default { create, update, findAll, del };
