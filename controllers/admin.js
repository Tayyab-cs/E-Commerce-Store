import bcrypt from "bcrypt";
import logger from "../utils/logger.js";

import {
  findByEmailService,
  createService,
  findAllService,
  findOneService,
  deleteService,
} from "../services/admin.js";

import { signLoginData } from "../utils/helper/createToken.js";

// ********************************************************************************** //
// ******************************** ADMIN CONTROLLER ******************************** //
// ********************************************************************************** //
const signUp = async (req, res, next) => {
  logger.info(
    `<------------😉 ------------> Admin SignUp Controller <------------😉 ------------>`
  );

  try {
    const { firstName, lastName, email, password } = req.body;

    // find admin
    const user = await findByEmailService(email);

    if (user) throw new Error(`${firstName} already exists.`);
    // creating admin
    const result = await createService(firstName, lastName, email, password);
    if (!result) throw new Error(`admin not created...`);

    const payload = {
      userId: result.id,
      email: result.email,
    };

    let accessToken = await signLoginData({ data: payload }, 120000000),
      refreshToken = await signLoginData({ data: "" }, 180000000);

    logger.info(`🤗 ==> Admin SignUp Successfully `);
    return res.status(201).json({
      success: true,
      message: "Sign-up completed successfully!",
      admin: {
        firstName,
        lastName,
        email,
        password,
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    logger.error(`😡 ==> ${error.message}`);
    return next(error);
  }
};

const login = async (req, res, next) => {
  logger.info(
    `<------------😉 ------------> Admin Login Controller <------------😉 ------------>`
  );

  try {
    const { email, password } = req.body;

    // find user
    const user = await findByEmailService(email);
    if (!user) throw new Error(`😲 ==> user not exists in the database.`);

    // comparing hashed password.
    const result = await bcrypt.compare(password, user.password);
    if (!result) throw new Error(`Invalid Password`);

    // create token
    const payload = {
      userId: user.id,
      email: user.email,
    };

    let accessToken = await signLoginData({ data: payload }, 120000000),
      refreshToken = await signLoginData({ data: "" }, 180000000);

    logger.info(`🤗 ==> Admin login Successfully `);
    return res.status(201).json({
      success: true,
      message: "Login completed successfully!",
      admin: {
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

const update = async (req, res) => {
  logger.info(
    `<------------😉 ------------> Admin Update Controller <------------😉 ------------>`
  );

  try {
    const { email, oldPassword, newPassword } = req.body;

    // find admin
    const user = await findByEmailService(email);
    if (!user) {
      throw new Error("Admin not found");
    } else if (oldPassword !== user.password) {
      throw new Error("Old password does not match");
    }

    // Update password
    await user.update({ password: newPassword });
    logger.info(`🤗 ==> Admin login Successfully `);
    res
      .status(200)
      .json({ successMessage: `🤗 ==> Password updated successfully` });
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ errorMessage: error.message });
  }
};

const findAll = async (req, res) => {
  logger.info(
    `<------------😉 ------------> Admin FindAll Controller <------------😉 ------------>`
  );

  try {
    const admins = await findAllService();
    logger.info(`🤗 ==> All Admins finded Successfully `);
    res.status(200).json(admins);
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ errorMessage: error.message });
  }
};

const findOne = async (req, res) => {
  logger.info(
    `<------------😉 ------------> Admin FindOne Controller <------------😉 ------------>`
  );

  try {
    const { userId } = req.user;
    const admin = await findOneService(userId);
    return res.status(200).json({
      success: true,
      message: `Admin founded successfully!`,
      admin: admin,
    });
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ errorMessage: error.message });
  }
};

const del = async (req, res, next) => {
  logger.info(
    `<------------😉 ------------> Admin Delete Controller <------------😉 ------------>`
  );

  try {
    const { email } = req.user;
    const admin = await deleteService(email);
    if (admin === 0) throw new Error(`notFound`);
    return res.status(200).json({
      success: true,
      message: `Admin Deleted successfully!`,
      admin: admin,
    });
  } catch (error) {
    logger.error(error.message);
    return next(error);
  }
};

export { signUp, login, update, findAll, findOne, del };
