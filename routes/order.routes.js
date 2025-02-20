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

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Order management APIs
 */

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Place an order
 *     tags: [Orders]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - customerName
 *               - customerEmail
 *               - items
 *             properties:
 *               customerName:
 *                 type: string
 *                 example: John Doe
 *               customerEmail:
 *                 type: string
 *                 format: email
 *                 example: johndoe@example.com
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - product
 *                     - warehouse
 *                     - quantity
 *                   properties:
 *                     product:
 *                       type: string
 *                       example: "65a3e0a527f7a4d67e3d9b33"
 *                     warehouse:
 *                       type: string
 *                       example: "65a3e0b027f7a4d67e3d9b44"
 *                     quantity:
 *                       type: integer
 *                       example: 2
 *     responses:
 *       201:
 *         description: Order placed successfully
 *       400:
 *         description: Bad request (missing fields or insufficient stock)
 *       404:
 *         description: Product or stock record not found
 *       500:
 *         description: Internal server error
 */
orderRouter.post("/", protect, placeOrder);

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Get all orders (Admin only)
 *     tags: [Orders]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Returns a list of all orders
 *       403:
 *         description: Not authorized (Admin only)
 *       500:
 *         description: Internal server error
 */
orderRouter.get("/", protect, admin, getOrders);

/**
 * @swagger
 * /api/orders/my-orders:
 *   get:
 *     summary: Get logged-in employee's orders
 *     tags: [Orders]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Returns orders placed by the logged-in user
 *       500:
 *         description: Internal server error
 */
orderRouter.get("/my-orders", protect, getEmployeeOrders);

/**
 * @swagger
 * /api/orders/{id}:
 *   put:
 *     summary: Update order status (Admin only)
 *     tags: [Orders]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Order ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [Pending, Shipped, Delivered, Cancelled]
 *                 example: Shipped
 *     responses:
 *       200:
 *         description: Order status updated successfully
 *       404:
 *         description: Order not found
 *       500:
 *         description: Internal server error
 */
orderRouter.put("/:id", protect, admin, updateOrderStatus);

/**
 * @swagger
 * /api/orders/{id}:
 *   delete:
 *     summary: Cancel an order (Only the employee who placed it)
 *     tags: [Orders]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Order ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order cancelled successfully
 *       403:
 *         description: Not authorized to cancel this order
 *       400:
 *         description: Only pending orders can be cancelled
 *       404:
 *         description: Order not found
 *       500:
 *         description: Internal server error
 */
orderRouter.delete("/:id", protect, cancelOrder);

module.exports = orderRouter;
