import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import neo4j from 'neo4j-driver'

import { AirportMysqlEntity } from "src/mysql-db-entities/airport/airport.entity";
import { AirportMongooseModel } from "src/mongoose-models/airport/airport.schema";

@Injectable()
export class AirportService {
  constructor(
    @InjectRepository(AirportMysqlEntity) 
    private readonly airportRepository: Repository<AirportMysqlEntity>,
    @InjectModel(AirportMongooseModel.name) private readonly airportModel: Model<AirportMongooseModel>,
  ) {}

  async getAirportsFromMysql(): Promise<AirportMysqlEntity[]> {
    return await this.airportRepository.find();
  }

  async getAirportsFromMongoose(): Promise<AirportMongooseModel[]> {
    return await this.airportModel.find().exec();
  }

  async getAirportsFromNeo4j(): Promise<void> {
    const driver = neo4j.driver(
      'neo4j+s://b04c6451.databases.neo4j.io',
      neo4j.auth.basic('neo4j', 'P0pIXiJ8QGPMYDQmKoqN5lUHh9LMr0IVEEHWcNr8MVI'),
    )

    const session = driver.session()

    const result = await session.run(
      'MATCH (a:Airport) RETURN a LIMIT 25',
    )

    console.log(result.records.map(record => record.get('a').properties))
  }
}