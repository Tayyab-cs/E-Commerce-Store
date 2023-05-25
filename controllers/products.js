import logger from "../utils/logger.js";
import db from "../database/connect.js";

import {
  findByNameService,
  findByIdService,
  createService,
  findAllService,
  deleteService,
  paginationService,
} from "../services/products.js";

import { uploadImage } from "../utils/helper/uploadImage.js";

// ********************************************************************************** //
// ****************************** PRODUCT CONTROLLER ******************************* //
// ********************************************************************************** //
const createProduct = async (req, res) => {
  logger.info(
    `<------------😉 ------------> Product Create Controller <------------😉 ------------>`
  );

  try {
    const { name, description, price, quantity, subCategoryId } = req.body;
    const file = req.files;

    const subcategory = await findByIdService(subCategoryId);

    if (!subcategory) {
      logger.warn(`Subcategory not found`);
      return res.status(404).json({ message: "Subcategory not found" });
    }

    const product = await createService(
      name,
      description,
      price,
      quantity,
      subCategoryId
    );
    const productId = product.id;

    // Uploading Image to S3, and on DB.
    uploadImage(file, productId);

    res.status(201).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const findAllProducts = async (req, res, next) => {
  logger.info(
    `<------------😉 ------------> Product Find Controller <------------😉 ------------>`
  );

  try {
    const { name, price, sortBy, sortOrder } = req.query;

    // Build the filter object based on the query parameters
    const filter = {};
    if (name) filter.name = name;
    if (price) filter.price = price;

    const sortOptions = [];
    if (sortBy) sortOptions.push([sortBy, sortOrder || "ASC"]);

    // Fetch all products based on applied filter.
    const products = await findAllService(filter, sortOptions);
    if (products.length === 0) throw new Error(`Product not Avaliable!`);
    logger.info(`🤗 ==> All Products finded Successfully `);
    return res.status(200).json(products);
  } catch (error) {
    logger.error(error.message);
    return next(error);
  }
};

const updateProduct = async (req, res) => {
  logger.info(
    `<------------😉 ------------> Product Update Controller <------------😉 ------------>`
  );

  try {
    const { name, newDescription, newPrice, newQuantity, newSubCategoryId } =
      req.body;

    // find product
    const findProduct = await findByNameService(name);
    console.log(findProduct);
    if (!findProduct) throw new Error("Category not found");
    // find SubCategory Id
    const findSubCategory = await findByIdService(newSubCategoryId);
    if (!findSubCategory) throw new Error("newSubCategoryId not found");

    const increaseQuantity = findProduct.quantity + newQuantity;

    // Update Description, Price, Quantity or subCategoryId.
    await findProduct.update({
      description: newDescription,
      price: newPrice,
      quantity: increaseQuantity,
      subCategoryId: newSubCategoryId,
    });
    logger.info(`🤗 ==> Product Updated Successfully `);
    res
      .status(200)
      .json({ successMessage: `🤗 ==> Product Updated Successfully` });
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ errorMessage: error.message });
  }
};

const delProduct = async (req, res) => {
  logger.info(
    `<------------😉 ------------> Product Delete Controller <------------😉 ------------>`
  );

  try {
    const { id, name } = req.body;
    const result = await deleteService(id, name);
    if (result === 0) throw new Error(`product already deleted...`);
    return res.status(200).json({
      success: true,
      message: `Product Deleted successfully!`,
      productDeleted: result,
    });
  } catch (error) {
    logger.error(error.message);
    throw error;
  }
};

const pagination = async (req, res, next) => {
  try {
    let { pageNumber, pageSize } = req.query;
    console.log(`Page: ${pageNumber}`);

    pageNumber = parseInt(pageNumber);
    pageSize = parseInt(pageSize);

    if (!pageNumber) pageNumber = 1;
    if (!pageSize) pageSize = 5;

    let offset = (pageNumber - 1) * pageSize;

    const totalProducts = await db.products.count();

    let products = await paginationService(offset, pageSize);

    res.json({
      totalProducts,
      totalPages: Math.ceil(totalProducts / pageSize),
      pageSize,
      data: products,
    });
  } catch (error) {
    logger.error("Error fetching products:", error);
    return next(error);
  }
};

export {
  createProduct,
  findAllProducts,
  updateProduct,
  delProduct,
  pagination,
};
