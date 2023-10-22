"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const dotenv = __importStar(require("dotenv"));
const typeorm_1 = require("typeorm");
const flight_model_1 = require("../common/models/flight.model");
const airport_model_1 = require("../common/models/airport.model");
dotenv.config();
const database = process.env.DATABASE_NAME || 'flight_system';
const username = process.env.DATABASE_USERNAME || '';
const password = process.env.DATABASE_PASSWORD;
exports.db = new typeorm_1.DataSource({
    type: 'mysql',
    host: process.env.DATABASE_HOST,
    port: 3306,
    username: username,
    password: password,
    database: database,
    synchronize: true,
    logging: false,
    entities: [flight_model_1.FlightModel, airport_model_1.AirportModel],
    subscribers: [],
    migrations: [],
});
exports.default = exports.db;
