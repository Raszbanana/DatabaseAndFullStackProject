import { AirportModel } from '../../models/airport.model';

export interface IAirports {
  getAllAirports(): Promise<AirportModel[]>;
}
