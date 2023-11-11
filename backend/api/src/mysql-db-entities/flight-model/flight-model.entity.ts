import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FlightModel {
  @PrimaryGeneratedColumn()
  flightId: number;

  @Column()
  flightNumber: string;

  @Column()
  departureAirportId: number;

  @Column()
  arrivalAirportId: number;

  @Column()
  departureDateTime: Date;

  @Column()
  arrivalDateTime: Date;
}
