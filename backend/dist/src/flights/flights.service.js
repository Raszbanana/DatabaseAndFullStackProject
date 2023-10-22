"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlightsService = void 0;
const flights_repository_1 = require("./flights.repository");
class FlightsService {
    flightRepository = new flights_repository_1.FlightRepository();
    getFlights = async (searchParams) => {
        const departureFlights = await this.flightRepository.findFlights(searchParams);
        const itinerary = {
            departureFlight: departureFlights,
        };
        return flights;
    };
    getAllFlights = async () => {
        const flights = await this.flightRepository.findAllFlights();
        return flights;
    };
}
exports.FlightsService = FlightsService;
