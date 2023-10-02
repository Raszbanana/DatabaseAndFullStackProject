import { Router, Request, Response } from 'express';

import { IFlightSearchParams } from '../flights/entities/flight-search-params.entity';
import { FlightsService } from '../flights/flights.service';

const flightsRouter = Router();

const flightsService: FlightsService = new FlightsService();

flightsRouter.get('/findRoute', (req: Request, res: Response) => {
  const searchParams: IFlightSearchParams = {
    departureAirportId: parseInt(req.query.departureAirportId as string),
    arrivalAirportId: parseInt(req.query.arrivalAirportId as string),
    departureDate: req.query.departureDate as string,
    returnDate: req.query.returnDate as string,
    numberOfPassengers: parseInt(req.query.numberOfPassengers as string),
  };

  flightsService
    .getFlights(searchParams)
    .then((flights) => {
      res.send(flights).status(200);
    })
    .catch((error) => {
      res.send(error.message).status(400);
    });
});

flightsRouter.get('/', (req: Request, res: Response) => {
  flightsService
    .getAllFlights()
    .then((flights) => {
      res.send(flights).status(200);
    })
    .catch((error) => {
      res.send(error.message).status(400);
    });
});

export default flightsRouter;
