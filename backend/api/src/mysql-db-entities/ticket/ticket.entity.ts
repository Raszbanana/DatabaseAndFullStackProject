import { Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';
import { PassengerMysqlEntity } from '../passenger/passenger.entity';
import { BookingMysqlEntity } from '../booking/booking.entity';
import { FlightMysqlEntity } from '../flight/flight.entity';

@Entity({name: 'tickets'})
export class TicketMysqlEntity {
  @PrimaryGeneratedColumn()
  ticketId: number;

  @ManyToOne(() => PassengerMysqlEntity)
  @JoinColumn({ name: 'passengerId' })
  passengerId: PassengerMysqlEntity;

  @ManyToOne(() => BookingMysqlEntity)
  @JoinColumn({ name: 'bookingId' })
  bookingId: BookingMysqlEntity;

  @ManyToOne(() => FlightMysqlEntity)
  @JoinColumn({ name: 'flightId' })
  flightId: FlightMysqlEntity;
}