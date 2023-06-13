import express from 'express';
import adminApis from './admin.js';
import categoryApis from './category.js';
import productApis from './products.js';
import customerApis from './customer.js';
import addressApis from './address.js';
import imageApis from './image.js';
import orderApis from './order.js';
import paymentApis from './payment.js';

const router = express.Router();

router.use('/admin', adminApis);
router.use('/category', categoryApis);
router.use('/product', productApis);
router.use('/customer', customerApis);
router.use('/address', addressApis);
router.use('/image', imageApis);
router.use('', orderApis);
router.use('', paymentApis);

export default router;
