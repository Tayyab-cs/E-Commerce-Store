import logger from "../utils/logger.js";
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
  logger.info(
    `<------------😉 ------------> Order Controller <------------😉 ------------>`
  );

  try {
    const { customerId, products } = req.body;

    const user = await findByPkService(customerId);
    if (!user) throw new Error("Plzzz register to continue...");
    const { firstName, lastName, phone } = user;

    const address = await findByIdService(customerId);
    if (!address) throw new Error("Plzzz register to continue...");
    const { houseNo, streetNo, area, city, state, postalCode } = address;

    let totalAmount = 0;
    products.forEach(async (product) => {
      // Calculating Total Amount...
      const quantityPrice = product.quantity * product.unitPrice;
      totalAmount += quantityPrice;
    });
    // creating order
    const order = await createOrderService(totalAmount, customerId);

    for (let i = 0; i < products.length; i++) {
      products[i].orderId = order.id;
    }

    // creating ordered details...
    await createOrderProductService(products);

    // const payload = {
    //   userId: result.id,
    //   email: result.email,
    // };

    // let accessToken = await signLoginData({ data: payload }, 120000000),
    //   refreshToken = await signLoginData({ data: "" }, 180000000);

    logger.info(`🤗 ==> Order Created Successfully `);
    return res.status(201).json({
      success: true,
      message: "Order created successfully!",
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
    logger.error(`😡 ==> ${error.message}`);
    return next(error);
  }
};

export { order };
