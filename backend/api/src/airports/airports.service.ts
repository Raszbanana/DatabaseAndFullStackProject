import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import neo4j from 'neo4j-driver';

import { AirportMysqlEntity } from 'src/mysql-db-entities/airport/airport.entity';
import { AirportMongooseModel } from 'src/mongoose-models/airport/airport.schema';
import { INeo4jAirport } from 'src/neo4j-model/airport-neo4j.interface';

@Injectable()
export class AirportService {
  constructor(
    @InjectRepository(AirportMysqlEntity)
    private readonly airportRepository: Repository<AirportMysqlEntity>,
    @InjectModel(AirportMongooseModel.name)
    private readonly airportModel: Model<AirportMongooseModel>,
  ) {}

  async getAirportsFromMysql(): Promise<AirportMysqlEntity[]> {
    return await this.airportRepository.find();
  }

  async getAirportsFromMongoose(): Promise<AirportMongooseModel[]> {
    return await this.airportModel.find().exec();
  }

  async getAirportsFromNeo4j(): Promise<INeo4jAirport[]> {
    try {
      const driver = neo4j.driver(
        'neo4j+s://b04c6451.databases.neo4j.io',
        neo4j.auth.basic(
          'neo4j',
          'P0pIXiJ8QGPMYDQmKoqN5lUHh9LMr0IVEEHWcNr8MVI',
        ),
      );

      const session = driver.session();

      const result = await session.run(
        `
        MATCH (airport:Airport) 
        MATCH (airport)-[:IS_LOCATED_IN]-(airportLocation:Location)
        Return airport, airportLocation
        `,
      );

      const airports = result.records.map(
        (record) => record.get('airport').properties,
      );
      const locations = result.records.map(
        (record) => record.get('airportLocation').properties,
      );

      const airportObjects = airports.map((airport, index) => {
        return {
          airportId: airport.airportId.low,
          airportCode: airport.airportCode,
          city: locations[index].city,
          country: locations[index].country,
        };
      });

      console.log(airportObjects);

      // end the session
      await session.close();
      return airportObjects;
    } catch (error) {}
  }
}
