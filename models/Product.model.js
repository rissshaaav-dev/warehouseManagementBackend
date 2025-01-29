const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: String,
  description: String,
  category: String,
  sku: {
    type: String,
    unique: true,
    required: true,
  },
});

module.exports = mongoose.model("Product", ProductSchema);
