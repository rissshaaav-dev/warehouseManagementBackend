const mongoose = require("mongoose");

const StockSchema = new mongoose.Schema({
  warehouse: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Warehouse",
    required: true,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    reuired: true,
  },
  quantity: {
    type: Number,
    min: 0,
    required: true,
  },
});

module.exports = mongoose.model("Stock", StockSchema);
