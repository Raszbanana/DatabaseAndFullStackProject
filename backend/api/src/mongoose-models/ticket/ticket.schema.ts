import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { PassengerMongooseModel } from '../passenger/passenger.schema';
import { BookingMongooseModel } from '../booking/booking.schema';
import { FlightMongooseModel } from '../flight/flight.schema';

@Schema()
export class TicketMongooseModel {
  @Prop()
  ticketId: number;

  @Prop({ type: PassengerMongooseModel })
  passengerId: PassengerMongooseModel;

  @Prop({ type: BookingMongooseModel })
  bookingId: BookingMongooseModel;

  @Prop({ type: FlightMongooseModel })
  flightId: FlightMongooseModel;
}

export type TicketDocument = TicketMongooseModel & Document;
export const TicketSchema = SchemaFactory.createForClass(TicketMongooseModel);
