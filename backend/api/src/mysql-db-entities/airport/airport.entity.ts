import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Airport {
  @PrimaryGeneratedColumn()
  airportId: number;

  @Column()
  airportCode: string;

  @Column()
  city: string;

  @Column()
  country: string;
}
