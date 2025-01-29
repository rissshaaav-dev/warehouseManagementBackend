const express = require("express");
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.controller");
const protect = require("../middlewares/auth.middleware");
const admin = require("../middlewares/admin.middleware");

const productRouter = express.Router();

productRouter.post("/", protect, admin, createProduct); // Create a product (Admin)
productRouter.get("/", getAllProducts); // Get all products (Public)
productRouter.get("/:id", getProductById); // Get product by ID (Public)
productRouter.put("/:id", protect, admin, updateProduct); // Update a product (Admin)
productRouter.delete("/:id", protect, admin, deleteProduct); // Delete a product (Admin)

module.exports = productRouter;
