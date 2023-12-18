import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { MongooseModule } from '@nestjs/mongoose';

import { AirportMysqlEntity } from 'src/mysql-db-entities/airport/airport.entity';
// import { AirportMongooseModel, AirportSchema } from 'src/mongoose-models/airport/airport.schema';

import { AirportService } from './airports.service';
import { AirportController } from './airports.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([AirportMysqlEntity]),
    // MongooseModule.forFeature([{ name: AirportMongooseModel.name, schema: AirportSchema }]),
  ],
  providers: [AirportService],
  controllers: [AirportController],
  exports: [AirportService],
})
export class AirportModule {}
