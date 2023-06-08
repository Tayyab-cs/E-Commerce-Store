import joi from 'joi';

// <-----😉 -----> validate signUp object keys <-----😉 ----->
const signUp = joi.object().keys({
  firstName: joi.string().required(),
  lastName: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().min(4).max(10).required(),
});

// <-----😉 -----> validate login object keys <-----😉 ----->
const login = joi.object().keys({
  email: joi.string().email().required(),
  password: joi.string().min(4).max(10).required(),
});

// <-----😉 -----> validate update object keys <-----😉 ----->
const update = joi.object().keys({
  oldPassword: joi.string().min(4).max(10).required(),
  newPassword: joi.string().min(4).max(10).required(),
});

export default { signUp, login, update };
