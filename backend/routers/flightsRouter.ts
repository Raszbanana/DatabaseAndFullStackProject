import { Router, Request, Response } from 'express';
import { FlightsService } from '../flights/flights.service';

const flightsRouter = Router();

const flightsService: FlightsService = new FlightsService();

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
