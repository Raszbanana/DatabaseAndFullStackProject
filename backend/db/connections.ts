import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { FlightModel } from '../models/flight.model';
import { AirportModel } from '../models/airport.model';

dotenv.config();

const database = process.env.DATABASE_NAME || 'flight_system';
const username = process.env.DATABASE_USERNAME || '';
const password = process.env.DATABASE_PASSWORD;

export const db = new DataSource({
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: 3306,
  username: username,
  password: password,
  database: database,
  synchronize: true,
  logging: false,
  entities: [FlightModel, AirportModel],
  subscribers: [],
  migrations: [],
});

export default db;
