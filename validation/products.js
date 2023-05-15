import joi from "joi";

// <------------😉 ------------> validate Create Product object keys <------------😉 ------------>
const createProduct = joi.object().keys({
  name: joi.string().required(),
  description: joi.string().required(),
  price: joi.number().required(),
  quantity: joi.number(),
  subCategoryId: joi.number(),
});

export { createProduct };
