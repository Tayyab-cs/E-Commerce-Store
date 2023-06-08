import bcrypt from 'bcrypt';
import logger from '../utils/logger';
import errorObject from '../utils/errorObject';
import customerService from '../services/customer';
import signLoginData from '../utils/helper/createToken';
import sendEmail from '../utils/sendEmail';

// ********************************************************************************** //
// ******************************** CUSTOMER CONTROLLER ******************************** //
// ********************************************************************************** //
const signUp = async (req, res, next) => {
  logger.info('<-----😉 -----> Customer SignUp Controller <-----😉 ----->');

  try {
    const { firstName, lastName, email, password, phone } = req.body;

    // find customer
    const user = await customerService.findByEmail(email);
    if (user) throw errorObject('🤕 -> Customer Already Exists', 'duplication');

    // creating customer
    const result = await customerService.create(
      firstName,
      lastName,
      email,
      password,
      phone,
    );

    const payload = {
      userId: result.id,
      email: result.email,
    };

    const accessToken = await signLoginData({ data: payload }, 120000000);
    const refreshToken = await signLoginData({ data: '' }, 180000000);

    logger.info('🤗 -> Customer SignUp Successfully...');
    return res.status(201).json({
      success: true,
      message: '🤗 -> Customer SignUp Successfully...',
      customer: {
        firstName,
        lastName,
        email,
        password,
        phone,
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    logger.error('😡 -> SignUp Failed...');
    return next(error);
  }
};

const login = async (req, res, next) => {
  logger.info('<-----😉 -----> Customer Login Controller <-----😉 ----->');

  try {
    const { email, password } = req.body;

    // find user
    const user = await customerService.findByEmail(email);
    if (!user) throw errorObject('🤕 -> Customer not found', 'notFound');

    // compare password
    const result = await bcrypt.compare(password, user.password);
    if (!result) throw errorObject('🤕 -> Invalid Password', 'unAuthorized');

    // create token
    const payload = {
      userId: user.id,
      email: user.email,
    };

    const accessToken = await signLoginData({ data: payload }, 120000000);
    const refreshToken = await signLoginData({ data: '' }, 180000000);

    logger.info('🤗 -> Customer login Successfully...');
    return res.status(201).json({
      success: true,
      message: '🤗 -> Customer login Successfully...',
      customer: {
        email,
        password,
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    logger.error('😡 -> Login Failed...');
    return next(error);
  }
};

const update = async (req, res, next) => {
  logger.info('<-----😉 -----> Customer Update Controller <-----😉 ----->');

  try {
    const { email } = req.user;

    // Find customer
    const user = await customerService.findByEmail(email);
    if (!user) throw errorObject('🤕 -> Customer not found', 'notFound');

    const updateInfo = {};
    const { firstName, lastName, phone } = req.body;

    if (firstName) updateInfo.firstName = firstName;
    if (lastName) updateInfo.lastName = lastName;
    if (phone) updateInfo.phone = phone;

    // Update password
    const customer = await user.update(updateInfo);

    logger.info('🤗 -> Customer Updated Successfully...');
    return res.status(201).json({
      success: true,
      message: '🤗 -> Customer Updated Successfully...',
      customer,
    });
  } catch (error) {
    logger.error('😡 -> Customer not Updated...');
    return next(error);
  }
};

const changePassword = async (req, res, next) => {
  try {
    const { email } = req.user;
    const { oldPassword, newPassword } = req.body;

    // validate customer
    const customer = await customerService.findByEmail(email);
    if (!customer) throw errorObject('🤕 -> Customer not found', 'notFound');

    // comparing old password.
    const result = await bcrypt.compare(oldPassword, customer.password);
    if (!result) throw errorObject('🤕 ->Invalid Password', 'unAuthorized');

    customer.password = newPassword;

    customer.save();

    logger.info('🤗 -> Password Changed Successfully...');
    return res.status(201).json({
      success: true,
      message: '🤗 -> Password Changed Successfully...',
      customer,
    });
  } catch (error) {
    logger.error('😡 -> Password not changed Successfully...');
    return next(error);
  }
};

const forgetPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    // validate Customer
    const customer = await customerService.findByEmail(email);
    if (!customer) throw errorObject('🤕 -> Customer not found', 'notFound');

    // Generate a random number between a specific range
    let resetPassword = 0;
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < 6; i++) {
      const min = 1;
      const max = 10;
      const randomInRange = Math.floor(Math.random() * (max - min + 1)) + min;
      resetPassword = `${resetPassword}${randomInRange}`;
    }

    // Sending Email...
    await sendEmail(email, 'RESET PASSWORD', resetPassword);

    // hash password...
    const hashedPassword = await bcrypt.hash(resetPassword, 10);

    // Update Password
    customer.password = hashedPassword;
    customer.save();

    logger.info('🤗 -> Password Sent to Your Mail Successfully...');
    return res.status(201).json({
      success: true,
      message: '🤗 -> Password Sent to Your Mail Successfully...',
    });
  } catch (error) {
    logger.error('😡 -> Password not changed Successfully...');
    return next(error);
  }
};

const findAll = async (req, res, next) => {
  logger.info('<-----😉 -----> Customer FindAll Controller <-----😉 ----->');

  try {
    const { customerId, firstName, email } = req.query;

    // filter...
    const filter = {};
    if (customerId) filter.id = customerId;
    if (firstName) filter.firstName = firstName;
    if (email) filter.email = email;
    const customers = await customerService.findAll(filter);
    if (customers.length === 0) {
      throw errorObject('🤕 -> Customer not found', 'notFound');
    }

    logger.info('🤗 -> All Customers finded Successfully...');
    return res.status(201).json({
      success: true,
      message: '🤗 -> All Customers finded Successfully...',
      customer: customers,
    });
  } catch (error) {
    logger.error('😡 -> Customer not Finded...');
    return next(error);
  }
};

const del = async (req, res, next) => {
  logger.info('<-----😉 -----> Customer Delete Controller <-----😉 ----->');

  try {
    const { id } = req.params.id;

    const customer = await customerService.del(id);
    if (customer === 0) {
      throw errorObject('🤕 -> Customer not found', 'notFound');
    }

    logger.info('🤗 -> Customer Deleted Successfully...');
    return res.status(200).json({
      success: true,
      message: '🤗 -> Customer Deleted Successfully...',
      customer,
    });
  } catch (error) {
    logger.error('😡 -> Customer not Deleted...');
    return next(error);
  }
};

export default {
  signUp,
  login,
  update,
  changePassword,
  forgetPassword,
  findAll,
  del,
};
