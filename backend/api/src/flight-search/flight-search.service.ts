import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import neo4j from 'neo4j-driver';

import { FlightMysqlEntity } from '../mysql-db-entities/flight/flight.entity';
import { IFlightSearchParams } from '../flight-search/utils/common/flight-search-params';
import { IFlightSearchResponse } from './utils/common/flight-search-response.interface';
import { IFlight } from './utils/common/flight.interface';
import { convertDepartureDateForNeo4j } from './utils/convert-departure-date-for-neo4j';

@Injectable()
export class FlightSearchService {
  constructor(
    @InjectRepository(FlightMysqlEntity)
    private readonly flightRepository: Repository<FlightMysqlEntity>,
  ) {}

  async searchFlights(
    flightSearchParams: Omit<IFlightSearchParams, 'returnDate'>,
  ): Promise<any> {
    try {
      const query = 'CALL GetFlightsByDestinationAndDates(?, ?, ?, ?)';

      const result: IFlightSearchResponse[][] =
        await this.flightRepository.query(query, [
          flightSearchParams.departureDate,
          flightSearchParams.departureAirport,
          flightSearchParams.arrivalAirport,
          flightSearchParams.numberOfPassengers,
        ]);

      const flightData: IFlightSearchResponse[] = result[0];

      const transformFlightSearchResult: IFlight[] = flightData.map(
        mapFlightSearchResponseToFlight,
      );

      return transformFlightSearchResult;
    } catch (error) {
      console.log(error);
    }
  }

  async getFlights(flightSearchParams: IFlightSearchParams): Promise<any> {
    const departureFlights = await this.searchFlights({
      departureDate: flightSearchParams.departureDate,
      departureAirport: flightSearchParams.departureAirport,
      arrivalAirport: flightSearchParams.arrivalAirport,
      numberOfPassengers: flightSearchParams.numberOfPassengers,
    });
    const returnFlights = flightSearchParams.returnDate
      ? await this.searchFlights({
          departureDate: flightSearchParams.returnDate,
          departureAirport: flightSearchParams.arrivalAirport,
          arrivalAirport: flightSearchParams.departureAirport,
          numberOfPassengers: flightSearchParams.numberOfPassengers,
        })
      : [];

    return {
      departureFlights,
      returnFlights,
    };
  }

  async getFlightsNeo4j(flightSearchParams: IFlightSearchParams): Promise<any> {
    const departureFlights = await this.searchFlightsNeo4j({
      departureDate: flightSearchParams.departureDate,
      departureAirport: flightSearchParams.departureAirport,
      arrivalAirport: flightSearchParams.arrivalAirport,
      numberOfPassengers: flightSearchParams.numberOfPassengers,
    });
    const returnFlights = flightSearchParams.returnDate
      ? await this.searchFlightsNeo4j({
          departureDate: flightSearchParams.returnDate,
          departureAirport: flightSearchParams.arrivalAirport,
          arrivalAirport: flightSearchParams.departureAirport,
          numberOfPassengers: flightSearchParams.numberOfPassengers,
        })
      : [];

    return {
      departureFlights,
      returnFlights,
    };
  }

  async searchFlightsNeo4j(
    flightSearchParamsNeo4j: Omit<IFlightSearchParams, 'returnDate'>,
  ) {
    const driver = neo4j.driver(
      'neo4j+s://b04c6451.databases.neo4j.io',
      neo4j.auth.basic('neo4j', 'P0pIXiJ8QGPMYDQmKoqN5lUHh9LMr0IVEEHWcNr8MVI'),
    );

    const session = driver.session();

    const flights = await session.run(
      `
      MATCH (flight:Flight)-[:DEPARTS_FROM]-(departureAirport:Airport)
      MATCH (flight)-[:ARRIVES_TO]-(arrivalAirport:Airport) 
      WHERE ID(departureAirport) = toInteger($departureAirport)
      AND ID(arrivalAirport) = toInteger($arrivalAirport)
      AND flight.departureDateTime STARTS WITH $departureDate
      RETURN flight, departureAirport, arrivalAirport;
      `,
      {
        departureDate: convertDepartureDateForNeo4j(
          flightSearchParamsNeo4j.departureDate,
        ),
        departureAirport: flightSearchParamsNeo4j.departureAirport,
        arrivalAirport: flightSearchParamsNeo4j.arrivalAirport,
      },
    );

    console.log(
      flights.records.map((record) => record.get('flight').properties),
    );

    // end the session
    await session.close();

    return flights.records.map((record) => record.get('flight').properties);
  }
}

function mapFlightSearchResponseToFlight(
  response: IFlightSearchResponse,
): IFlight {
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
