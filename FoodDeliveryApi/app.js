import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./database/db.js";
import userRoutes from "./routes/userRoutes.js";
import restaurantRoutes from "./routes/restaurantRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";  // Import orderRoutes
import foodOrderRoutes from './routes/foodOrderRoutes.js';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

// DOTENV CONFIGURATION
dotenv.config();

// DATABASE CONFIGURATION
connectDB();

// REST OBJ
const app = express();

//******** MIDDLEWARE *******/
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

//***** SWAGGER INITIATION *****/
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Food Delivery API with Swagger',
      version: '1.0.0',
      description: 'A Food Delivery API with Swagger documentation',
    },
  },
  apis: ['./routes/*.js'],
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Serve swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//***** MIDDLEWARE ROUTES *****/
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/restaurants", restaurantRoutes);
app.use("/api/v1/orders", orderRoutes);  // Add orderRoutes
app.use('/api/v1', foodOrderRoutes);

//******** PORTS AND LISTEN *******/
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(
    `Node server running in ${process.env.DEV_MODE} mode on Port ${port}.`
      .bgBrightMagenta.white
  );
});
