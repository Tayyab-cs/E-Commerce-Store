import joi from "joi";

// <------------😉 ------------> validate Category object keys <------------😉 ------------>
const createCategory = joi.object().keys({
  name: joi.string().required(),
  description: joi.string(),
  parentId: joi.number(),
});

export { createCategory };
