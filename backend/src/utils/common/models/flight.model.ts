import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AirportModel } from './airport.model';

@Entity('flights')
export class FlightModel {
  @PrimaryGeneratedColumn()
  flightId!: number;

  @Column()
  flightNumber!: string;

  @ManyToOne(() => AirportModel, { eager: true })
  @JoinColumn({ name: 'departureAirportId' }) // Specify the foreign key column name
  departureAirport!: AirportModel;

  @ManyToOne(() => AirportModel, { eager: true })
  @JoinColumn({ name: 'arrivalAirportId' }) // Specify the foreign key column name
  arrivalAirport!: AirportModel;

  @Column()
  departureDateTime!: Date;

  @Column()
  arrivalDateTime!: Date;

  @Column()
  availableSeats!: Number;
}
