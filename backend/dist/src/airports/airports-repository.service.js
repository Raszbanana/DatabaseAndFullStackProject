"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AirportsRepositoryService = void 0;
const connections_1 = __importDefault(require("../db/connections"));
const airport_model_1 = require("../common/models/airport.model");
class AirportsRepositoryService {
    airportsRepository = connections_1.default.getRepository(airport_model_1.AirportModel);
    findAllAirports = async () => {
        try {
            const airports = await this.airportsRepository.find();
            console.log('airports', airports);
            return airports;
        }
        catch (error) {
            console.error('Error fetching airports:', error);
            throw error;
        }
    };
}
exports.AirportsRepositoryService = AirportsRepositoryService;
