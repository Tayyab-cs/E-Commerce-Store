import joi from "joi";

// <-----😉 -----> validate Image object keys <-----😉 ----->
const image = joi.object({
  fieldname: joi.string().required(),
  originalname: joi.string().required(),
  encoding: joi.string().required(),
  mimetype: joi.string().valid("image/jpeg", "image/png").required(),
  destination: joi.string().required(),
  filename: joi.string().required(),
  path: joi.string().required(),
  size: joi.number().max(5242880).required(), // Maximum file size in bytes (e.g., 5MB)
});

export default { image };
