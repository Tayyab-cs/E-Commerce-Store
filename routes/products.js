import express from 'express';
import validate from '../middlewares/validate';
import validateProduct from '../validation/products';
import upload from '../middlewares/uploadImage';
import productController from '../controllers/products';
import decryptToken from '../middlewares/decryptToken';
import isAdmin from '../middlewares/isAdmin';

const route = express.Router();

// <-----😉 -----> Product Api's <-----😉 ----->
route.post(
  '/create',
  decryptToken,
  upload.array('image'),
  validate(validateProduct.create),
  productController.create,
);
route.get('/findAll', decryptToken, isAdmin, productController.findAll);
route.patch('/update/:id', decryptToken, isAdmin, productController.update);
route.delete('/delete/:id', decryptToken, isAdmin, productController.del);

export default route;
