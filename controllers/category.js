import logger from "../utils/logger.js";
import { errorObject } from "../utils/errorObject.js";

import {
  findByIdService,
  findByNameService,
  createService,
  findAllService,
  deleteService,
} from "../services/category.js";

// ********************************************************************************** //
// ****************************** CATEGORY CONTROLLER ******************************* //
// ********************************************************************************** //
const createCategories = async (req, res, next) => {
  logger.info(`<-----😉 -----> Category Create Controller <-----😉 ----->`);

  try {
    const { role } = req.user;
    const { name, description, parentId } = req.body;

    if (role !== "superAdmin") throw new Error(`unAuthorized user...`);
    // find category
    const findCategory = await findByNameService(name);
    if (findCategory)
      throw errorObject("🤕 -> category already exists...", "duplication");

    const result = await createService(name, description, parentId); // creating Category
    if (result) {
      logger.info(`🤗 -> Category Created Successfully...`);
      return res.status(201).json({
        success: true,
        message: `🤗 -> Category Created Successfully...`,
        category: result,
      });
    }
  } catch (error) {
    logger.error(`😡 -> Category not Created...`);
    return next(error);
  }
};

const findAllCategories = async (req, res, next) => {
  logger.info(`<-----😉 -----> Category FindAll Controller <-----😉 ----->`);

  try {
    const { role } = req.user;
    const { categoryId, name } = req.query;

    if (role !== "superAdmin")
      throw errorObject("🤕 -> unAuthorized User...", "unAuthorized");

    // find all categories...
    let filter = {};
    if (categoryId) filter.id = categoryId;
    if (name) filter.name = name;

    const categories = await findAllService(filter);
    logger.info(`🤗 -> All Categories finded Successfully...`);
    res.status(201).json({
      success: true,
      successMessage: `🤗 -> All Categories finded Successfully...`,
      category: categories,
    });
  } catch (error) {
    logger.error(`😡 -> Categories are not finded...`);
    return next(error);
  }
};

const updateCategory = async (req, res, next) => {
  logger.info(`<-----😉 -----> Category Update Controller <-----😉 ----->`);

  try {
    const id = req.params.id;
    const { name, description } = req.body;
    const { role } = req.user;

    if (role !== "superAdmin")
      throw errorObject("🤕 -> unAuthorized User...", "unAuthorized");

    // find Category
    const findCategory = await findByIdService(id);
    if (!findCategory)
      throw errorObject("🤕 -> Category not found...", "notFound");

    const updateInfo = {};
    name && (updateInfo.name = name);
    description && (updateInfo.description = description);

    // Update Description or parentId
    const result = await findCategory.update(updateInfo);

    logger.info(`🤗 -> Category Updated Successfully `);
    res.status(201).json({
      success: true,
      successMessage: `🤗 -> Category Updated Successfully`,
      category: result,
    });
  } catch (error) {
    logger.error(`😡 -> Category not Updated...`);
    return next(error);
  }
};

const delelteCategory = async (req, res, next) => {
  logger.info(`<-----😉 -----> Admin Delete Controller <-----😉 ----->`);

  try {
    const { role } = req.user;
    const id = req.params.id;

    if (role !== "superAdmin")
      throw errorObject("🤕 -> unAuthorized User...", "unAuthorized");
    const result = await deleteService(id);
    if (!result) throw errorObject("🤕 -> Category not Deleted...", "delete");

    res.status(201).json({
      success: true,
      successMessage: `Category Deleted Successfully...`,
      category: result,
    });
  } catch (error) {
    logger.error(`😡 -> Category not Deleted...`);
    return next(error);
  }
};

export { createCategories, findAllCategories, updateCategory, delelteCategory };
