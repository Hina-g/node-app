import categoryModel from "../models/categoryModel.js";
import productModel from "../models/productModel.js";

//CREATE CATEGORY
export const createCategory = async (req, res) => {
  try {
    const { category } = req.body;
    //VALIDATION
    if (!category) {
      return res.status(404).send({
        success: false,
        message: "Please provide category name",
      });
    }
    await categoryModel.create({ category });
    res.status(201).send({
      success: true,
      message: `${category} category created succssfully`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Create Category API",
    });
  }
};

//GET ALL CATEGORIES
export const getAllCategoriesController = async (req, res) => {
  try {
    const categories = await categoryModel.find({});
    res.status(200).send({
      success: true,
      message: "Categories Fetch Successfully",
      totalCat: categories.length,
      categories,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Get All Cat API",
    });
  }
};

// DELETE CATEGORIES
export const deleteCategoryController = async (req, res) => {
  try {
    //FIND CATEGORY
    const category = await categoryModel.findById(req.params.id);
    //VALIDATION
    if (!category) {
      return res.status(404).send({
        success: false,
        message: "category not found",
      });
    }

    // FIND PRODUCT WITH THIS CATEGORY  ID
    const products = await productModel.find({ category: category._id });
    //UPDATE PRODUCT CATEGORY
    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      product.category = undefined;
      await product.save();
    }
    //save
    await category.deleteOne();
    res.status(200).send({
      success: true,
      message: "Category Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    // CAST ERROR || OBJ ID
    if (error.name === "CastError") {
      return res.status(500).send({
        success: false,
        message: "Invalid Id",
      });
    }

    res.status(500).send({
      success: false,
      message: "Error in Delete category API",
      error,
    });
  }
};

//UPDATE  CATEGORY
export const updateCategoryController = async (req, res) => {
  try {
    //FIND CATEGORY
    const category = await categoryModel.findById(req.params.id);
    //VALIDATION
    if (!category) {
      return res.status(404).send({
        success: false,
        message: "category not found",
      });
    }

    //GET NEW CATEGORY
    const { updatedCategory } = req.body;

    // FIND PRODUCT WITH THIS CATEGORY  ID
    const products = await productModel.find({ category: category._id });
    //UPDATE PRODUCT CATEGORY
    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      product.category = updatedCategory;
      await product.save();
    }

    if (updatedCategory) category.category = updatedCategory;

    //save
    await category.save();
    res.status(200).send({
      success: true,
      message: "Category Updated Successfully",
    });
  } catch (error) {
    console.log(error);
    // CAST ERROR || OBJ ID
    if (error.name === "CastError") {
      return res.status(500).send({
        success: false,
        message: "Invalid Id",
      });
    }

    res.status(500).send({
      success: false,
      message: "Error in Update category API",
      error,
    });
  }
};
