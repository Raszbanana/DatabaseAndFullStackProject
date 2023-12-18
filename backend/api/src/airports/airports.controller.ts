import { Controller, Get } from "@nestjs/common";

import { AirportMysqlEntity } from "src/mysql-db-entities/airport/airport.entity";
import { AirportService } from "./airports.service";

@Controller('airports')
export class AirportController {
  constructor(private readonly airportService: AirportService) {}

  @Get('mysql')
  getAirports(): Promise<AirportMysqlEntity[]> {
    return this.airportService.getAirportsFromMysql();
  }

  // @Get('mongoose')
  // getAirportsFromMongoose(): Promise<any> {
  //   return this.airportService.getAirportsFromMongoose();
  // }
}