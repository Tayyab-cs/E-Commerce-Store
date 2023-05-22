import aws from "aws-sdk";
import fs from "fs";
import logger from "../logger.js";
import db from "../../database/connect.js";
import validateImage from "../../validation/image.js";
import { credentials, config } from "../../config/aws-config.js";

const uploadImage = async (file, productId) => {
  logger.info(
    `<------------😉 ------------> Image Upload Helper <------------😉 ------------>`
  );

  // verify s3 bucket credentials....
  aws.config.update(credentials);
  aws.config.update(config);

  const s3 = new aws.S3();

  // iterating req.files for multiple images...
  file.forEach((item) => {
    const prodId = productId;

    // validate Image keys
    const { error, value } = validateImage.validate(item);
    if (error) return error;

    // preparing params object to upload image to S3....
    const params = {
      Bucket: "e-store-bket",
      Key: item.originalname,
      Body: item.path,
      s3ForcePathStyle: true,
    };

    // uploading image to S3....
    s3.upload(params, (err, data) => {
      try {
        if (err) throw new Error(`Error uploading image to S3: ${err}`);
        // Save image details to the database using Sequelize
        const result = db.image.create({
          name: item.originalname,
          url: data.Location,
          productId: prodId,
        });

        if (!result) throw new Error(`Image not upload to s3`);
        logger.info("Image details saved to the database");

        // Deleting Image from uploads folder after saving it DB and S3.
        fs.unlink(`uploads/${item.originalname}`, (err) => {
          err
            ? logger.error(`Image not delete from Upload Folder...`)
            : logger.info(`Image deleted successfully from Upload Folder...`);
        });

        return result.id;
      } catch (error) {
        logger.error("Error saving image details to the database:", error);
        return error;
      }
    });
  });
};

export { uploadImage };
