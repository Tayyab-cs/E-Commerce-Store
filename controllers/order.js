import logger from '../utils/logger.js';
import errorObject from '../utils/errorObject.js';
import orderService from '../services/order.js';

// ********************************************************************************** //
// ******************************** ORDER CONTROLLER ******************************** //
// ********************************************************************************** //
const order = async (req, res, next) => {
  logger.info('<-----😉 -----> Order Controller <-----😉 ----->');

  try {
    const { userId } = req.user;
    const user = await orderService.findByPk(userId);
    if (!user) throw errorObject('🤕 -> Customer not Found...', 'notFound');
    const { firstName, lastName, phone } = user;

    const address = await orderService.findById(userId);
    if (!address) {
      throw errorObject('🤕 -> Customer address does not found...', 'notFound');
    }
    const { houseNo, streetNo, area, city, state, postalCode } = address;

    const { products } = req.body;
    let totalAmount = 0;
    products.forEach(async (product) => {
      // Calculating Total Amount...
      const quantityPrice = product.quantity * product.unitPrice;
      totalAmount += quantityPrice;
    });

    // creating order
    const odr = await orderService.createOrder(totalAmount, userId);
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < products.length; i++) {
      products[i].orderId = odr.id;
    }

    // creating ordered details...
    await orderService.createOrderProduct(products);

    logger.info('🤗 -> Order Created Successfully...');
    return res.status(201).json({
      success: true,
      message: '🤗 -> Order Created Successfully...',
      orderId: order.id,
      orderInfo: order,
      customer: {
        firstName,
        lastName,
        phone,
      },
      address: `H # ${houseNo}, S # ${streetNo}, ${area}, ${city}, ${state}, ${postalCode}`,
    });
  } catch (error) {
    logger.error('😡 -> Order not Created...');
    return next(error);
  }
};

export default order;
