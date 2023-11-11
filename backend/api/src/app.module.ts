import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { Airport } from './mysql-db-entities/airport/airport.entity';
import { Booking } from './mysql-db-entities/booking/booking.entity';
import { Flight } from './mysql-db-entities/flight/flight.entity';
import { FlightModel } from './mysql-db-entities/flight-model/flight-model.entity';
import { Ticket } from './mysql-db-entities/ticket/ticket.entity';
import { Passenger } from './mysql-db-entities/passenger/passenger.entity';

import { FlightSearchModule } from './flight-search/flight-search.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      // isGlobal: true, // no need to import into other modules
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('MYSQL_DB_HOST'),
        port: configService.get<number>('MYSQL_DB_PORT'),
        username: configService.get<string>('MYSQL_DB_USERNAME'),
        password: configService.get<string>('MYSQL_DB_PASSWORD'),
        database: configService.get<string>('MYSQL_DB_NAME'),
        entities: [Airport, Booking, Flight, FlightModel, Passenger, Ticket],
        /* Nestjs documentation says to not set synchronize to true in production
           https://docs.nestjs.com/techniques/database
        */
        synchronize: false,
      }),
    }),
    FlightSearchModule,
  ],
  providers: [],
})
export class AppModule {}
