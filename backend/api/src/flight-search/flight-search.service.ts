import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Flight } from '../mysql-db-entities/flight/flight.entity';
import { IFlightSearchParams } from '../flight-search/utils/common/flight-search-params';

@Injectable()
export class FlightSearchService {
  constructor(
    @InjectRepository(Flight)
    private flightRepository: Repository<Flight>,
  ) {}

  async searchFlights(
    flightSearchParams: IFlightSearchParams,
  ): Promise<Flight[]> {
    // Setup query for stored procedure
    try {
      const query = 'CALL GetFlightsByDestinationAndDates(?, ?, ?, ?)';

      const result = await this.flightRepository.query(query, [
        flightSearchParams.departureDate,
        flightSearchParams.departureAirport,
        flightSearchParams.arrivalAirport,
        flightSearchParams.numberOfPassengers,
      ]);

      return result[0];
    } catch (error) {
      console.log(error);
    }
  }
}
