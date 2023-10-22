import { AirportModel } from '../../utils/common/models/airport.model';

export interface IAirports {
  getAllAirports(): Promise<AirportModel[]>;
}
