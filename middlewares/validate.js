import logger from "../utils/logger.js";
import { signUp, login, update } from "../validation/admin.js";
import { createCategory } from "../validation/category.js";
import { createProduct } from "../validation/products.js";

// ********************************************************************************** //
// ********************************** VALIDATE ADMIN ******************************** //
// ********************************************************************************** //
const validateSignUp = (req, res, next) => {
  logger.info(
    `<------------😉 ------------> SignUp Admin Validate Middleware <------------😉 ------------>`
  );

  const { error } = signUp.validate(req.body);

  if (error) {
    logger.error(error.message);
    return res.status(400).json({ errorMessage: error.message });
  }
  next();
};

const validateLogin = (req, res, next) => {
  logger.info(
    `<------------😉 ------------> Login Admin Validate Middleware <------------😉 ------------>`
  );

  const { error } = login.validate(req.body);

  if (error) {
    logger.error(error.message);
    return res.status(400).json({ errorMessage: error.message });
  }
  next();
};

const validateUpdate = (req, res, next) => {
  logger.info(
    `<------------😉 ------------> Update Admin Validate Middleware <------------😉 ------------>`
  );

  const { error } = update.validate(req.body);

  if (error) {
    logger.error(error.message);
    return res.status(400).json({ errorMessage: error.message });
  }
  next();
};

// ********************************************************************************** //
// ******************************** VALIDATE CATEGORY ******************************* //
// ********************************************************************************** //

const validateCreateCategory = (req, res, next) => {
  logger.info(
    `<------------😉 ------------> Create Category Validate Middleware <------------😉 ------------>`
  );

  const { error } = createCategory.validate(req.body);

  if (error) {
    logger.error(error.message);
    return res.status(400).json({ errorMessage: error.message });
  }
  next();
};

// ********************************************************************************** //
// ******************************** VALIDATE PRODUCTS ******************************* //
// ********************************************************************************** //

const validateCreateProduct = (req, res, next) => {
  logger.info(
    `<------------😉 ------------> Create Product Validate Middleware <------------😉 ------------>`
  );

  const { error } = createProduct.validate(req.body);

  if (error) {
    logger.error(error.message);
    return res.status(400).json({ errorMessage: error.message });
  }
  next();
};

export {
  validateSignUp,
  validateLogin,
  validateUpdate,
  validateCreateCategory,
  validateCreateProduct,
};
