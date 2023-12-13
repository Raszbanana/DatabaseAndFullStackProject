import { Controller, Get } from "@nestjs/common";

import { Airport } from "src/mysql-db-entities/airport/airport.entity";
import { AirportService } from "./airports.service";

@Controller('airports')
export class AirportController {
  constructor(private readonly airportService: AirportService) {}

  @Get()
  getAirports(): Promise<Airport[]> {
    return this.airportService.getAirports();
  }
}