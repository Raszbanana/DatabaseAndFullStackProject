import { FlightModel } from '../../models/flight.model';
import { IFlightSearchParams } from './flight-search-params.entity';

export interface IFlightsRepository {
  findFlights(searchParams: IFlightSearchParams): Promise<FlightModel[]>;

  findAllFlights(): Promise<FlightModel[]>;
}
