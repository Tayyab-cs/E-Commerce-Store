import joi from 'joi';

// <-----😉 -----> validate Address object keys <-----😉 ----->
const address = joi.object().keys({
  houseNo: joi.string().required(),
  streetNo: joi.string().required(),
  area: joi.string().required(),
  city: joi.string().required(),
  state: joi.string().required(),
  postalCode: joi.number().required(),
  customerId: joi.number().required(),
});

export default { address };
