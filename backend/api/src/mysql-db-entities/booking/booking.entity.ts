import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'bookings'})
export class BookingMysqlEntity {
  @PrimaryGeneratedColumn()
  bookingId: number;

  @Column()
  bookingReference: string;
}
