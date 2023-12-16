import express from "express";
// import { isAdmin, isAuth } from "./../middlewares/authMiddleWare.js";
import {
  createCategory,
  deleteCategoryController,
  getAllCategoriesController,
  updateCategoryController,
} from "../controllers/categoryController.js";

const router = express.Router();

//ROUTES
// CATEGORY ROUTES

// CREATE CATEGORIES
router.post("/create", createCategory);
// router.post("/create", isAuth, isadmin,createCategory);

// GET ALL CATEGORIES
router.get("/get-all", getAllCategoriesController);

// DELETE  CATEGORY
router.delete("/delete/:id", deleteCategoryController);

// UPDATE  CATEGORY
router.put("/update/:id", updateCategoryController);

export default router;
