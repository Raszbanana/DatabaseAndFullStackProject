import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Flight {
  @PrimaryGeneratedColumn()
  flightId: number;

  @Column()
  airportCode: string;

  @Column()
  departureDateTime: Date;

  @Column()
  arrivalDateTime: Date;

  @Column()
  flightNumber: string;

  @Column()
  availableSeats: number;

  @Column()
  departureAirportId: number;

  @Column()
  arrivalAirportId: number;
}
