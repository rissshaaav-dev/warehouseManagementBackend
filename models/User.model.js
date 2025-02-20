const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: {
    type: String,
    enum: ["admin", "warehouse-manager", "staff"],
    default: "staff",
  },
});

module.exports =
  mongoose.models.User || mongoose.model("User", userSchema);
