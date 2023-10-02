import { AirportModel } from '../../models/airport.model';

export interface IAirportsRepository {
  findAllAirports(): Promise<AirportModel[]>;
}
