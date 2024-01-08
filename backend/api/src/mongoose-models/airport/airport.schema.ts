import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'airports' })
export class AirportMongooseModel {
  @Prop()
  airportId: number;

  @Prop()
  airportCode: string;

  @Prop()
  city: string;

  @Prop()
  country: string;
}

export type AirportDocument = AirportMongooseModel & Document;
export const AirportSchema = SchemaFactory.createForClass(AirportMongooseModel);
