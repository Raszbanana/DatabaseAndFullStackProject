import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IPassenger } from './passenger.interface';

@Schema({ collection: 'passengers'})
export class PassengerMongooseModel implements IPassenger {
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
