import logger from "../utils/logger.js";
import {
  findByEmailService,
  createService,
  findAllService,
} from "../services/customer.js";

// ********************************************************************************** //
// ******************************** CUSTOMER CONTROLLER ******************************** //
// ********************************************************************************** //
const signUpCustomer = async (req, res) => {
  logger.info(
    `<------------😉 ------------> Customer SignUp Controller <------------😉 ------------>`
  );

  try {
    const {
      firstName,
      lastName,
      email,
      password,
      address,
      postalCode,
      city,
      phone,
    } = req.body;

    // find customer
    const user = await findByEmailService(email);

    if (user) {
      throw new Error(`${firstName} already exists.`);
    } else {
      // creating customer
      const result = await createService(
        firstName,
        lastName,
        email,
        password,
        address,
        postalCode,
        city,
        phone
      );
      if (result) {
        logger.info(`🤗 ==> Customer SignUp Successfully `);
        res.status(201).json({ successMessage: result });
      }
    }
  } catch (error) {
    logger.error(`😡 ==> ${error.message}`);
    res.status(500).json({ errorMessage: error.message });
  }
};

const loginCustomer = async (req, res) => {
  logger.info(
    `<------------😉 ------------> Customer Login Controller <------------😉 ------------>`
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
    logger.info(`🤗 ==> Customer login Successfully `);
    res.status(201).json({ successMessage: user });
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ errorMessage: error.message });
  }
};

const updateCustomer = async (req, res) => {
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
    logger.error(error.message);
    res.status(500).json({ errorMessage: error.message });
  }
};

const findAllCustomers = async (req, res) => {
  logger.info(
    `<------------😉 ------------> Customer FindAll Controller <------------😉 ------------>`
  );

  try {
    const customers = await findAllService();
    logger.info(`🤗 ==> All Customers finded Successfully `);
    res.status(200).json(customers);
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ errorMessage: error.message });
  }
};

const findOneCustomer = async (req, res) => {
  logger.info(
    `<------------😉 ------------> Customer FindOne Controller <------------😉 ------------>`
  );

  try {
    res.status(200).json(`coming soon 🙂`);
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ errorMessage: error.message });
  }
};

const delCustomer = async (req, res) => {
  logger.info(
    `<------------😉 ------------> Customer Delete Controller <------------😉 ------------>`
  );

  try {
    res.status(200).json(`coming soon 🙂`);
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ errorMessage: error.message });
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
