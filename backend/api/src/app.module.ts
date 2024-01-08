// Libary Modules
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

// Mysql Models
import { AirportMysqlEntity } from './mysql-db-entities/airport/airport.entity';
import { BookingMysqlEntity } from './mysql-db-entities/booking/booking.entity';
import { FlightMysqlEntity } from './mysql-db-entities/flight/flight.entity';
import { TicketMysqlEntity } from './mysql-db-entities/ticket/ticket.entity';
import { PassengerMysqlEntity } from './mysql-db-entities/passenger/passenger.entity';

// Internal Modules
import { FlightSearchModule } from './flight-search/flight-search.module';
import { FlightBookingModule } from './flight-booking/flight-booking.module';
import { AirportModule } from './airports/airports.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      // isGlobal: true, // no need to import into other modules
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
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
        entities: [AirportMysqlEntity, BookingMysqlEntity, FlightMysqlEntity, PassengerMysqlEntity, TicketMysqlEntity],
        /* Nestjs documentation says to not set synchronize to true in production
           https://docs.nestjs.com/techniques/database
        */
        synchronize: false,
      }),
    }),
    FlightSearchModule,
    FlightBookingModule,
    AirportModule,
  ],
  providers: [],
})
export class AppModule {}
