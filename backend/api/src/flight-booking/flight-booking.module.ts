import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BookingMysqlEntity } from 'src/mysql-db-entities/booking/booking.entity';

import { FlightBookingService } from './flight-Booking.service';
import { FlightBookingController } from './flight-booking.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BookingMongooseModel, BookingSchema } from 'src/mongoose-models/booking/booking.schema';

@Module({
  imports: [TypeOrmModule.forFeature([BookingMysqlEntity]), MongooseModule.forFeature([{ name: BookingMongooseModel.name, schema: BookingSchema }])],
  providers: [FlightBookingService],
  controllers: [FlightBookingController],
  exports: [FlightBookingService],
})
export class FlightBookingModule {}
