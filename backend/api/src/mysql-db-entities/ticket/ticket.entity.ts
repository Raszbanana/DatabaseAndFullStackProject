import { Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';
import { Passenger } from '../passenger/passenger.entity';
import { BookingMysqlEntity } from '../booking/booking.entity';
import { Flight } from '../flight/flight.entity';

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn()
  ticketId: number;

  @ManyToOne(() => Passenger)
  @JoinColumn({ name: 'passengerId' })
  passengerId: Passenger;

  @ManyToOne(() => BookingMysqlEntity)
  @JoinColumn({ name: 'bookingId' })
  bookingId: BookingMysqlEntity;

  @ManyToOne(() => Flight)
  @JoinColumn({ name: 'flightId' })
  flightId: Flight;
}