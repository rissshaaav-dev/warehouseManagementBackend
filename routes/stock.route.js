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

stockRouter.post("/", protect, admin, addStock); // Add stock (Admin)
stockRouter.get("/:productId/:warehouseId", getStock); // Get stock (Public)
stockRouter.put("/:id", protect, admin, updateStock); // Update stock (Admin)
stockRouter.delete("/:id", protect, admin, deleteStock); // Delete stock (Admin)

module.exports = stockRouter;
