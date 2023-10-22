"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const connections_1 = __importDefault(require("../db/connections"));
const express_1 = __importDefault(require("express"));
const flightsRouter_1 = __importDefault(require("./routers/flightsRouter"));
require("reflect-metadata");
const airportsRouter_1 = __importDefault(require("./routers/airportsRouter"));
(0, dotenv_1.config)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api/flights', flightsRouter_1.default);
app.use('/api/airports', airportsRouter_1.default);
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;
connections_1.default.initialize()
    .then(() => {
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });
})
    .catch((err) => {
    console.log('Failed to sync db: ' + err);
});
