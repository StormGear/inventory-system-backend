"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const dashboardRoutes_1 = __importDefault(require("./routes/dashboardRoutes"));
// import swaggerOutput from "../swagger_output.json";
const options = {
    definition: {
        openapi: "3.1.0",
        info: {
            title: "Inventory Management System API",
            version: "0.1.0",
            description: "This is the API for an inventory management system",
            contact: {
                name: "Papa Kofi",
                url: "https://github.com/StormGear",
                email: "papakofiboahen@gmail.com",
            },
        },
        servers: [
            {
                url: "http://localhost:8000",
                description: "Development server",
            },
            {
                url: "https://inventory-system-backend-i5xg.onrender.com",
                description: "Production server",
            },
        ],
    },
    apis: ["**/*.ts"]
};
const specs = (0, swagger_jsdoc_1.default)(options);
// ROUTES IMPORTS
// CONFIG
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(specs, { explorer: true }));
app.use(express_1.default.json());
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use(helmet_1.default.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use((0, morgan_1.default)("common"));
app.use(body_parser_1.default.urlencoded({ extended: false }));
// ROUTES
app.use("/dashboard", dashboardRoutes_1.default);
// SERVER
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
