import { IFlightSearchParams } from './flight-search-params.entity';
import { IFlight } from '../../utils/common/entities/flight.entity';
import { IItinerary } from '../../utils/common/itinerary.entity';

export interface IFlights {
  getFlights(searchParams: IFlightSearchParams): Promise<IItinerary>;

  getAllFlights(): Promise<IFlight[]>;
}
