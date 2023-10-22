'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.FlightsService = void 0;
const flights_repository_service_1 = require('./flights-repository.service');
class FlightsService {
  FlightsRepository = new flights_repository_service_1.FlightsRepository();
  getFlights(searchParams) {
    throw new Error('Method not implemented.');
  }
  getAllFlights = async () => {
    const flights = await this.FlightsRepository.findAllFlights();
    return flights;
  };
}
exports.FlightsService = FlightsService;
