import express from 'express';
import validate from '../middlewares/validate';
import validateAddress from '../validation/address';
import decryptToken from '../middlewares/decryptToken';
import isCustomer from '../middlewares/isCustomer';
import isAdmin from '../middlewares/isAdmin';
import addressController from '../controllers/address';

const route = express.Router();

// <-----😉 -----> Address Api's <-----😉 ----->
route.post(
  '/create',
  validate(validateAddress.address),
  decryptToken,
  isCustomer,
  addressController.create,
);
route.patch('/update', decryptToken, isCustomer, addressController.update);
route.get('/findAll', decryptToken, isAdmin, addressController.findAll);
route.delete('/delete/:id', decryptToken, isCustomer, addressController.del);

export default route;
