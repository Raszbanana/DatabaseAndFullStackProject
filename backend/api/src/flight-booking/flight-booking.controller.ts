import { Body, Controller, Get, Post, Query } from '@nestjs/common';

import { FlightBookingService } from './flight-booking.service';
import { IFlightBookingParams } from './utils/common/flight-booking-params.interface';

@Controller('flight-booking')
export class FlightBookingController {
  constructor(private flightBookingService: FlightBookingService) {}

  @Post('mysql')
  BookingFlights(@Body() flightBookingParams: IFlightBookingParams) {
    return this.flightBookingService.bookFlight(flightBookingParams);
  }

  // @Post('mysql/multiple-passengers')
  // BookingFlightsForMultiplePassengers(
  //   @Body() flightBookingParams: IFlightBookingParams[],
  // ) {
  //   return this.flightBookingService.bookFlightForMultiplePassengers(
  //     flightBookingParams,
  //   );
  // }

  @Get('mysql')
  getBooking(@Query('bookingReference') bookingReference: string) {
    return this.flightBookingService.getBooking(bookingReference);
  }

  @Post('mongoose')
  BookingFlightsMongoose(
    @Body() flightBookingParams: IFlightBookingParams,
  ): Promise<string> {
    return this.flightBookingService.bookFlightMongoose(flightBookingParams);
  }

  @Get('mongoose')
  getBookingMongoose(@Query('bookingReference') bookingReference: string) {
    return this.flightBookingService.getBookingMongoose(bookingReference);
  }

  @Post('neo4j')
  bookFlight(@Body() flightBookingParams: IFlightBookingParams) {
    return this.flightBookingService.bookFlightNeo4j(flightBookingParams);
  }

  @Get('neo4j')
  getBookingNeo4j(@Query('bookingReference') bookingReference: string) {
    return this.flightBookingService.getBookingNeo4j(bookingReference);
  }
}
