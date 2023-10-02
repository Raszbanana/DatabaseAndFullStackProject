import { Router, Request, Response } from 'express';
import { FlightsService } from '../flights/flights.service';
import { AirportsService } from '../airports/airports.service';

const airportRouter = Router();

const airportsService: AirportsService = new AirportsService();

airportRouter.get('/', (req: Request, res: Response) => {
  airportsService
    .getAllAirports()
    .then((airports) => {
      res.send(airports).status(200);
    })
    .catch((error) => {
      res.send(error.message).status(400);
    });
});

export default airportRouter;
