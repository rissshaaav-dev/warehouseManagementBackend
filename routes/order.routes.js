const express = require("express");

const {
  placeOrder,
  getOrders,
  getEmployeeOrders,
  updateOrderStatus,
  cancelOrder,
} = require("../controllers/order.controller");

const protect = require("../middlewares/auth.middleware");
const admin = require("../middlewares/admin.middleware");

const orderRouter = express.Router();

// @route   POST /api/orders
// @desc    Place an order (Employee only)
orderRouter.post("/", protect, placeOrder);

// @route   GET /api/orders
// @desc    Get all orders (Admin only)
orderRouter.get("/", protect, admin, getOrders);

// @route   GET /api/orders/my-orders
// @desc    Get orders placed by the logged-in employee
orderRouter.get("/my-orders", protect, getEmployeeOrders);

// @route   PUT /api/orders/:id
// @desc    Update order status (Admin only)
orderRouter.put("/:id", protect, admin, updateOrderStatus);

// @route   DELETE /api/orders/:id
// @desc    Cancel an order (Only the employee who placed it)
orderRouter.delete("/:id", protect, cancelOrder);

module.exports = orderRouter;
