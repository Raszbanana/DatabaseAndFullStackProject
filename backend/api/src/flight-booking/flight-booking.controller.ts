import { Body, Controller, Get, Post, Query } from '@nestjs/common';

import { FlightBookingService } from './flight-Booking.service';
import { IFlightBookingParams } from './utils/common/flight-booking-params.interface';

@Controller('flight-Booking')
export class FlightBookingController {
  constructor(private flightBookingService: FlightBookingService) {}

  @Post('mysql')
  BookingFlights(@Body() flightBookingParams: IFlightBookingParams) {
    return this.flightBookingService.bookFlight(flightBookingParams);
  }

  @Get('mysql')
  getBooking(@Query('bookingReference') bookingReference: string) {
    return this.flightBookingService.getBooking(bookingReference);
  }
}
