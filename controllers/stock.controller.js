const Product = require("../models/Product.model");
const Stock = require("../models/Stock.model");
const Warehouse = require("../models/Warehouse.model");

// @desc    Add stock for a product in a warehouse
// @route   POST /api/stocks
// @access  Private (Admin)
const addStock = async (req, res, next) => {
  const { product, warehouse, quantity } = req.body;

  try {
    // check if all necessary fields are supplied
    if (!product || !warehouse || !quantity) {
      res.status(400);
      throw new Error("Necessary fields missing: product, warehouse, quantity");
    }

    // check if product exists
    const existingProduct = await Product.findById(product);
    if (!existingProduct) {
      res.status(400);
      throw new Error("Product does not exist");
    }

    // check if warehouse exists
    const existingWarehouse = await Warehouse.findById(warehouse);
    if (!existingWarehouse) {
      res.status(400);
      throw new Error("Warehouse does not exist");
    }

    // check if stock already exists
    const existingStock = await Stock.findOne({ product, warehouse });
    if (existingStock) {
      res.status(400);
      throw new Error("Stock already exists");
    }

    // create new stock
    const newStock = await Stock.create({
      product,
      warehouse,
      quantity,
    });

    // send success response
    res.status(201).json({ message: "Stock added successfully", newStock });
  } catch (error) {
    next(error);
  }
};

// @desc    Get stock details for a product in a warehouse
// @route   GET /api/stocks/:productId/:warehouseId
// @access  Public
const getStock = async (req, res, next) => {
  try {
    // search for the stock by extracting product and warehouse IDs from the params
    const stock = await Stock.findOne({
      product: req.params.productId,
      warehouse: req.params.warehouseId,
    }).populate("product warehouse");

    if (!stock) {
      res.status(404);
      throw new Error("Stock not found");
    }

    res.status(200).json(stock);
  } catch (error) {
    next(error);
  }
};

// @desc    Update stock quantity
// @route   PUT /api/stocks/:id
// @access  Private (Admin)
const updateStock = async (req, res, next) => {
  const { quantity } = req.body;

  try {
    // check if quantity is supplied
    if (!quantity) {
      res.status(400);
      throw new Error("Quantity field missing");
    }

    // find the stock by id and update the quantity
    const stock = await Stock.findById(req.params.id);
    if (!stock) {
      res.status(404);
      throw new Error("Stock not found");
    }

    stock.quantity = quantity;
    await stock.save();

    res.status(200).json({ message: "Stock updated successfully", stock });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete stock record (if needed)
// @route   DELETE /api/stocks/:id
// @access  Private (Admin)
const deleteStock = async (req, res, next) => {
  try {
    // find the stock by id and delete it
    const stock = await Stock.findById(req.params.id);
    if (!stock) {
      res.status(404);
      throw new Error("Stock not found");
    }

    await stock.remove();

    res.status(200).json({ message: "Stock deleted successfully" });
  } catch (error) {
    next(error);
  }
};
