import express from 'express';
import adminApis from './admin';
import categoryApis from './category';
import productApis from './products';
import customerApis from './customer';
import addressApis from './address';
import imageApis from './image';
import orderApis from './order';
import paymentApis from './payment';

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
