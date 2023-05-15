import logger from "../utils/logger.js";
import {
  findByNameService,
  findByIdService,
  createService,
  findAllService,
} from "../services/products.js";

// ********************************************************************************** //
// ****************************** PRODUCT CONTROLLER ******************************* //
// ********************************************************************************** //
const createProduct = async (req, res) => {
  logger.info(
    `<------------😉 ------------> Product Create Controller <------------😉 ------------>`
  );

  try {
    const { name, description, price, quantity, subCategoryId } = req.body;

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

    res.status(201).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const findAllProducts = async (req, res) => {
  logger.info(
    `<------------😉 ------------> Product FindAll Controller <------------😉 ------------>`
  );

  try {
    const products = await findAllService();
    logger.info(`🤗 ==> All Products finded Successfully `);
    res.status(200).json(products);
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ errorMessage: error.message });
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

const findOneProduct = async (req, res) => {
  logger.info(
    `<------------😉 ------------> Product FindOne Controller <------------😉 ------------>`
  );

  try {
    res.status(200).json(`coming soon 🙂`);
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
    res.status(200).json(`coming soon 🙂`);
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ errorMessage: error.message });
  }
};

export {
  createProduct,
  findAllProducts,
  updateProduct,
  findOneProduct,
  delProduct,
};
