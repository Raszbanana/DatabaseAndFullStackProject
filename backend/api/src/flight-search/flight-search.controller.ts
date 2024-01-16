import { Controller, Get, Query } from '@nestjs/common';

import { FlightSearchService } from './flight-search.service';
import { IFlightSearchParams } from '../flight-search/utils/common/flight-search-params';

@Controller('flight-search')
export class FlightSearchController {
  constructor(private readonly flightSearchService: FlightSearchService) {}

  @Get('mysql')
  searchFlights(@Query() flightSearchParams: IFlightSearchParams) {
    return this.flightSearchService.getFlights(flightSearchParams);
  }

  @Get('neo4j')
  searchFlightsNeo4j(@Query() flightSearchParams: IFlightSearchParams) {
    return this.flightSearchService.getFlightsNeo4j(flightSearchParams);
  }

  @Get('mongoose')
  searchFlightsMongoose(@Query() flightSearchParams: IFlightSearchParams) {
    return this.flightSearchService.getFlightsMongoose(flightSearchParams);
  }
}
