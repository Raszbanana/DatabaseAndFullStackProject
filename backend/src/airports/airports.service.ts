import { AirportModel } from '../utils/common/models/airport.model';
import { AirportsRepositoryService } from './airports-repository.service';
import { IAirports } from './entities/airport.interface';

export class AirportsService implements IAirports {
  constructor(
    private readonly airportsRepositoryService: AirportsRepositoryService
  ) {}

  getAllAirports = async (): Promise<AirportModel[]> => {
    const airports = await this.airportsRepositoryService.findAllAirports();

    return airports;
  };
}
