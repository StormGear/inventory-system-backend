"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_autogen_1 = __importDefault(require("swagger-autogen"));
const doc = {
    info: {
        version: 'v1.0.0',
        title: 'Inventory Management System API',
        description: 'This is the API for an inventory management system',
        contact: {
            name: "Papa Kofi",
            url: "https://github.com/StormGear",
            email: "papakofiboahen@gmail.com",
        },
    },
    servers: [
        {
            url: 'http://localhost:8080',
            description: 'localserver'
        },
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
            }
        }
    }
};
const outputFile = './swagger_output.json';
const endpointsFiles = ['./src/routes/*.ts'];
(0, swagger_autogen_1.default)({ openapi: '3.0.0' })(outputFile, endpointsFiles, doc).then(() => {
    require('./src/index.ts');
});
