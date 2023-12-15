import { IAirport } from './airport.interface';

export interface IFlight {
  id: number;
  flightNumber: string;
  departureTime: string;
  arrivalTime: string;
  departureAirport?: IAirport;
  arrivalAirport?: IAirport;
  price: number;
}

export interface IFoundFlights {
  departureFlights: IFlight[];
  returnFlights: IFlight[];
}
