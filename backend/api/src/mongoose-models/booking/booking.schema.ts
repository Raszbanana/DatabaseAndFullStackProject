import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class BookingMongooseModel {
  @Prop()
  bookingId: number;

  @Prop()
  bookingReference: string;
}

export type BookingDocument = BookingMongooseModel & Document;
export const BookingSchema = SchemaFactory.createForClass(BookingMongooseModel);
