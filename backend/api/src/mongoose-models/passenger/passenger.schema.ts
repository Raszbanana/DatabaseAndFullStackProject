import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class PassengerMongooseModel {
  @Prop()
  passengerId: number;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  passportNumber: string;

  @Prop()
  nationality: string;
}

export type PassengerDocument = PassengerMongooseModel & Document;
export const PassengerSchema = SchemaFactory.createForClass(PassengerMongooseModel);
