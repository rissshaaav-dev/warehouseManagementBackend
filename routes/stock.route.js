const express = require("express");
const {
  addStock,
  getStock,
  updateStock,
  deleteStock,
} = require("../controllers/stock.controller");

const protect = require("../middlewares/auth.middleware");
const admin = require("../middlewares/admin.middleware");

const stockRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Stocks
 *   description: Stock management APIs
 */

/**
 * @swagger
 * /api/stocks:
 *   post:
 *     summary: Add stock for a product in a warehouse (Admin only)
 *     tags: [Stocks]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - product
 *               - warehouse
 *               - quantity
 *             properties:
 *               product:
 *                 type: string
 *                 description: ID of the product
 *                 example: "65e44c4b2a5e8b001f72a9f1"
 *               warehouse:
 *                 type: string
 *                 description: ID of the warehouse
 *                 example: "65e44c4b2a5e8b001f72b5d2"
 *               quantity:
 *                 type: integer
 *                 description: Quantity to add
 *                 example: 50
 *     responses:
 *       201:
 *         description: Stock added successfully
 *       400:
 *         description: Bad request (missing fields or stock already exists)
 *       500:
 *         description: Internal server error
 */
stockRouter.post("/", protect, admin, addStock);

/**
 * @swagger
 * /api/stocks/{productId}/{warehouseId}:
 *   get:
 *     summary: Get stock details for a product in a warehouse (Public)
 *     tags: [Stocks]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         description: ID of the product
 *         schema:
 *           type: string
 *       - in: path
 *         name: warehouseId
 *         required: true
 *         description: ID of the warehouse
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Stock details retrieved successfully
 *       404:
 *         description: Stock not found
 *       500:
 *         description: Internal server error
 */
stockRouter.get("/:productId/:warehouseId", getStock);

/**
 * @swagger
 * /api/stocks/{id}:
 *   put:
 *     summary: Update stock quantity (Admin only)
 *     tags: [Stocks]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the stock record
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - quantity
 *             properties:
 *               quantity:
 *                 type: integer
 *                 description: New quantity value
 *                 example: 100
 *     responses:
 *       200:
 *         description: Stock updated successfully
 *       400:
 *         description: Bad request (missing quantity)
 *       404:
 *         description: Stock not found
 *       500:
 *         description: Internal server error
 */
stockRouter.put("/:id", protect, admin, updateStock);

/**
 * @swagger
 * /api/stocks/{id}:
 *   delete:
 *     summary: Delete a stock record (Admin only)
 *     tags: [Stocks]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the stock record
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Stock deleted successfully
 *       404:
 *         description: Stock not found
 *       500:
 *         description: Internal server error
 */
stockRouter.delete("/:id", protect, admin, deleteStock);

module.exports = stockRouter;
