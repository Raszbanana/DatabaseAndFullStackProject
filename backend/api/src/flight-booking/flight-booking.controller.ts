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
}
