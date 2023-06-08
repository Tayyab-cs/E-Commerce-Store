import logger from '../utils/logger';
import db from '../database/connect';

const isCustomer = async (req, res, next) => {
  logger.info('<-------😉 -------> isCustomer Middleware <-------😉 ------->');

  try {
    const { email } = req.user;
    const customer = await db.customer.findOne({ where: { email } });
    if (!customer) throw new Error('Customer not Exists...');
    next();
  } catch (error) {
    logger.error('User is not Admin...');
    return next(error);
  }
};

export default isCustomer;
