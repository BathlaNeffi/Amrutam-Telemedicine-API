const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Amrutam Telemedicine API",
      version: "1.0.0",
      description: "Backend API documentation for telemedicine system"
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        }
      }
    },
    security: [{ bearerAuth: [] }]
  },
  apis: ["./src/swagger/*swagger.js"], 
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
