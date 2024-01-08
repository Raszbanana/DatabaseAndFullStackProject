import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FlightMysqlEntity } from 'src/mysql-db-entities/flight/flight.entity';

import { FlightSearchService } from './flight-search.service';
import { FlightSearchController } from './flight-search.controller';

@Module({
  imports: [TypeOrmModule.forFeature([FlightMysqlEntity])],
  providers: [FlightSearchService],
  controllers: [FlightSearchController],
  exports: [FlightSearchService],
})
export class FlightSearchModule {}
