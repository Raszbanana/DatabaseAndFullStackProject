import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Booking } from 'src/mysql-db-entities/booking/booking.entity';

import { FlightBookingService } from './flight-Booking.service';
import { FlightBookingController } from './flight-booking.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Booking])],
  providers: [FlightBookingService],
  controllers: [FlightBookingController],
  exports: [FlightBookingService],
})
export class FlightBookingModule {}
