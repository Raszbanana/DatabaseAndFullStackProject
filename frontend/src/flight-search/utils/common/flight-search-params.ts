import { IAirport } from './airport.interface';

export interface IFlightSearchParams {
  departureAirport: IAirport;
  arrivalAirport: IAirport;
  departureDate: string;
  returnDate?: string;
  numberOfPassengers: number;
}
