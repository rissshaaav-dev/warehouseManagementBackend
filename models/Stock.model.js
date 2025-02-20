const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema({
  warehouse: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Warehouse",
    required: true,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    min: 0,
    required: true,
  },
});

module.exports =
  mongoose.models.Stock || mongoose.model("Stock", stockSchema);
