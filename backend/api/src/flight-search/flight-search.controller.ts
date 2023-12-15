import { Controller, Get, Query } from '@nestjs/common';

import { FlightSearchService } from './flight-search.service';
import { IFlightSearchParams } from '../flight-search/utils/common/flight-search-params';

@Controller('flight-search')
export class FlightSearchController {
  constructor(private readonly flightSearchService: FlightSearchService) {}

  @Get()
  searchFlights(@Query() flightSearchParams: IFlightSearchParams) {
    return this.flightSearchService.getFlights(flightSearchParams);
  }
}
