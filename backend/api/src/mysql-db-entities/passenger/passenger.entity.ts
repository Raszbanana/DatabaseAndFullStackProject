import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Passenger {
  @PrimaryGeneratedColumn()
  passengerId: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  passportNumber: string;

  @Column()
  nationality: string;
}
