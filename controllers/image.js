import aws from "aws-sdk";
import logger from "../utils/logger.js";
import db from "../database/connect.js";
import { errorObject } from "../utils/errorObject.js";
import { credentials, config } from "../config/aws-config.js";

const uploadImage = (req, res, next) => {
  logger.info(`<-----😉 -----> Upload Image <-----😉 ----->`);

  // verify s3 bucket credentials....
  aws.config.update(credentials);
  aws.config.update(config);

  const s3 = new aws.S3();
  const file = req.file;
  const { originalname } = req.file;

  const params = {
    Bucket: "e-store-bket",
    Key: originalname,
    Body: file.path,
    s3ForcePathStyle: true,
  };

  s3.upload(params, (err, data) => {
    try {
      if (err) throw errorObject(`🤕 -> Error uploading image to S3`);
      // Save image details to the database using Sequelize
      const result = db.image.create({
        name: originalname,
        url: data.Location,
      });
      if (!result) throw errorObject(`🤕 -> Error uploading image to S3`);

      logger.info(`🤗 -> Image details saved to the database...`);
      return res.status(200).json({
        success: true,
        message: `🤗 -> Image details saved to the database...`,
        image: result,
      });
    } catch (error) {
      logger.error(`😡 -> Image not uploaded to S3...`);
      return next(error);
    }
  });
};

export { uploadImage };
