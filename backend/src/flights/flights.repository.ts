import { EntityRepository, Repository } from 'typeorm';
import db from '../db/connections';
import { FlightModel } from '../utils/common/models/flight.model';
import { IFlightSearchParams } from './entities/flight-search-params.entity';
import { IFlightsRepository } from './entities/flights-repository.interface';

export class FlightRepository implements IFlightsRepository {
  flightsRepository = db.getRepository(FlightModel);

  findFlights = async (
    departureDate: string,
    departureAirportId: number,
    arrivalAirportId: number,
    numberOfPassengers: number
  ): Promise<FlightModel[]> => {
    try {
      const [flights] = await this.flightsRepository.query(
        `
      CALL GetFlightsByDestinationAndDates(?, ?, ?, ?);
  `,
        [
          departureDate,
          departureAirportId,
          arrivalAirportId,
          numberOfPassengers,
        ]
      );

      // CHANGE THIS ANY
      const foundFlights = flights.map((flight: any) => {
        return {
          flightId: flight.flightId,
          flightNumber: flight.flightNumber,
          departureDate: flight.departureDateTime,
          departureAirport: {
            airportId: flight.departureAirportId,
            airportCode: flight.departureAirportCode,
            city: flight.departureAirportCity,
            country: flight.departureAirportCountry,
          },
          arrivalDate: flight.arrivalDateTime,
          arrivalAirport: {
            airportId: flight.arrivalAirportId,
            airportCode: flight.arrivalAirportCode,
            city: flight.arrivalAirportCity,
            country: flight.arrivalAirportCountry,
          },
          numberOfPassengers: flight.numberOfPassengers,
        };
      });
      return foundFlights;
    } catch (error) {
      console.error('Error fetching flights:', error);
      throw error;
    }
  };

  findAllFlights = async (): Promise<FlightModel[]> => {
    try {
      const flights = await this.flightsRepository.find();

      return flights;
    } catch (error) {
      console.error('Error fetching flights:', error);
      throw error;
    }
  };
}
