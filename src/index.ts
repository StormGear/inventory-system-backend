import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import dashboardRoutes from "./routes/dashboardRoutes";
// import swaggerOutput from "../swagger_output.json";

const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Inventory Management System API",
      version: "0.1.0",
      description:
        "This is the API for an inventory management system",
      contact: {
        name: "Papa Kofi",
        url: "https://github.com/StormGear",
        email: "papakofiboahen@gmail.com",
      },
    },
    servers: [
      {
        url: "http://localhost:8000",
      },
    ],
  },
  apis: ["**/*.ts"]
};

const specs = swaggerJsdoc(options);

// ROUTES IMPORTS

// CONFIG
dotenv.config();
const app = express();
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })  

);
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.urlencoded({ extended: false }));



// ROUTES
app.use("/dashboard", dashboardRoutes);


// SERVER
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});