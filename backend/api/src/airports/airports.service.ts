import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { AirportMysqlEntity } from "src/mysql-db-entities/airport/airport.entity";
import { AirportMongooseModel } from "src/mongoose-models/airport/airport.schema";

@Injectable()
export class AirportService {
  constructor(
    @InjectRepository(AirportMysqlEntity) 
    private readonly airportRepository: Repository<AirportMysqlEntity>,
    @InjectModel(AirportMongooseModel.name) private readonly airportModel: Model<AirportMongooseModel>
  ) {}

  async getAirportsFromMysql(): Promise<AirportMysqlEntity[]> {
    return await this.airportRepository.find();
  }

  async getAirportsFromMongoose(): Promise<AirportMongooseModel[]> {
    return await this.airportModel.find().exec();
  }
}