import express from 'express';
import validate from '../middlewares/validate';
import validateCategory from '../validation/category';
import decryptToken from '../middlewares/decryptToken';
import categoryController from '../controllers/category';

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
