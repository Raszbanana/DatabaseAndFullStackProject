import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FlightMysqlEntity } from 'src/mysql-db-entities/flight/flight.entity';

import { FlightSearchService } from './flight-search.service';
import { FlightSearchController } from './flight-search.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { FlightMongooseModel, FlightSchema } from 'src/mongoose-models/flight/flight.schema';

@Module({
  imports: [TypeOrmModule.forFeature([FlightMysqlEntity]),  MongooseModule.forFeature([{ name: FlightMongooseModel.name, schema: FlightSchema }]),],
  providers: [FlightSearchService],
  controllers: [FlightSearchController],
  exports: [FlightSearchService],
})
export class FlightSearchModule {}
