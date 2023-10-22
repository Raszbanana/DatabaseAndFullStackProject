import { config } from 'dotenv';
import express from 'express';
import db from './src/db/connections';
import airportRouter from './src/routers/airportsRouter';
import flightsRouter from './src/routers/flightsRouter';

config();

const app = express();

app.use(express.json());

app.use('/api/flights', flightsRouter);

app.use('/api/airports', airportRouter);

const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 3000;

db.initialize()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((err: unknown) => {
    console.log('Failed to sync db: ' + err);
  });
