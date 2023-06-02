import jwt from "jsonwebtoken";
import logger from "../utils/logger.js";

const decryptToken = async (req, res, next) => {
  logger.info(`<-------😉 -------> JWT Decode Middleware <-------😉 ------->`);

  try {
    const auth = req.headers;
    if (!auth) throw new Error(`Header not found...`);
    const authToken = auth.authorization;
    const token = authToken.split(" ")[1];
    const decode = jwt.decode(token);
    const userData = decode.data;
    const { userId, email, role } = userData;
    req.user = { userId, email, role };
    next();
  } catch (error) {
    logger.error(`Token not decoded properly...`);
    return next(error);
  }
};

export { decryptToken };
