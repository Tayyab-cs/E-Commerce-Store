import express from 'express';
import hashPassword from '../middlewares/hashPassword';
import validate from '../middlewares/validate';
import validateAdmin from '../validation/admin';
import adminController from '../controllers/admin';
import decryptToken from '../middlewares/decryptToken';

const route = express.Router();

// <-----😉 -----> Admin Api's <-----😉 ----->
route.post(
  '/signUp',
  validate(validateAdmin.signUp),
  hashPassword,
  adminController.signUp,
);
route.post('/login', validate(validateAdmin.login), adminController.login);
route.patch('/update', decryptToken, adminController.update);
route.patch(
  '/changePassword',
  validate(validateAdmin.update),
  decryptToken,
  hashPassword,
  adminController.changePassword,
);
route.patch('/forgetPassword', adminController.forgetPassword);

export default route;
