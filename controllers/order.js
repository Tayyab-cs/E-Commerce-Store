import logger from "../utils/logger.js";
import { errorObject } from "../utils/errorObject.js";

import {
  findByPkService,
  findByIdService,
  createOrderService,
  createOrderProductService,
} from "../services/order.js";

// ********************************************************************************** //
// ******************************** ORDER CONTROLLER ******************************** //
// ********************************************************************************** //
const order = async (req, res, next) => {
  logger.info(`<-----😉 -----> Order Controller <-----😉 ----->`);

  try {
    const { userId } = req.user;
    const user = await findByPkService(userId);
    if (!user) throw errorObject(`🤕 -> Customer not Found...`, "notFound");
    const { firstName, lastName, phone } = user;

    const address = await findByIdService(userId);
    if (!address)
      throw errorObject(`🤕 -> Customer address does not found...`, "notFound");
    const { houseNo, streetNo, area, city, state, postalCode } = address;

    const { products } = req.body;
    let totalAmount = 0;
    products.forEach(async (product) => {
      // Calculating Total Amount...
      const quantityPrice = product.quantity * product.unitPrice;
      totalAmount += quantityPrice;
    });

    // creating order
    const order = await createOrderService(totalAmount, userId);
    for (let i = 0; i < products.length; i++) {
      products[i].orderId = order.id;
    }

    // creating ordered details...
    await createOrderProductService(products);

    logger.info(`🤗 -> Order Created Successfully...`);
    return res.status(201).json({
      success: true,
      message: "🤗 -> Order Created Successfully...",
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
    logger.error(`😡 -> Order not Created...`);
    return next(error);
  }
};

export { order };
