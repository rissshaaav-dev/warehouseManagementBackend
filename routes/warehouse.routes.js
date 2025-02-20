const express = require("express");
const {
  createWarehouse,
  getAllWarehouses,
  getWarehouseById,
  updateWarehouse,
  deleteWarehouse,
} = require("../controllers/warehouse.controller");

const protect = require("../middlewares/auth.middleware");
const admin = require("../middlewares/admin.middleware");

const warehouseRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Warehouses
 *   description: Warehouse management APIs
 */

/**
 * @swagger
 * /api/warehouses:
 *   post:
 *     summary: Create a new warehouse (Admin only)
 *     tags: [Warehouses]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - location
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the warehouse
 *                 example: "Central Storage"
 *               location:
 *                 type: string
 *                 description: Warehouse location
 *                 example: "New York, NY"
 *     responses:
 *       201:
 *         description: Warehouse created successfully
 *       400:
 *         description: Bad request (missing fields or warehouse already exists)
 *       500:
 *         description: Internal server error
 */
warehouseRouter.post("/", protect, admin, createWarehouse);

/**
 * @swagger
 * /api/warehouses:
 *   get:
 *     summary: Get all warehouses (Public)
 *     tags: [Warehouses]
 *     responses:
 *       200:
 *         description: List of all warehouses
 *       500:
 *         description: Internal server error
 */
warehouseRouter.get("/", getAllWarehouses);

/**
 * @swagger
 * /api/warehouses/{id}:
 *   get:
 *     summary: Get warehouse by ID (Public)
 *     tags: [Warehouses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Warehouse ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Warehouse details retrieved successfully
 *       404:
 *         description: Warehouse not found
 *       500:
 *         description: Internal server error
 */
warehouseRouter.get("/:id", getWarehouseById);

/**
 * @swagger
 * /api/warehouses/{id}:
 *   put:
 *     summary: Update a warehouse (Admin only)
 *     tags: [Warehouses]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Warehouse ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Updated name of the warehouse
 *                 example: "Updated Storage"
 *               location:
 *                 type: string
 *                 description: Updated location
 *                 example: "Los Angeles, CA"
 *     responses:
 *       200:
 *         description: Warehouse updated successfully
 *       400:
 *         description: Bad request (invalid data)
 *       404:
 *         description: Warehouse not found
 *       500:
 *         description: Internal server error
 */
warehouseRouter.put("/:id", protect, admin, updateWarehouse);

/**
 * @swagger
 * /api/warehouses/{id}:
 *   delete:
 *     summary: Delete a warehouse (Admin only)
 *     tags: [Warehouses]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Warehouse ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Warehouse deleted successfully
 *       404:
 *         description: Warehouse not found
 *       500:
 *         description: Internal server error
 */
warehouseRouter.delete("/:id", protect, admin, deleteWarehouse);

module.exports = warehouseRouter;
