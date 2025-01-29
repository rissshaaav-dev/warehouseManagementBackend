const express = require("express");
const connectDB = require("./config/db.config");
const errorHandler = require("./middlewares/errorHandler.middleware");

const app = express();

// Connect to MongoDB
connectDB();

// Middleware to parse json
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Hello World");
});

// Error handling middleware (must be at the end)
app.use(errorHandler);

// Starting server
app.listen(process.env.PORT, () => {
  console.log(`🚀 Server running on port ${process.env.PORT}`);
});
