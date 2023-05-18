import aws from "aws-sdk";
import logger from "../utils/logger.js";
import db from "../database/connect.js";
import { credentials, config } from "../config/aws-config.js";

const uploadImage = (req, res, next) => {
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
      if (err) throw new Error(`Error uploading image to S3: ${err}`);
      // Save image details to the database using Sequelize
      const result = db.image.create({
        name: originalname,
        url: data.Location,
      });
      if (!result) throw new Error(`Image not upload to s3`);
      logger.info("Image details saved to the database");
      return res.status(200).json({ message: "Image uploaded successfully" });
    } catch (error) {
      logger.error("Error saving image details to the database:", error);
      return next(error);
    }
  });
};

export { uploadImage };
