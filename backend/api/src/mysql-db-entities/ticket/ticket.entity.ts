import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn()
  ticketId: number;

  @Column()
  passengerId: number;

  @Column()
  bookingId: number;

  @Column()
  flightId: number;
}
