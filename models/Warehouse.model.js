const mongoose = require("mongoose");

const warehouseSchema = new mongoose.Schema(
  {
    name: String,
    location: String,
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.Warehouse || mongoose.model("Warehouse", warehouseSchema);
