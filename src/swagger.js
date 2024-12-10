const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// إعدادات Swagger
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Calorie Tracker API",
      version: "1.0.0",
      description: "API documentation for the Calorie Tracker project",
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "Development server",
      },
    ],
  },
  apis: ["./src/routes/*.js"], // مكان ملفات الروتات
};

const swaggerSpec = swaggerJsdoc(options);

const setupSwagger = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log("Swagger docs available at /api-docs");
};

module.exports = setupSwagger;
