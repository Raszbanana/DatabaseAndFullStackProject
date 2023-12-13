import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Airport } from "src/mysql-db-entities/airport/airport.entity";

@Injectable()
export class AirportService {
  constructor(
    @InjectRepository(Airport) 
    private readonly airportRepository: Repository<Airport>,
  ) {}

 async getAirports(): Promise<Airport[]> {
    return await this.airportRepository.find();
  }
}