const express = require("express");
const { swaggerUi, specs } = require("./config/swagger.config");
const connectDB = require("./config/db.config");
const errorHandler = require("./middlewares/errorHandler.middleware");
const authRouter = require("./routes/auth.routes");
const productRouter = require("./routes/product.routes");
const warehouseRouter = require("./routes/warehouse.routes");
const stockRouter = require("./routes/stock.route");
const orderRouter = require("./routes/order.routes");

const app = express();

// Connect to MongoDB
connectDB();

// Middleware to parse json
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/auth", authRouter);
app.use("/api/products", productRouter);
app.use("/api/warehouses", warehouseRouter);
app.use("/api/stocks", stockRouter);
app.use("/api/orders", orderRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// Error handling middleware (must be at the end)
app.use(errorHandler);

// Starting server
app.listen(process.env.PORT, () => {
  console.log(`🚀 Server running on port ${process.env.PORT}`);
  console.log(`Connecting to mongodb...`);
});
