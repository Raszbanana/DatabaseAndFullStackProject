"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AirportsService = void 0;
const airports_repository_service_1 = require("./airports-repository.service");
class AirportsService {
    airportsRepositoryService = new airports_repository_service_1.AirportsRepositoryService();
    getAllAirports = async () => {
        const airports = await this.airportsRepositoryService.findAllAirports();
        return airports;
    };
}
exports.AirportsService = AirportsService;
