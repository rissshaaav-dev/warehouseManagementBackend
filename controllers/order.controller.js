const Product = require("../models/product.model");
const Stock = require("../models/stock.model");
const Order = require("../models/order.model");


// @desc    Place an order
// @route   POST /api/orders
// @access  Private (User)
const placeOrder = async (req, res, next) => {
  try {
    const { customerName, customerEmail, items } = req.body;

    if (!customerName || !customerEmail || items.length === 0) {
      res.status(400);
      throw new Error("Customer name, email, and items are required");
    }

    let totalPrice = 0;
    let updatedStock = [];

    for (const item of items) {
      const product = await Product.findById(item.product);
      const stock = await Stock.findOne({
        product: item.product,
        warehouse: item.warehouse,
      });

      if (!product || !stock) {
        res.status(404);
        throw new Error("Product or stock record not found");
      }

      if (stock.quantity < item.quantity) {
        res.status(400);
        throw new Error(`Not enough stock for ${product.name}`);
      }

      totalPrice += product.price * item.quantity;
      updatedStock.push({ stock, quantity: item.quantity });
    }

    // Deduct stock after verification
    for (const { stock, quantity } of updatedStock) {
      stock.quantity -= quantity;
      await stock.save();
    }

    const order = new Order({
      customerName,
      customerEmail,
      employee: req.user._id, // The employee who placed the order
      items,
      totalPrice,
    });

    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    next(error);
  }
};

// @desc    Get all orders (Admin)
// @route   GET /api/orders
// @access  Private (Admin)
const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find().populate("employee", "name");
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

// @desc    Get orders placed by a specific employee
// @route   GET /api/orders/my-orders
// @access  Private (Employee)
const getEmployeeOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ employee: req.user._id }).populate(
      "items.product items.warehouse"
    );
    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};

// @desc    Update order status
// @route   PUT /api/orders/:id
// @access  Private (Admin)
const updateOrderStatus = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      res.status(404);
      throw new Error("Order not found");
    }

    order.status = req.body.status || order.status;
    const updatedOrder = await order.save();

    res.status(200).json(updatedOrder);
  } catch (error) {
    next(error);
  }
};

// @desc    Cancel an order
// @route   DELETE /api/orders/:id
// @access  Private (Employee)
const cancelOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      res.status(404);
      throw new Error("Order not found");
    }

    if (order.employee.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error("Not authorized to cancel this order");
    }

    if (order.status !== "Pending") {
      res.status(400);
      throw new Error("Only pending orders can be cancelled");
    }

    // Refund stock on cancellation
    for (const item of order.items) {
      const stock = await Stock.findOne({
        product: item.product,
        warehouse: item.warehouse,
      });

      if (stock) {
        stock.quantity += item.quantity;
        await stock.save();
      }
    }

    await order.remove();
    res.status(200).json({ message: "Order cancelled successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  placeOrder,
  getOrders,
  getEmployeeOrders,
  updateOrderStatus,
  cancelOrder,
};
