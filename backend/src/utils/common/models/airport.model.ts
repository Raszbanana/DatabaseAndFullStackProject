import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('airports')
export class AirportModel {
  @PrimaryGeneratedColumn()
  airportId!: number;

  @Column()
  airportCode!: string;

  @Column()
  city!: string;

  @Column()
  country!: string;
}
