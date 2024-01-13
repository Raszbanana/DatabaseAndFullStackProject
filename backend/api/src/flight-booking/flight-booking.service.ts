import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import neo4j from 'neo4j-driver';

import { BookingMysqlEntity } from 'src/mysql-db-entities/booking/booking.entity';

import { IFlightBookingParams } from './utils/common/flight-booking-params.interface';
import { generateBookingReference } from './utils/common/generate-booking-ref';

import { BookingMongooseModel } from 'src/mongoose-models/booking/booking.schema';
import { TicketMongooseModel } from 'src/mongoose-models/ticket/ticket.schema';
import { IPassenger } from 'src/mongoose-models/passenger/passenger.interface';
import { generateRandomString } from './utils/get-random-string';

@Injectable()
export class FlightBookingService {
  constructor(
    @InjectRepository(BookingMysqlEntity)
    private readonly bookingRepository: Repository<BookingMysqlEntity>,
    @InjectModel(BookingMongooseModel.name)
    private readonly bookingModel: Model<BookingMongooseModel>,
    @InjectModel(TicketMongooseModel.name)
    private readonly ticketModel: Model<TicketMongooseModel>,
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
      nationality: flightBookingParams.nationality,
    };

    const booking = new this.bookingModel({
      bookingReference: generateBookingReference(),
    });

    await booking.save();
    const flightObjectId = new mongoose.Types.ObjectId(
      flightBookingParams.flightId,
    );

    const ticket = new this.ticketModel({
      bookingId: booking._id,
      flightId: flightObjectId,
      passenger,
    });

    await ticket.save();

    return booking.bookingReference;
  }

  async getBookingMongoose(bookingReference: string): Promise<any> {
    const booking = await this.bookingModel.findOne({ bookingReference });

    const ticket = await this.ticketModel.findOne(
      { bookingId: booking._id },
      { _id: 0, __v: 0 },
    );

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

    return { ticket, flight };
  }
  async getBookingFromNeo4j(bookingReference: string): Promise<void> {
    const driver = neo4j.driver(
      'neo4j+s://b04c6451.databases.neo4j.io',
      neo4j.auth.basic('neo4j', 'P0pIXiJ8QGPMYDQmKoqN5lUHh9LMr0IVEEHWcNr8MVI'),
    );

    const session = driver.session();

    const result = await session.run(
      'MATCH (b:Booking) WHERE b.bookingReference = $bookingReference RETURN a LIMIT 25',
      {
        bookingReference,
      },
    );

    console.log(result.records.map((record) => record.get('b').properties));

    // end the session
    await session.close();
  }

  async createBookingNeo4j(bookingParams: IFlightBookingParams): Promise<void> {
    const driver = neo4j.driver(
      'neo4j+s://b04c6451.databases.neo4j.io',
      neo4j.auth.basic('neo4j', 'P0pIXiJ8QGPMYDQmKoqN5lUHh9LMr0IVEEHWcNr8MVI'),
    );

    const session = driver.session();

    const passenger = await session.run(
      `
      CREATE (passenger:Passenger {
        firstName: $firstName,
        lastName: $lastName,
        passportNumber: $passportNumber,
        nationality: $nationality
      })
      RETURN passenger
      `,
      {
        firstName: bookingParams.firstName,
        lastName: bookingParams.lastName,
        passportNumber: bookingParams.passportNumber,
        nationality: bookingParams.nationality,
      },
    );

    const booking = await session.run(
      `
      CREATE (booking:Booking {
        bookingReference: $bookingReference
      })
      RETURN booking
      `,
      {
        bookingReference: generateRandomString(10),
      },
    );

    const passengerId = passenger.records[0].get('passenger').identity.low;
    const bookingReference =
      booking.records[0].get('booking').properties.bookingReference;

    const ticket = await session.run(
      `
        MATCH (flight:Flight) WHERE ID(flight) = $flightId
        MATCH (passenger:Passenger) WHERE ID(passenger) = $passengerId
        MATCH (booking:Booking {bookingReference: $bookingReference})
        
        CREATE (ticket:Ticket {
          bookingReference: $bookingReference
        })
        
        CREATE (ticket)-[:FOR_PASSENGER]->(passenger)
        CREATE (ticket)-[:FOR_BOOKING]->(booking)
        CREATE (ticket)-[:FOR_FLIGHT]->(flight)
        
        RETURN ticket, flight, passenger, booking
        `,
      {
        flightId: bookingParams.flightId,
        passengerId,
        bookingReference,
      },
    );

    console.log(
      ticket.records.map((record) => record.get('ticket').properties),
    );

    // end the session
    await session.close();
  }
}
