import joi from 'joi';

// <-----😉 -----> validate Category object keys <-----😉 ----->
const create = joi.object().keys({
  name: joi.string().required(),
  description: joi.string(),
  parentId: joi.number(),
});

export default { create };
