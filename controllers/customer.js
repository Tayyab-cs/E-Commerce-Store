import logger from "../utils/logger.js";
import bcrypt from "bcrypt";

import {
  findByEmailService,
  createService,
  findAllService,
  findOneService,
  deleteService,
} from "../services/customer.js";

import { signLoginData } from "../utils/helper/createToken.js";

// ********************************************************************************** //
// ******************************** CUSTOMER CONTROLLER ******************************** //
// ********************************************************************************** //
const signUpCustomer = async (req, res, next) => {
  logger.info(
    `<------------😉 ------------> Customer SignUp Controller <------------😉 ------------>`
  );

  try {
    const { firstName, lastName, email, password, phone } = req.body;

    // find customer
    const user = await findByEmailService(email);

    if (user) throw new Error(`${firstName} already exists.`);
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

    logger.info(`🤗 ==> Customer SignUp Successfully `);
    return res.status(201).json({
      success: true,
      message: "Sign-up completed successfully!",
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
    logger.error(`😡 ==> ${error.message}`);
    return next(error);
  }
};

const loginCustomer = async (req, res, next) => {
  logger.info(
    `<------------😉 ------------> Customer Login Controller <------------😉 ------------>`
  );

  try {
    const { email, password } = req.body;

    // find user
    const user = await findByEmailService(email);
    if (!user) throw new Error(`😲 ==> user not exists in the database.`);

    // compare password
    const result = await bcrypt.compare(password, user.password);
    if (!result) throw new Error(`Invalid Password`);

    // create token
    const payload = {
      userId: user.id,
      email: user.email,
    };

    let accessToken = await signLoginData({ data: payload }, 120000000),
      refreshToken = await signLoginData({ data: "" }, 180000000);

    logger.info(`🤗 ==> Customer login Successfully `);
    return res.status(201).json({
      success: true,
      message: "Login completed successfully!",
      customer: {
        email,
        password,
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    logger.error(error.message);
    return next(error);
  }
};

const updateCustomer = async (req, res, next) => {
  logger.info(
    `<------------😉 ------------> Customer Update Controller <------------😉 ------------>`
  );

  try {
    let { firstName, lastName, email } = req.body;
    let updateInfo = {};

    // find admin
    const user = await findByEmailService(email);
    if (!user) throw new Error("Customer not found");
    firstName && (updateInfo.firstName = firstName);
    lastName && (updateInfo.lastName = lastName);

    // Update password
    await user.update(updateInfo);

    logger.info(`🤗 ==> Customer login Successfully `);
    res
      .status(200)
      .json({ successMessage: `🤗 ==> Password updated successfully` });
  } catch (error) {
    logger.error(`😡 ==> ${error.message}`);
    return next(error);
  }
};

const findAllCustomers = async (req, res, next) => {
  logger.info(
    `<------------😉 ------------> Customer FindAll Controller <------------😉 ------------>`
  );

  try {
    const customers = await findAllService();
    logger.info(`🤗 ==> All Customers finded Successfully `);
    res.status(200).json(customers);
  } catch (error) {
    logger.error(`😡 ==> ${error.message}`);
    return next(error);
  }
};

const findOneCustomer = async (req, res, next) => {
  logger.info(
    `<------------😉 ------------> Customer FindOne Controller <------------😉 ------------>`
  );

  try {
    const { userId } = req.user;
    const customer = await findOneService(userId);
    logger.info(`🤗 ==> Customer Finded Successfully...`);
    return res.status(200).json({
      success: true,
      message: `Customer founded successfully!`,
      customer: customer,
    });
  } catch (error) {
    logger.error(`😡 ==> ${error.message}`);
    return next(error);
  }
};

const delCustomer = async (req, res, next) => {
  logger.info(
    `<------------😉 ------------> Customer Delete Controller <------------😉 ------------>`
  );

  try {
    const { email } = req.user;
    const customer = await deleteService(email);
    if (customer === 0) throw new Error(`notFound`);
    logger.info(`🤗 ==> Customer Deleted Successfully...`);
    return res.status(200).json({
      success: true,
      message: `customer Deleted successfully!`,
      customer: customer,
    });
  } catch (error) {
    logger.error(error.message);
    return next(error);
  }
};

export {
  signUpCustomer,
  loginCustomer,
  updateCustomer,
  findAllCustomers,
  findOneCustomer,
  delCustomer,
};
