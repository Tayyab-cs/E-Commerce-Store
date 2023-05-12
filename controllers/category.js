import logger from "../utils/logger.js";

import {
  findByNameService,
  createService,
  findAllService,
} from "../services/category.js";

// ********************************************************************************** //
// ****************************** CATEGORY CONTROLLER ******************************* //
// ********************************************************************************** //
const createCategories = async (req, res) => {
  logger.info(
    `<------------😉 ------------> Category Create API <------------😉 ------------>`
  );

  try {
    const { name, description, parentId } = req.body;

    // find category
    const findCategory = await findByNameService(name);

    if (findCategory) logger.warn(`😲 ==> ${name} category already exists.`);
    const result = await createService(name, description, parentId); // creating Category
    if (result) {
      logger.info(`🤗 ==> Category Created Successfully `);
      res.status(201).json({ successMessage: result });
    }
  } catch (error) {
    logger.error(`😡 ==> ${error.message}`);
    res.status(500).json({ errorMessage: error.message });
  }
};

const findAllCategories = async (req, res) => {
  logger.info(
    `<------------😉 ------------> Category FindAll API <------------😉 ------------>`
  );

  try {
    const categories = await findAllService();
    logger.info(`🤗 ==> All Categories finded Successfully `);
    res.status(200).json(categories);
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ errorMessage: error.message });
  }
};

const findOneCategory = async (req, res) => {
  logger.info(
    `<------------😉 ------------> Category FindOne API <------------😉 ------------>`
  );

  try {
    res.status(200).json(`coming soon 🙂`);
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ errorMessage: error.message });
  }
};

const updateCategory = async (req, res) => {
  logger.info(
    `<------------😉 ------------> Category Update API <------------😉 ------------>`
  );

  try {
    const { name, newDescription } = req.body;

    // find Category
    const findCategory = await findByNameService(name);
    if (!findCategory) {
      throw new Error("Category not found");
    }
    // Update Description or parentId
    await findCategory.update({ description: newDescription });
    logger.info(`🤗 ==> Category Updated Successfully `);
    res
      .status(200)
      .json({ successMessage: `🤗 ==> Category Updated Successfully` });
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ errorMessage: error.message });
  }
};

const delelteCategory = async (req, res) => {
  logger.info(
    `<------------😉 ------------> Admin Delete API <------------😉 ------------>`
  );

  try {
    res.status(200).json(`coming soon 🙂`);
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ errorMessage: error.message });
  }
};

export {
  createCategories,
  findAllCategories,
  findOneCategory,
  updateCategory,
  delelteCategory,
};
