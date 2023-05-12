import logger from "../utils/logger.js";
import { signUp, login, update } from "../validation/admin.js";
import { createCategory } from "../validation/category.js";

const validateSignUp = (req, res, next) => {
  logger.info(
    `<------------😉 ------------> Validate SignUp Admin <------------😉 ------------>`
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
    `<------------😉 ------------> Validate Login Admin <------------😉 ------------>`
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
    `<------------😉 ------------> Validate Update Admin <------------😉 ------------>`
  );

  const { error } = update.validate(req.body);

  if (error) {
    logger.error(error.message);
    return res.status(400).json({ errorMessage: error.message });
  }
  next();
};

const validateCreateCategory = (req, res, next) => {
  logger.info(
    `<------------😉 ------------> Validate Create Category <------------😉 ------------>`
  );

  const { error } = createCategory.validate(req.body);

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
};
