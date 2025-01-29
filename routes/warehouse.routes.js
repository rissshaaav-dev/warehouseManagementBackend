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

const router = express.Router();

router.post("/", protect, admin, createWarehouse); // Create a warehouse (Admin)
router.get("/", getAllWarehouses); // Get all warehouses (Public)
router.get("/:id", getWarehouseById); // Get warehouse by ID (Public)
router.put("/:id", protect, admin, updateWarehouse); // Update a warehouse (Admin)
router.delete("/:id", protect, admin, deleteWarehouse); // Delete a warehouse (Admin)

module.exports = router;
