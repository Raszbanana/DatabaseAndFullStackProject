import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: 'passengers'})
export class PassengerMysqlEntity {
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
