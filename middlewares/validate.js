import logger from "../utils/logger.js";
import Joi from "joi";
import { pick } from "../utils/pick.js";

// ********************************************************************************** //
// ********************************** VALIDATE PATHS ******************************** //
// ********************************************************************************** //

const validate = (schema) => (req, res, next) => {
  logger.info(`<-------😉 -------> validate Middleware <-------😉 ------->`);

  const validSchema = pick(schema, ["params", "query", "body"]);
  const object = pick(req, Object.keys(validSchema));
  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: "key" }, abortEarly: false })
    .validate(object);
  if (error) {
    const errorMessage = error.details
      .map((details) => details.message)
      .join(", ");
    return next(new ApiError(400, errorMessage));
  }
  Object.assign(req, value);

  return next();
};

export { validate };
