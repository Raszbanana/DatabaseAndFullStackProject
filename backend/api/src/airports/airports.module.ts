import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Airport } from 'src/mysql-db-entities/airport/airport.entity';
import { AirportService } from './airports.service';
import { AirportController } from './airports.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Airport])],
  providers: [AirportService],
  controllers: [AirportController],
  exports: [AirportService],
})
export class AirportModule {}
