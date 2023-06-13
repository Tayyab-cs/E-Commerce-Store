import express from 'express';
import validate from '../middlewares/validate.js';
import validateProduct from '../validation/products.js';
import upload from '../middlewares/uploadImage.js';
import productController from '../controllers/products.js';
import decryptToken from '../middlewares/decryptToken.js';
import isAdmin from '../middlewares/isAdmin.js';

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
