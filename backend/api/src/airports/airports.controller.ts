import { Controller, Get } from "@nestjs/common";

import { AirportMysqlEntity } from "src/mysql-db-entities/airport/airport.entity";
import { AirportService } from "./airports.service";
import { INeo4jAirport } from "src/neo4j-model/airport-neo4j.interface";

@Controller('airports')
export class AirportController {
  constructor(private readonly airportService: AirportService) {}

  @Get('mysql')
  getAirports(): Promise<AirportMysqlEntity[]> {
    return this.airportService.getAirportsFromMysql();
  }

  @Get('mongoose')
  getAirportsFromMongoose(): Promise<any> {
    return this.airportService.getAirportsFromMongoose();
  }

  @Get('neo4j')
  getAirportsFromNeo4j(): Promise<INeo4jAirport[]> {
    return this.airportService.getAirportsFromNeo4j();
  }
}