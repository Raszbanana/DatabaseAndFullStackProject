import { IAirport } from './airport.entity';

export interface IFlight {
  flightId: number;
  flightNumber: string;
  departureAirport: IAirport;
  arrivalAirport: IAirport;
  departureDateTime: Date;
  arrivalDateTime: Date;
}
