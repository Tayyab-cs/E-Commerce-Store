import logger from '../utils/logger';
import db from '../database/connect';
import errorObject from '../utils/errorObject';
import productService from '../services/products';
import uploadImage from '../utils/helper/uploadImage';

// ********************************************************************************** //
// ****************************** PRODUCT CONTROLLER ******************************* //
// ********************************************************************************** //
const create = async (req, res, next) => {
  logger.info('<-----😉 -----> Product Create Controller <-----😉 ----->');

  try {
    const { name, description, price, quantity, categoryId } = req.body;
    const file = req.files;
    const { role } = req.user;

    if (role !== 'superAdmin') {
      throw errorObject('🤕 -> unAuthorized User...', 'unAuthorized');
    }

    const category = await productService.findById(categoryId);

    if (!category) {
      logger.warn('category not found');
      throw errorObject('🤕 -> category not found...', 'notFound');
    }

    const product = await productService.create(
      name,
      description,
      price,
      quantity,
      categoryId,
    );
    const productId = product.id;

    // Uploading Image to S3, and on DB.
    uploadImage(file, productId);

    logger.info('🤗 -> Product Created Successfully...');
    return res.status(200).json({
      success: true,
      message: '🤗 -> Product Created Successfully...',
      product,
    });
  } catch (error) {
    logger.error('😡 -> product not created...');
    return next(error);
  }
};

const findAll = async (req, res, next) => {
  logger.info('<-----😉 -----> Product Find Controller <-----😉 ----->');

  try {
    // eslint-disable-next-line object-curly-newline
    let { pageNumber, pageSize } = req.query;

    const { categoryId, name, price, sortBy, sortOrder } = req.query;

    // Build the filter object based on the query parameters
    const filter = {};
    if (categoryId) filter.categoryId = categoryId;
    if (name) filter.name = name;
    if (price) filter.price = price;

    const sortOptions = [];
    if (sortBy) sortOptions.push([sortBy, sortOrder || 'ASC']);

    pageNumber = parseInt(pageNumber, 10);
    pageSize = parseInt(pageSize, 10);

    if (!pageNumber) pageNumber = 1;
    if (!pageSize) pageSize = 5;

    const offset = (pageNumber - 1) * pageSize;

    const totalProducts = await db.products.count();

    // Fetch all products based on applied filter.
    const products = await productService.findAll(
      filter,
      sortOptions,
      offset,
      pageSize,
    );
    if (products.length === 0) {
      throw errorObject('🤕 -> Product not Found...', 'notFound');
    }

    const productIds = products.map((product) => product.id);

    const images = await productService.findAllImages(productIds);

    logger.info('🤗 -> All Products finded Successfully...');
    return res.status(200).json({
      success: true,
      message: '🤗 -> All Products finded Successfully...',
      pagination: {
        totalProducts,
        totalPages: Math.ceil(totalProducts / pageSize),
        pageSize,
      },
      product: products,
      images,
    });
  } catch (error) {
    logger.error('😡 -> product not finded...');
    return next(error);
  }
};

const update = async (req, res, next) => {
  logger.info('<-----😉 -----> Product Update Controller <-----😉 ----->');

  try {
    const productId = req.params.id;
    const { name, description, price, quantity, categoryId } = req.body;

    // find product
    const findProduct = await productService.findByPk(productId);
    if (!findProduct) {
      throw errorObject('🤕 -> Product not Found...', 'notFound');
    }

    const increaseQuantity = findProduct.quantity + quantity;

    // Updated Details...
    const updateInfo = {};
    if (name) updateInfo.name = name;
    if (description) updateInfo.description = description;
    if (price) updateInfo.price = price;
    if (quantity) updateInfo.quantity = increaseQuantity;
    if (categoryId) updateInfo.categoryId = categoryId;

    // Update Description, Price, Quantity or CategoryId.
    const product = await findProduct.update(updateInfo);

    logger.info('🤗 -> Product Updated Successfully...');
    return res.status(200).json({
      success: true,
      message: '🤗 -> Product Updated Successfully...',
      product,
    });
  } catch (error) {
    logger.error('😡 -> product not updated...');
    return next(error);
  }
};

const del = async (req, res, next) => {
  logger.info('<-----😉 -----> Product Delete Controller <-----😉 ----->');

  try {
    const productId = req.params.id;
    const result = await productService.del(productId);
    if (result === 0) {
      throw errorObject('🤕 -> product already deleted...', 'delete');
    }

    logger.info('🤗 -> Product Deleted successfully...');
    return res.status(200).json({
      success: true,
      message: '🤗 -> Product Deleted successfully...',
      productDeleted: result,
    });
  } catch (error) {
    logger.error('😡 -> product not deleted...');
    return next(error);
  }
};

export default {
  create,
  findAll,
  update,
  del,
};
