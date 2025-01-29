const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    ordernNumber: {
      type: String,
      unique: true,
      required: true,
    },
    customerName: String,
    customerEmail: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Pending",
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        warehouse: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Warehouse",
          required: true,
        },
        quantity: { type: Number, required: true },
      },
    ],
    totalAmount: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);