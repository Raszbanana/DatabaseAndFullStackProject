import { IFlightSearchParams } from './entities/flight-search-params.entity';
import { IFlight } from './entities/flight.entity';
import { IFlights } from './entities/flights.interface';
import { FlightRepository } from './flights.repository';
import { FlightModel } from '../models/flight.model';

export class FlightsService implements IFlights {
  flightRepository: FlightRepository = new FlightRepository();

  getFlights(searchParams: IFlightSearchParams): Promise<IFlight[]> {
    throw new Error('Method not implemented.');
  }

  getAllFlights = async (): Promise<FlightModel[]> => {
    const flights = await this.flightRepository.findAllFlights();

    return flights;
  };
}
