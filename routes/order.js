import express from 'express';
import order from '../controllers/order.js';
import decryptToken from '../middlewares/decryptToken.js';
import isCustomer from '../middlewares/isCustomer.js';

const route = express.Router();

// <-----😉 -----> Order Api's <-----😉 ----->
route.post('/order', decryptToken, isCustomer, order);

export default route;
