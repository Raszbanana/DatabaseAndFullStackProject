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

    const flightsSearchResult = await session.run(
      `
      MATCH (flight:Flight)-[:DEPARTS_FROM]-(departureAirport:Airport)-[:IS_LOCATED_IN]-(departureLocation: Location)
      MATCH (flight)-[:ARRIVES_TO]-(arrivalAirport:Airport)-[:IS_LOCATED_IN]-(arrivalLocation: Location)
      WHERE departureAirport.airportId = toInteger($departureAirport)
      AND arrivalAirport.airportId  = toInteger($arrivalAirport)
      AND flight.departureDateTime STARTS WITH $departureDate
      AND flight.numberOfAvailableSeats >= toInteger($numberOfAvailableSeats)
      RETURN flight, departureAirport, arrivalAirport, departureLocation, arrivalLocation;
      `,
      {
        departureDate: convertDepartureDateForNeo4j(
          flightSearchParamsNeo4j.departureDate,
        ),
        departureAirport: flightSearchParamsNeo4j.departureAirport,
        arrivalAirport: flightSearchParamsNeo4j.arrivalAirport,
        numberOfAvailableSeats: flightSearchParamsNeo4j.numberOfPassengers,
      },
    );

    const flights = flightsSearchResult.records.map(
      (record) => record.get('flight').properties,
    );
    const departureAirport = flightsSearchResult.records.map(
      (record) => record.get('departureAirport').properties,
    );
    const arrivalAirport = flightsSearchResult.records.map(
      (record) => record.get('arrivalAirport').properties,
    );

    const departureLocation = flightsSearchResult.records.map(
      (record) => record.get('departureLocation').properties,
    );

    const arrivalLocation = flightsSearchResult.records.map(
      (record) => record.get('arrivalLocation').properties,
    );

    // end the session
    await session.close();

    const flightsObjects = flights.map((flight, index) => {
      return {
        flightId: flight.flightId,
        flightNumber: flight.flightNumber,
        departureDateTime: flight.departureDateTime,
        arrivalDateTime: flight.arrivalDateTime,
        departureAirportCode: departureAirport[index].airportCode,
        departureAirportCity: departureLocation[index].city,
        departureAirportCountry: departureLocation[index].country,
        arrivalAirportCode: arrivalAirport[index].airportCode,
        arrivalAirportCity: arrivalLocation[index].city,
        arrivalAirportCountry: arrivalLocation[index].country,
        numberOfAvailableSeats: flight.numberOfAvailableSeats.low,
      };
    });

    return flightsObjects;
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
