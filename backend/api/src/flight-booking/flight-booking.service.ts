import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BookingMysqlEntity } from 'src/mysql-db-entities/booking/booking.entity';

import { IFlightBookingParams } from './utils/common/flight-booking-params.interface';

@Injectable()
export class FlightBookingService {
  constructor(
    @InjectRepository(BookingMysqlEntity)
    private readonly bookingRepository: Repository<BookingMysqlEntity>,
  ) {}

  async bookFlight(
    flightBookingParams: IFlightBookingParams,
  ): Promise<BookingMysqlEntity[]> {
    // Setup query for stored procedure
    try {
      const query = 'CALL CreateBooking(?, ?, ?, ?, ?, @bookingReference)';

      await this.bookingRepository.query(query, [
        flightBookingParams.firstName,
        flightBookingParams.lastName,
        flightBookingParams.passportNumber,
        flightBookingParams.nationality,
        flightBookingParams.flightNumber,
      ]);

      const result = await this.bookingRepository.query(
        'SELECT @bookingReference as bookingReference',
      );

      console.log(result[0].bookingReference);
      return result[0].bookingReference;
    } catch (error) {
      console.log(error);
    }
  }

  getBooking(bookingReference: string): Promise<BookingMysqlEntity[]> {
    return this.bookingRepository.find({
      where: { bookingReference },
    });
  }
}
