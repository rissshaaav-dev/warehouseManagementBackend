const Product = require("../models/Product.model");

// @desc    Create a new product
// @route   POST /api/products
// @access  Private (Admin)
const createProduct = async (req, res, next) => {
  const { name, sku, price, stock, warehouse } = req.body;

  try {
    // check if all necessary fields are supplied
    if (!name || !sku || !price || !stock || !warehouse) {
      res.status(400);
      throw new Error(
        "Necessary fields missing: name, sku, price, stock, warehouse"
      );
    }

    // check if product already exists
    const existingProduct = await Product.findOne({ sku });
    if (existingProduct) {
      res.status(400);
      throw new Error("Product already exists");
    }

    // create new product
    const newProduct = await Product.create({
      name,
      sku,
      price,
      stock,
      warehouse,
    });

    // send success response
    res
      .status(201)
      .json({ message: "Product created successfully", newProduct });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all products
// @route   GET /api/products
// @access  Public
const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

// @desc    Get single product by ID
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res, next) => {
  try {
    // search for the product by extracting id from the params
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }

    // send the response
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private (Admin)
const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }

    const { name, sku, price, stock, warehouse } = req.body;

    product.name = name || product.name;
    product.sku = sku || product.sku;
    product.price = price || product.price;
    product.stock = stock || product.stock;
    product.warehouse = warehouse || product.warehouse;

    const updatedProduct = await product.save();
    res.status(200).json(updatedProduct);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private (Admin)
const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }

    await product.deleteOne();
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
