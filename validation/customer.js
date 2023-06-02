import joi from "joi";

// <-----😉 -----> validate Customer SignUp object keys <-----😉 ----->
const signUpCustomer = joi.object().keys({
  firstName: joi.string().required(),
  lastName: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().min(4).max(10).required(),
  phone: joi.number().required(),
});

export { signUpCustomer };
