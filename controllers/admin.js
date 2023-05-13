import logger from "../utils/logger.js";

import {
  findByEmailService,
  createService,
  findAllService,
} from "../services/admin.js";

// ********************************************************************************** //
// ******************************** ADMIN CONTROLLER ******************************** //
// ********************************************************************************** //
const signUp = async (req, res) => {
  logger.info(
    `<------------😉 ------------> Admin SignUp Controller <------------😉 ------------>`
  );

  try {
    const { firstName, lastName, email, password } = req.body;

    // find admin
    const user = await findByEmailService(email);

    if (user) {
      throw new Error(`${firstName} already exists.`);
    } else {
      // creating admin
      const result = await createService(firstName, lastName, email, password);
      if (result) {
        logger.info(`🤗 ==> Admin SignUp Successfully `);
        res.status(201).json({ successMessage: result });
      }
    }
  } catch (error) {
    logger.error(`😡 ==> ${error.message}`);
    res.status(500).json({ errorMessage: error.message });
  }
};

const login = async (req, res) => {
  logger.info(
    `<------------😉 ------------> Admin Login Controller <------------😉 ------------>`
  );

  try {
    const { email, password } = req.body;

    // find user
    const user = await findByEmailService(email);
    if (!user) {
      throw new Error(`😲 ==> user not exists in the database.`);
    } else if (password !== user.password) {
      throw new Error(`😲 ==> Invalid Password.`);
    }
    logger.info(`🤗 ==> Admin login Successfully `);
    res.status(201).json({ successMessage: user });
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ errorMessage: error.message });
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
    res.status(200).json(`coming soon 🙂`);
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ errorMessage: error.message });
  }
};

const del = async (req, res) => {
  logger.info(
    `<------------😉 ------------> Admin Delete Controller <------------😉 ------------>`
  );

  try {
    res.status(200).json(`coming soon 🙂`);
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ errorMessage: error.message });
  }
};

export { signUp, login, update, findAll, findOne, del };
