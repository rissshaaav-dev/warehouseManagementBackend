const mongoose = require("mongoose");

const WarehouseSchema = new mongoose.Schema({
  name: String,
  location: String,
});

module.exports = mongoose.model("Warehouse", WarehouseSchema);
