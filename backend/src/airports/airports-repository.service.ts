import db from '../db/connections';
import { AirportModel } from '../utils/common/models/airport.model';
import { IAirportsRepository } from './entities/airports-repository.interface';

export class AirportsRepositoryService implements IAirportsRepository {
  airportsRepository = db.getRepository(AirportModel);

  findAllAirports = async (): Promise<AirportModel[]> => {
    try {
      const airports = await this.airportsRepository.find();

      return airports;
    } catch (error) {
      console.error('Error fetching airports:', error);
      throw error;
    }
  };
}
