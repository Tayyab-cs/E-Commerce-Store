import logger from "../utils/logger.js";

const errorHandler = (error, req, res, next) => {
  logger.error("<------😡------> Error MIDDLEWARE Triggered <------😡------>");
  logger.error("************************************************************");
  logger.error(error);
  logger.error("************************************************************");

  if (error.name === "badRequest") {
    return res
      .status(400)
      .json({
        success: false,
        type: error.name,
        message: error.message,
        details: error.details,
      })
      .end();
  }
  if (error.name === "unAuthorized") {
    return res
      .status(401)
      .json({
        success: false,
        type: error.name,
        message: error.message,
        details: error.details,
      })
      .end();
  }
  if (error.name === "permission") {
    return res
      .status(403)
      .json({
        success: false,
        type: error.name,
        message: error.message,
        details: error.details,
      })
      .end();
  }
  if (error.name === "duplication") {
    return res
      .status(409)
      .json({
        success: false,
        type: error.name,
        message: error.message,
        details: error.details,
      })
      .end();
  }
  if (error.name === "notFound") {
    return res
      .status(404)
      .json({
        success: false,
        type: error.name,
        message: error.message,
        details: error.details,
      })
      .end();
  }
  if (error.name === "delete") {
    return res
      .status(409)
      .json({
        success: false,
        type: error.name,
        message: isProduction
          ? "There was some error. Please try again later"
          : error.message,
      })
      .end();
  }
  if (error.isOperational) {
    return res
      .status(400)
      .json({
        success: false,
        message: error.statusCode,
      })
      .end();
  }

  // if (error instanceof AppError) {
  //   return res.status(error.statusCode).json({
  //     errorCode: error.errorCode,
  //     message: error.message,
  //   });
  // }

  return res
    .status(500)
    .json({
      success: false,
      message: "Unexpected internal server error!",
      details: error.details,
    })
    .end();
};

export { errorHandler };
// the proper way is to extend error class and define and throw you custom error; but for this one, that works
