import { IFlight } from './common/entities/flight.entity';
import { FlightModel } from './common/models/flight.model';

export const convertFlightModelToIFlight = (
  flightModel: FlightModel
): IFlight => {
  const flight: IFlight = {
    flightId: flightModel.flightId,
    flightNumber: flightModel.flightNumber,
    departureAirport: {
      airportId: flightModel.departureAirport.airportId,
      airportCode: flightModel.departureAirport.airportCode,
      city: flightModel.departureAirport.city,
      country: flightModel.departureAirport.country,
    },
    arrivalAirport: {
      airportId: flightModel.arrivalAirport.airportId,
      airportCode: flightModel.arrivalAirport.airportCode,
      city: flightModel.arrivalAirport.city,
      country: flightModel.arrivalAirport.country,
    },
    departureDateTime: flightModel.departureDateTime,
    arrivalDateTime: flightModel.arrivalDateTime,
  };

  return flight;
};
