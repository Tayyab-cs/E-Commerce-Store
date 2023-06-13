import express from 'express';
import hashPassword from '../middlewares/hashPassword.js';
import validate from '../middlewares/validate.js';
import validateAdmin from '../validation/admin.js';
import adminController from '../controllers/admin.js';
import decryptToken from '../middlewares/decryptToken.js';

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
