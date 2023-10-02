import { FlightModel } from '../../models/flight.model';
import { IFlightSearchParams } from './flight-search-params.entity';
import { IFlight } from './flight.entity';

export interface IFlights {
  getFlights(searchParams: IFlightSearchParams): Promise<IFlight[]>;

  getAllFlights(): Promise<FlightModel[]>;
}
