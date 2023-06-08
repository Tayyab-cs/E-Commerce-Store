import express from 'express';
import hashPassword from '../middlewares/hashPassword';
import customerController from '../controllers/customer';
import validateCustomer from '../validation/customer';
import validate from '../middlewares/validate';

import decryptToken from '../middlewares/decryptToken';
import isAdmin from '../middlewares/isAdmin';

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
