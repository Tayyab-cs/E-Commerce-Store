import express from 'express';
import order from '../controllers/order';
import decryptToken from '../middlewares/decryptToken';
import isCustomer from '../middlewares/isCustomer';

const route = express.Router();

// <-----😉 -----> Order Api's <-----😉 ----->
route.post('/order', decryptToken, isCustomer, order);

export default route;
