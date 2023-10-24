import { Router, Request, Response } from 'express';
import { AirportsService } from '../airports/airports.service';

const bookingRouter = Router();

bookingRouter.post('/', (req: Request, res: Response) => {
  console.log(req.params.bookings);
});

export default bookingRouter;
