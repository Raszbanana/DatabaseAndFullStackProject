import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';

import { BookingMysqlEntity } from 'src/mysql-db-entities/booking/booking.entity';

import { IFlightBookingParams } from './utils/common/flight-booking-params.interface';
import { generateBookingReference } from './utils/common/generate-booking-ref';

import { BookingMongooseModel } from 'src/mongoose-models/booking/booking.schema';
import { TicketMongooseModel } from 'src/mongoose-models/ticket/ticket.schema';
import { IPassenger } from 'src/mongoose-models/passenger/passenger.interface';

@Injectable()
export class FlightBookingService {
  constructor(
    @InjectRepository(BookingMysqlEntity)
    private readonly bookingRepository: Repository<BookingMysqlEntity>,
    @InjectModel(BookingMongooseModel.name) private readonly bookingModel: Model<BookingMongooseModel>,
    @InjectModel(TicketMongooseModel.name) private readonly ticketModel: Model<TicketMongooseModel>,
  ) {}

  async bookFlight(
    flightBookingParams: IFlightBookingParams,
  ): Promise<BookingMysqlEntity[]> {
    // Setup query for stored procedure
    try {
      const query = 'CALL CreateBooking(?, ?, ?, ?, ?, @bookingReference)';
      console.log(flightBookingParams);
      await this.bookingRepository.query(query, [
        flightBookingParams.firstName,
        flightBookingParams.lastName,
        flightBookingParams.passportNumber,
        flightBookingParams.nationality,
        flightBookingParams.flightId,
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

  async bookFlightMongoose(
    flightBookingParams: IFlightBookingParams,
  ): Promise<string> {
    const passenger: IPassenger = {
      firstName: flightBookingParams.firstName,
      lastName: flightBookingParams.lastName,
      passportNumber: flightBookingParams.passportNumber,
      nationality: flightBookingParams.nationality
    }

    const booking = new this.bookingModel({
      bookingReference: generateBookingReference(),
    })

    await booking.save();
    const flightObjectId = new mongoose.Types.ObjectId(flightBookingParams.flightId);

    const ticket = new this.ticketModel({
      bookingId: booking._id,
      flightId: flightObjectId,
      passenger,
    })

    await ticket.save();

    return booking.bookingReference;
 }

 async getBookingMongoose(bookingReference: string): Promise<any> {
  const booking = await this.bookingModel.findOne({ bookingReference });

  const ticket = await this.ticketModel.findOne({ bookingId: booking._id }, { _id: 0, __v: 0 });

  const flight = await this.ticketModel.aggregate([
    {
      $match: {
        bookingId: booking._id,
      },
    },
    {
      $lookup: {
        from: 'flights',
        localField: 'flightId',
        foreignField: '_id',
        as: 'flight',
      },
    },
    {
      $unwind: '$flight',
    },
    {
      $project: {
        _id: 0,
        flight: 1,
      },
    },
  ]);

  
  return {ticket, flight};
 }
}
