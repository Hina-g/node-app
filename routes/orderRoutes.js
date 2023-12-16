import express from "express";
// import { isAdmin, isAuth } from "./../middlewares/authMiddleWare.js";
import {
  changeOrderStatusController,
  createOrderController,
  getAllOrdersController,
  getMyOrdersController,
  singleOrderDetailsController,
} from "../controllers/orderController.js";

const router = express.Router();

//ROUTES
// -----------  --- ORDER ROUTES---

//CREATE Order
router.post("/create", createOrderController);

//GET ALL ORDERS
router.get("/my-orders", getMyOrdersController);

//GET SINGLEL OSRDERS DETAIL
router.get("/my-orders/:id", singleOrderDetailsController);

//--------  ADMIN  ---------
//GET ALL ORDERS
router.get("/admin/get-all-orders", getAllOrdersController);

//CHANGE ORDER STATUS
router.put("/admin/order/:id", changeOrderStatusController);

export default router;
