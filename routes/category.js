import express from 'express';
import validate from '../middlewares/validate.js';
import validateCategory from '../validation/category.js';
import decryptToken from '../middlewares/decryptToken.js';
import categoryController from '../controllers/category.js';

const route = express.Router();

// <-----😉 -----> Category Api's <-----😉 ----->
route.post(
  '/create',
  decryptToken,
  validate(validateCategory.create),
  categoryController.create,
);
route.get('/findAll', decryptToken, categoryController.findAll);
route.patch('/update/:id', decryptToken, categoryController.update);
route.delete('/delete/:id', decryptToken, categoryController.del);

export default route;
