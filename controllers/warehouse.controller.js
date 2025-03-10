const Warehouse = require("../models/Warehouse.model");

// @desc    Create a new warehouse
// @route   POST /api/warehouses
// @access  Private (Admin)
const createWarehouse = async (req, res, next) => {
  const { name, location } = req.body;
  try {
    // check if all necessary fields are supplied
    if (!name || !location) {
      res.status(400);
      throw new Error('Missing necessary fields: name, location');
    }

    // check if warehouse already exists
    const existingWarehouse = await Warehouse.findOne({ name, location });
    if (existingWarehouse) {
      res.status(400);
      throw new Error('Warehouse already exists');
    }

    // create new warehouse
    const newWarehouse = await Warehouse.create({ name, location });

    // send success response
    res
      .status(201)
      .json({ message: "Warehouse created successfully", newWarehouse });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all warehouses
// @route   GET /api/warehouses
// @access  Public
const getAllWarehouses = async (req, res, next) => {
  try {
    const warehouses = await Warehouse.find();
    res.status(200).json(warehouses);
  } catch (error) {
    next(error);
  }
};

// @desc    Get warehouse by ID
// @route   GET /api/warehouses/:id
// @access  Public
const getWarehouseById = async (req, res, next) => {
  try {
    const warehouse = await Warehouse.findById(req.params.id);
    if (!warehouse) {
      res.status(404);
      throw new Error('Warehouse not found');
    }
    res.status(200).json(warehouse);
  } catch (error) {
    next(error);
  }
};

// @desc    Update a warehouse
// @route   PUT /api/warehouses/:id
// @access  Private (Admin)
const updateWarehouse = async (req, res, next) => {
  try {
    const warehouse = await Warehouse.findById(req.params.id);
    if (!warehouse) {
      res.status(404);
      throw new Error('Warehouse not found');
    }

    const { name, location } = req.body;

    warehouse.name = name || warehouse.name;
    warehouse.location = location || warehouse.location;

    const updatedWarehouse = await warehouse.save();
    res.status(200).json(updatedWarehouse);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a warehouse
// @route   DELETE /api/warehouses/:id
// @access  Private (Admin)
const deleteWarehouse = async (req, res, next) => {
  try {
    const retrievedWarehouse = await Warehouse.findById(req.params.id);
    if (!retrievedWarehouse) {
      res.status(404);
      throw new Error('Warehouse not found');
    }

    await retrievedWarehouse.deleteOne();
    res.status(200).json({ message: "Warehouse deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createWarehouse,
  getAllWarehouses,
  getWarehouseById,
  updateWarehouse,
  deleteWarehouse,
};
