import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: 'flights'})
export class FlightMysqlEntity {
  @PrimaryGeneratedColumn()
  flightId: number;

  @Column()
  flightNumber: string;

  @Column()
  departureAirportId: number;

  @Column()
  arrivalAirportId: number;

  @Column()
  airportCode: string;
  
  @Column()
  departureDateTime: Date;
  
  @Column()
  arrivalDateTime: Date;
  
  @Column()
  availableSeats: number;

}
