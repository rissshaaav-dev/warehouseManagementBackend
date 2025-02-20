const express = require("express");

const {
  placeOrder,
  getOrders,
  getOrder,
  updateOrderStatus,
} = require("../controllers/order.controller");

const { protect, authorize } = require("../middleware/auth.middleware");

const orderRouter = express.Router();

// @route   POST /api/orders
// @desc    Place an order (Employee only)
router.post("/", protect, placeOrder);

// @route   GET /api/orders
// @desc    Get all orders (Admin only)
router.get("/", protect, admin, getOrders);

// @route   GET /api/orders/my-orders
// @desc    Get orders placed by the logged-in employee
router.get("/my-orders", protect, getEmployeeOrders);

// @route   PUT /api/orders/:id
// @desc    Update order status (Admin only)
router.put("/:id", protect, admin, updateOrderStatus);

// @route   DELETE /api/orders/:id
// @desc    Cancel an order (Only the employee who placed it)
router.delete("/:id", protect, cancelOrder);

module.exports = orderRouter;
