'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.FlightsRepository = void 0;
const connections_1 = __importDefault(require('../db/connections'));
const flight_model_1 = require('../models/flight.model');
class FlightsRepository {
  flightsRepository = connections_1.default.getRepository(
    flight_model_1.FlightModel
  );
  findFlights(searchParams) {
    throw new Error('Method not implemented.');
  }
  findAllFlights = async () => {
    try {
      const flights = await this.flightsRepository.find();
      console.log('flights', flights);
      return flights;
    } catch (error) {
      console.error('Error fetching flights:', error);
      throw error;
    }
  };
}
exports.FlightsRepository = FlightsRepository;
