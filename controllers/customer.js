import bcrypt from "bcrypt";
import logger from "../utils/logger.js";
import { errorObject } from "../utils/errorObject.js";

import {
  findByEmailService,
  createService,
  findAllService,
  deleteService,
} from "../services/customer.js";

import { signLoginData } from "../utils/helper/createToken.js";

// ********************************************************************************** //
// ******************************** CUSTOMER CONTROLLER ******************************** //
// ********************************************************************************** //
const signUpCustomer = async (req, res, next) => {
  logger.info(`<-----😉 -----> Customer SignUp Controller <-----😉 ----->`);

  try {
    const { firstName, lastName, email, password, phone } = req.body;

    // find customer
    const user = await findByEmailService(email);
    if (user) throw errorObject("🤕 -> Customer Already Exists", "duplication");

    // creating customer
    const result = await createService(
      firstName,
      lastName,
      email,
      password,
      phone
    );

    const payload = {
      userId: result.id,
      email: result.email,
    };

    let accessToken = await signLoginData({ data: payload }, 120000000),
      refreshToken = await signLoginData({ data: "" }, 180000000);

    logger.info(`🤗 -> Customer SignUp Successfully...`);
    return res.status(201).json({
      success: true,
      message: "🤗 -> Customer SignUp Successfully...",
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
    logger.error(`😡 -> SignUp Failed...`);
    return next(error);
  }
};

const loginCustomer = async (req, res, next) => {
  logger.info(`<-----😉 -----> Customer Login Controller <-----😉 ----->`);

  try {
    const { email, password } = req.body;

    // find user
    const user = await findByEmailService(email);
    if (!user) throw errorObject("🤕 -> Customer not found", "notFound");

    // compare password
    const result = await bcrypt.compare(password, user.password);
    if (!result) throw errorObject("🤕 -> Invalid Password", "unAuthorized");

    // create token
    const payload = {
      userId: user.id,
      email: user.email,
    };

    let accessToken = await signLoginData({ data: payload }, 120000000),
      refreshToken = await signLoginData({ data: "" }, 180000000);

    logger.info(`🤗 -> Customer login Successfully...`);
    return res.status(201).json({
      success: true,
      message: "🤗 -> Customer login Successfully...",
      customer: {
        email,
        password,
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    logger.error(`😡 -> Login Failed...`);
    return next(error);
  }
};

const updateCustomer = async (req, res, next) => {
  logger.info(`<-----😉 -----> Customer Update Controller <-----😉 ----->`);

  try {
    const { userId, email } = req.user;

    // Find customer
    const user = await findByEmailService(email);
    if (!user) throw errorObject("🤕 -> Customer not found", "notFound");

    let updateInfo = {};
    const { firstName, lastName, phone } = req.body;

    firstName && (updateInfo.firstName = firstName);
    lastName && (updateInfo.lastName = lastName);
    phone && (updateInfo.phone = phone);

    // Update password
    const customer = await user.update(updateInfo);

    logger.info(`🤗 -> Customer Updated Successfully...`);
    return res.status(201).json({
      success: true,
      message: "🤗 -> Customer Updated Successfully...",
      customer: customer,
    });
  } catch (error) {
    logger.error(`😡 -> Customer not Updated...`);
    return next(error);
  }
};

const changePassword = async (req, res, next) => {
  try {
    const { userId, email } = req.user;
    const { oldPassword, newPassword } = req.body;

    // validate customer
    const customer = await findByEmailService(email);
    if (!customer) throw errorObject("🤕 -> Customer not found", "notFound");

    // comparing old password.
    const result = await bcrypt.compare(oldPassword, customer.password);
    if (!result) throw errorObject(`🤕 ->Invalid Password`, "unAuthorized");

    customer.password = newPassword;

    customer.save();

    logger.info(`🤗 -> Password Changed Successfully...`);
    return res.status(201).json({
      success: true,
      message: "🤗 -> Password Changed Successfully...",
      customer: customer,
    });
  } catch (error) {
    logger.error(`😡 -> Password not changed Successfully...`);
    return next(error);
  }
};

const forgetPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    // validate Customer
    const customer = await findByEmailService(email);
    if (!customer) throw errorObject("🤕 -> Customer not found", "notFound");

    // Generate a random number between a specific range
    let resetPassword = 0;
    for (let i = 0; i < 6; i++) {
      const min = 1;
      const max = 10;
      const randomInRange = Math.floor(Math.random() * (max - min + 1)) + min;
      resetPassword = `${resetPassword}${randomInRange}`;
    }

    // Sending Email...
    await sendEmail(email, `RESET PASSWORD`, resetPassword);

    // hash password...
    const hashedPassword = await bcrypt.hash(resetPassword, 10);

    // Update Password
    admin.password = hashedPassword;
    admin.save();

    logger.info(`🤗 -> Password Sent to Your Mail Successfully...`);
    return res.status(201).json({
      success: true,
      message: "🤗 -> Password Sent to Your Mail Successfully...",
    });
  } catch (error) {
    logger.error(`😡 -> Password not changed Successfully...`);
    return next(error);
  }
};

const findAllCustomers = async (req, res, next) => {
  logger.info(`<-----😉 -----> Customer FindAll Controller <-----😉 ----->`);

  try {
    const { customerId, firstName, email } = req.query;

    // filter...
    const filter = {};
    customerId && (filter.id = customerId);
    firstName && (filter.firstName = firstName);
    email && (filter.email = email);
    const customers = await findAllService(filter);
    if (customers.length == 0)
      throw errorObject("🤕 -> Customer not found", "notFound");

    logger.info(`🤗 -> All Customers finded Successfully...`);
    return res.status(201).json({
      success: true,
      message: "🤗 -> All Customers finded Successfully...",
      customer: customers,
    });
  } catch (error) {
    logger.error(`😡 -> Customer not Finded...`);
    return next(error);
  }
};

const delCustomer = async (req, res, next) => {
  logger.info(`<-----😉 -----> Customer Delete Controller <-----😉 ----->`);

  try {
    const id = req.params.id;

    const customer = await deleteService(id);
    if (customer === 0)
      throw errorObject("🤕 -> Customer not found", "notFound");

    logger.info(`🤗 -> Customer Deleted Successfully...`);
    return res.status(200).json({
      success: true,
      message: `🤗 -> Customer Deleted Successfully...`,
      customer: customer,
    });
  } catch (error) {
    logger.error(`😡 -> Customer not Deleted...`);
    return next(error);
  }
};

export {
  signUpCustomer,
  loginCustomer,
  updateCustomer,
  changePassword,
  forgetPassword,
  findAllCustomers,
  delCustomer,
};
