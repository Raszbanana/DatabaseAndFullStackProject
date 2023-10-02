import { FlightModel } from '../../utils/common/models/flight.model';
import { IFlightSearchParams } from './flight-search-params.entity';

export interface IFlightsRepository {
  findFlights(
    departureDate: string,
    departureAirportId: number,
    arrivalAirportId: number,
    numberOfPassengers: number
  ): Promise<FlightModel[]>;

  findAllFlights(): Promise<FlightModel[]>;
}
