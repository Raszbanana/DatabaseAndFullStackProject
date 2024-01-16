import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: 'airports'})
export class AirportMysqlEntity {
  @PrimaryGeneratedColumn()
  airportId: number;

  @Column()
  airportCode: string;

  @Column()
  locationId: string;
}
