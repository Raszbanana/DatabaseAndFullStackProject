import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { IPassenger } from '../passenger/passenger.interface';

@Schema({ collection: 'tickets'})
export class TicketMongooseModel {
  @Prop({ type: Object })
  passenger: IPassenger;

  @Prop({ type: Types.ObjectId })
  bookingId: Types.ObjectId;

  @Prop({ type: Types.ObjectId })
  flightId: Types.ObjectId;
}

export type TicketDocument = TicketMongooseModel & Document;
export const TicketSchema = SchemaFactory.createForClass(TicketMongooseModel);
