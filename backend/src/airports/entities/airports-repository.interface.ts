import { AirportModel } from '../../utils/common/models/airport.model';

export interface IAirportsRepository {
  findAllAirports(): Promise<AirportModel[]>;
}
