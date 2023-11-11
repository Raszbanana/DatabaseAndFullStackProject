import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  bookingId: number;

  @Column()
  bookingReference: string;
}
