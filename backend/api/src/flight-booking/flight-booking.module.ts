import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';

import { BookingMysqlEntity } from 'src/mysql-db-entities/booking/booking.entity';

import { FlightBookingService } from './flight-booking.service';
import { FlightBookingController } from './flight-booking.controller';
import { BookingMongooseModel, BookingSchema } from 'src/mongoose-models/booking/booking.schema';
import { TicketMongooseModel, TicketSchema } from 'src/mongoose-models/ticket/ticket.schema';

@Module({
  imports: [
  TypeOrmModule.forFeature([BookingMysqlEntity]), 
  MongooseModule.forFeature([{ name: BookingMongooseModel.name, schema: BookingSchema }]),
  MongooseModule.forFeature([{ name: TicketMongooseModel.name, schema: TicketSchema }]),
],
  providers: [FlightBookingService],
  controllers: [FlightBookingController],
  exports: [FlightBookingService],
})
export class FlightBookingModule {}
