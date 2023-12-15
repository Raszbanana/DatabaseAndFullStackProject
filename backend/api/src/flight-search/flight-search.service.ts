import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Flight } from '../mysql-db-entities/flight/flight.entity';
import { IFlightSearchParams } from '../flight-search/utils/common/flight-search-params';
import { IFlightSearchResponse } from './utils/common/flight-search-response.interface';
import { IFlight } from './utils/common/flight.interface';

@Injectable()
export class FlightSearchService {
  constructor(
    @InjectRepository(Flight)
    private readonly flightRepository: Repository<Flight>,
  ) {}

  async searchFlights(
    flightSearchParams: IFlightSearchParams,
  ): Promise<any> {
    // Setup query for stored procedure
    try {
      const query = 'CALL GetFlightsByDestinationAndDates(?, ?, ?, ?)';

      const result: IFlightSearchResponse[][] = await this.flightRepository.query(query, [
        flightSearchParams.departureDate,
        flightSearchParams.departureAirport,
        flightSearchParams.arrivalAirport,
        flightSearchParams.numberOfPassengers,
      ]);

      const flightData: IFlightSearchResponse[] = result[0];

      const transformFlightSearchResult: IFlight[] = flightData.map(mapFlightSearchResponseToFlight);

      return transformFlightSearchResult;
    } catch (error) {
      console.log(error);
    }
  }
}

function mapFlightSearchResponseToFlight(response: IFlightSearchResponse): IFlight {
  return {
    id: response.flightId,
    flightNumber: response.flightNumber,
    departureTime: response.departureDateTime,
    arrivalTime: response.arrivalDateTime,
    departureAirport: {
      airportCode: response.departureAirportCode,
      city: response.departureAirportCity,
      country: response.departureAirportCountry,
    },
    arrivalAirport: {
      airportCode: response.arrivalAirportCode,
      city: response.arrivalAirportCity,
      country: response.arrivalAirportCountry,
    },
    // generate random price between 100 and 500
    price: Math.floor(Math.random() * (500 - 100 + 1) + 100), 
  };
}
