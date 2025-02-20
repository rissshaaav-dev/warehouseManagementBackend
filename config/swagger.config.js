const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Warehouse Management API",
      version: "1.0.0",
      description: "API documentation for the Warehouse Management System",
    },
    servers: [{ url: "http://localhost:3000" }], // Adjust based on your server
  },
  apis: ["./routes/*.js"], // Points to your route files
};

const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };
