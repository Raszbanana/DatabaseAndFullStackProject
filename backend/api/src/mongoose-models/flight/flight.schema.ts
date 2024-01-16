import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'flights'})
export class FlightMongooseModel {
  @Prop()
  flightId: number;

  @Prop()
  flightNumber: string;

  @Prop()
  departureAirportId: number;

  @Prop()
  arrivalAirportId: number;

  @Prop()
  airportCode: string;

  @Prop()
  departureDateTime: Date;

  @Prop()
  arrivalDateTime: Date;
}

export type FlightDocument = FlightMongooseModel & Document;
export const FlightSchema = SchemaFactory.createForClass(FlightMongooseModel);
