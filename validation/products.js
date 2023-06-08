import joi from 'joi';

// <-----😉 -----> validate Create Product object keys <-----😉 ----->
const create = joi.object().keys({
  name: joi.string().required(),
  description: joi.string().required(),
  price: joi.number().required(),
  quantity: joi.number().required(),
  categoryId: joi.number(),
});

export default { create };
