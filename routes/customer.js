import express from 'express';
import hashPassword from '../middlewares/hashPassword.js';
import customerController from '../controllers/customer.js';
import validateCustomer from '../validation/customer.js';
import validate from '../middlewares/validate.js';
import decryptToken from '../middlewares/decryptToken.js';
import isAdmin from '../middlewares/isAdmin.js';

const route = express.Router();

// <-----😉 -----> Customer Api's <-----😉 ----->
route.post(
  '/signUp',
  validate(validateCustomer.signUp),
  hashPassword,
  customerController.signUp,
);
route.post(
  '/login',
  validate(validateCustomer.login),
  customerController.login,
);
route.patch('/update', decryptToken, customerController.update);
route.patch(
  '/changePassword',
  decryptToken,
  hashPassword,
  customerController.changePassword,
);
route.patch('/forgetPassword', customerController.forgetPassword);
route.get('/findAll', decryptToken, isAdmin, customerController.findAll);
route.delete('/delete/:id', decryptToken, isAdmin, customerController.del);

export default route;
