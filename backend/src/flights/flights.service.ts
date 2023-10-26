import { IFlightSearchParams } from './entities/flight-search-params.entity';
import { IFlight } from '../utils/common/entities/flight.entity';
import { IFlights } from './entities/flights.interface';
import { FlightRepository } from './flights.repository';
import { convertFlightModelToIFlight } from '../utils/convertFlightModelToIFlight';
import { IItinerary } from '../utils/common/itinerary.entity';

export class FlightsService implements IFlights {
  constructor(private readonly flightRepository: FlightRepository) {}

  getFlights = async (
    searchParams: IFlightSearchParams
  ): Promise<IItinerary> => {
    const departureFlights = await this.flightRepository.findFlights(
      searchParams.departureDate,
      searchParams.departureAirportId,
      searchParams.arrivalAirportId,
      searchParams.numberOfPassengers
    );

    const returnFlights = searchParams.returnDate
      ? await this.flightRepository.findFlights(
          searchParams.returnDate,
          searchParams.arrivalAirportId,
          searchParams.departureAirportId,
          searchParams.numberOfPassengers
        )
      : [];

    const itinerary: IItinerary = {
      departureFlights: departureFlights.map((flight) => {
        return convertFlightModelToIFlight(flight);
      }),
      returnFlights:
        returnFlights.length > 0
          ? returnFlights.map((flight) => {
              return convertFlightModelToIFlight(flight);
            })
          : [],
    };

    return itinerary;
  };

  getAllFlights = async (): Promise<IFlight[]> => {
    const flights = await this.flightRepository.findAllFlights();

    const foundFlights: IFlight[] = flights.map((flight) => {
      return convertFlightModelToIFlight(flight);
    });

    return foundFlights;
  };
}
