import bcrypt from "bcrypt";
import logger from "../utils/logger.js";
import { errorObject } from "../utils/errorObject.js";

import { findByEmailService, createService } from "../services/admin.js";

import { signLoginData } from "../utils/helper/createToken.js";

import sendEmail from "../utils/sendEmail.js";

// ********************************************************************************** //
// ******************************** ADMIN CONTROLLER ******************************** //
// ********************************************************************************** //
const signUp = async (req, res, next) => {
  logger.info(`<-----😉 -----> Admin SignUp Controller <-----😉 ----->`);

  try {
    const { firstName, lastName, email, password } = req.body;

    // find admin
    const user = await findByEmailService(email);
    if (user) throw errorObject("🤕 -> Admin Already Exists...", "duplication");

    // creating admin
    const result = await createService(firstName, lastName, email, password);
    if (!result) throw errorObject("🤕 -> Admin not Created...");

    const payload = {
      userId: result.id,
      email: result.email,
    };

    let accessToken = await signLoginData({ data: payload }, 120000000),
      refreshToken = await signLoginData({ data: "" }, 180000000);

    logger.info(`🤗 -> Admin SignUp Successfully...`);
    return res.status(201).json({
      success: true,
      message: "🤗 -> Admin SignUp Successfully...",
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
    logger.error(`😡 -> Admin not SignUp...`);
    return next(error);
  }
};

const login = async (req, res, next) => {
  logger.info(`<-----😉 -----> Admin Login Controller <-----😉 ----->`);

  try {
    const { email, password } = req.body;

    // find Admin
    const admin = await findByEmailService(email);
    if (!admin) throw errorObject("🤕 -> Admin not Found...", "notFound");

    // comparing hashed password.
    const result = await bcrypt.compare(password, admin.password);
    if (!result) throw errorObject("🤕 -> Invalid Password...", "unAuthorized");

    // create token
    const payload = {
      adminId: admin.id,
      email: admin.email,
      role: admin.role,
    };

    let accessToken = await signLoginData({ data: payload }, 120000000),
      refreshToken = await signLoginData({ data: "" }, 180000000);

    logger.info(`🤗 -> Admin login Successfully...`);
    return res.status(201).json({
      success: true,
      message: "🤗 -> Admin login Successfully...",
      admin: admin,
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
  } catch (error) {
    logger.error(`😡 -> Admin not Login...`);
    return next(error);
  }
};

const changePassword = async (req, res, next) => {
  try {
    const { userId, email } = req.user;
    const { oldPassword, newPassword } = req.body;

    // validate Admin
    const admin = await findByEmailService(email);
    if (!admin) throw errorObject("🤕 -> Admin not Found...", "notFound");

    // Validate Admin Role...
    if (admin.role !== "superAdmin")
      throw errorObject(
        "🤕 -> Only Super Admin can change Password...",
        "unAuthorized"
      );

    // comparing old password.
    const result = await bcrypt.compare(oldPassword, admin.password);
    if (!result) throw errorObject("🤕 -> Invalid Password", "unAuthorized");

    admin.password = newPassword;

    admin.save();

    logger.info(`🤗 -> Password Changed Successfully...`);
    return res.status(201).json({
      success: true,
      message: "🤗 -> Password Changed Successfully...",
      admin: admin,
    });
  } catch (error) {
    logger.error(`😡 -> Password not changed Successfully...`);
    return next(error);
  }
};

const forgetPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    // validate Admin
    const admin = await findByEmailService(email);
    if (!admin) throw errorObject("🤕 -> Admin not Found...", "notFound");

    // Validate Admin Role...
    if (admin.role !== "superAdmin")
      throw errorObject(
        "🤕 -> Only Super Admin can Reset Password...",
        "unAuthorized"
      );

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

const update = async (req, res, next) => {
  logger.info(`<-----😉 -----> Admin Update Controller <-----😉 ----->`);

  try {
    const { userId, email } = req.user;

    // find admin
    const user = await findByEmailService(email);
    if (!user) throw errorObject("🤕 -> Admin not Found...", "notFound");

    // Validate Admin Role...
    if (user.role !== "superAdmin")
      throw errorObject(
        "🤕 -> Only Super Admin can Update Changings...",
        "unAuthorized"
      );

    const updateInfo = {};
    const { firstName, lastName } = req.body;
    firstName && (updateInfo.firstName = firstName);
    lastName && (updateInfo.lastName = lastName);

    // Update password
    const admin = await user.update(updateInfo);
    logger.info(`🤗 -> Admin Updated Successfully...`);
    return res.status(201).json({
      success: true,
      message: "🤗 -> Admin Updated Successfully...",
      admin: admin,
    });
  } catch (error) {
    logger.error(`😡 -> Admin not Updated...`);
    return next(error);
  }
};

export { signUp, login, update, changePassword, forgetPassword };
