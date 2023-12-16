import express from "express";
// import { isAdmin, isAuth } from "./../middlewares/authMiddleWare.js";
import {
  createProductController,
  deleteProductController,
  deleteProductImageController,
  getAllProductsController,
  getSingleProductController,
  getTopProductsController,
  productReviewController,
  updateProductController,
  updateProductImageController,
} from "../controllers/productController.js";
import { singleUpload } from "../middlewares/multer.js";

const router = express.Router();

//Routes

// GET ALL PRODUCTS
router.get("/get-all", getAllProductsController);

// GET TOP RATING  PRODUCTS
router.get("/top", getTopProductsController);

// GET SINGLE PRODUCTS
router.get("/:id", getSingleProductController);

// CREATE PRODUCT
router.post("/create", singleUpload, createProductController);

//UPDATE PRODUCT
router.put("/:id", updateProductController);

//UPDATE PRODUCT image
router.put(
  "/image/:id",

  singleUpload,
  updateProductImageController
);

//DELETE PRODUCT IMAGE
router.delete(
  "/delete-image/:id",

  deleteProductImageController
);

//DELETE PRODUCT
router.delete("/delete/:id", deleteProductController);
//***********************************************************************//

//REVIEW PRODUCT
router.put("/:id/review", productReviewController);

export default router;
