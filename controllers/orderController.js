// CREATE ORDERS

import orderModel from "../models/orderModel.js";
import productModel from "../models/productModel.js";

export const createOrderController = async (req, res) => {
  try {
    const {
      shippingInfo,
      orderItems,
      paymentMethod,
      paymentInfo,
      itemPrice,
      tax,
      shippingCharges,
      totalAmount,
    } = req.body;

    //VALIDATION
    // if (
    //   !shippingInfo ||
    //   !orderItems ||
    //   !paymentMethod ||
    //   !paymentInfo ||
    //   !itemPrice ||
    //   !tax ||
    //   !shippingCharges ||
    //   !totalAmount
    // ) {
    //   return res.status(500).send({
    //     success: false,
    //     message: "plz provide All fields",
    //   });
    // }
    //CREATE ORDER
    await orderModel.create({
      user: req.user._id,

      shippingInfo,
      orderItems,
      paymentMethod,
      paymentInfo,
      itemPrice,
      tax,
      shippingCharges,
      totalAmount,
    });

    //STOCK UPDATE
    for (let i = 0; i < orderItems.length; i++) {
      //FIND PRODUCT
      const product = await productModel.findById(orderItems[i].product);
      product.stock -= orderItems[i].quantity;
      await product.save();
    }
    res.status(201).send({
      success: true,
      message: "Order Placed Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In  Creating Order API",
      error,
    });
  }
};
// GET ALL ORDERS
export const getMyOrdersController = async (req, res) => {
  try {
    //FIND ORDERS
    const orders = await orderModel.find({ user: req.user._id });
    //VALIDATION
    if (!orders) {
      return res.status(404).send({
        success: false,
        message: "No Order found",
      });
    }
    res.status(200).send({
      success: true,
      message: "Your  Orders data ",
      totalOrder: orderModel.length,
      orders,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In  My-Orders API",
      error,
    });
  }
};

// GET SINGLE ORDER INFO
export const singleOrderDetailsController = async (req, res) => {
  try {
    //FIND ORDERS
    const order = await orderModel.findById(req.params.id);
    //VALIDATION
    if (!order) {
      return res.status(404).send({
        success: false,
        message: "No order Found",
      });
    }
    res.status(200).send({
      success: true,
      message: "Your Order Fetched Successfully!",
      order,
    });
  } catch (error) {
    console.log(error);
    // cast error ||  OBJECT ID
    if (error.name === "CastError") {
      return res.status(500).send({
        success: false,
        message: "Invalid Id",
      });
    }
    res.status(500).send({
      success: false,
      message: "Error In Get DELETE Product IMAGE API",
      error,
    });
  }
};

//ADMIN PART
export const getAllOrdersController = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.status(200).send({
      success: true,
      message: "All Orders Data",
      totalOrders: orders.length,
      orders,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Get DELETE Product IMAGE API",
      error,
    });
  }
};

//CHANGE ORDER STATUS
export const changeOrderStatusController = async (req, res) => {
  try {
    //FIND ORDER
    const order = await orderModel.findById(req.params.id);
    //VALIDATION
    if (!order) {
      return res.status(404).send({
        success: false,
        message: "Order not found",
      });
    }
    if (order.orderStatus === "processing") order.orderStatus = "shipped";
    else if (order.orderStatus === "shipped") {
      order.orderStatus = "deliverd";
      order.deliverdAt = Date.now();
    } else {
      return res.status(500).send({
        success: false,
        message: "Order Already delivered ",
      });
    }
    await order.save();
    return res.status(200).send({
      success: true,
      message: "Order Status Updated ",
    });
  } catch (error) {
    console.log(error);
    // cast error ||  OBJECT ID
    if (error.name === "CastError") {
      return res.status(500).send({
        success: false,
        message: "Invalid Id",
      });
    }
    res.status(500).send({
      success: false,
      message: "Error In Get order status API",
      error,
    });
  }
};
