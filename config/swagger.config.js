const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerOptions = {
  definition: {
    // 🔹 Use `definition` instead of `swaggerDefinition`
    openapi: "3.0.0",
    info: {
      title: "Inventory API",
      version: "1.0.0",
      description: "API for managing products, warehouses, and stocks",
    },
    servers: [{ url: "http://localhost:3000" }], // Adjust to match your server
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ BearerAuth: [] }], // Apply globally
  },
  apis: ["./routes/*.js"], // Adjust if needed
};

const specs = swaggerJsDoc(swaggerOptions);

module.exports = { swaggerUi, specs };
