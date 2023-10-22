import { IFlight } from './entities/flight.entity';

export interface IItinerary {
  departureFlights: IFlight[];
  returnFlights?: IFlight[];
}
