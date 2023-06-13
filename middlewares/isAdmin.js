import logger from '../utils/logger.js';

const isAdmin = async (req, res, next) => {
  logger.info('<-------😉 -------> isAdmin Middleware <-------😉 ------->');

  try {
    const { role } = req.user;
    if (role !== 'superAdmin') throw new Error('unAuthorize User...');
    next();
  } catch (error) {
    logger.error('User is not Admin...');
    return next(error);
  }
};

export default isAdmin;
