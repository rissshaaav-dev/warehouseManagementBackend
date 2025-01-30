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

warehouseRouter.post("/", protect, admin, createWarehouse); // Create a warehouse (Admin)
warehouseRouter.get("/", getAllWarehouses); // Get all warehouses (Public)
warehouseRouter.get("/:id", getWarehouseById); // Get warehouse by ID (Public)
warehouseRouter.put("/:id", protect, admin, updateWarehouse); // Update a warehouse (Admin)
warehouseRouter.delete("/:id", protect, admin, deleteWarehouse); // Delete a warehouse (Admin)

module.exports = warehouseRouter;
