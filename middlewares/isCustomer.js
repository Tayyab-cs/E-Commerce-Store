import logger from "../utils/logger.js";
import db from "../database/connect.js";

const isCustomer = async (req, res, next) => {
  logger.info(`<-------😉 -------> isCustomer Middleware <-------😉 ------->`);

  try {
    const { userId, email } = req.user;
    const customer = await db.customer.findOne({ where: { email } });
    if (!customer) throw new Error(`Customer not Exists...`);
    next();
  } catch (error) {
    logger.error(`User is not Admin...`);
    return next(error);
  }
};

export { isCustomer };
