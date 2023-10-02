import { EntityRepository, Repository } from 'typeorm';
import db from '../db/connections';
import { FlightModel } from '../models/flight.model';
import { IFlightSearchParams } from './entities/flight-search-params.entity';
import { IFlightsRepository } from './entities/flights-repository.interface';

export class FlightRepository implements IFlightsRepository {
  flightsRepository = db.getRepository(FlightModel);

  findFlights = async (
    searchParams: IFlightSearchParams
  ): Promise<FlightModel[]> => {
    try {
      const flights = await this.createQueryBuilder('flight')
        .where('flight.departureAirportId = :departureAirportId', {
          departureAirportId: searchParams.departureAirportId,
        })
        .andWhere('flight.arrivalAirportId = :arrivalAirportId', {
          arrivalAirportId: searchParams.arrivalAirportId,
        })
        .andWhere('flight.departureDateTime = :departureDate', {
          departureDate: searchParams.departureDate,
        })
        .andWhere('flight.availableSeats >= :numberOfPassengers', {
          numberOfPassengers: searchParams.numberOfPassengers,
        })
        .getMany();

      return flights;
    } catch (error) {
      console.error('Error fetching flights:', error);
      throw error;
    }
  };

  findAllFlights = async (): Promise<FlightModel[]> => {
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
