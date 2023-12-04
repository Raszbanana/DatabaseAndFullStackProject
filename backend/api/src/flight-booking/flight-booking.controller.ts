import { Body, Controller, Post } from '@nestjs/common';

import { FlightBookingService } from './flight-Booking.service';
import { IFlightBookingParams } from './utils/common/flight-booking-params.interface';

@Controller('flight-Booking')
export class FlightBookingController {
  constructor(private flightBookingService: FlightBookingService) {}

  @Post()
  BookingFlights(@Body() flightBookingParams: IFlightBookingParams) {
    return this.flightBookingService.bookFlight(flightBookingParams);
  }
}