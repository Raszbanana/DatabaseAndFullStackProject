import { config } from 'dotenv';
import db from './db/connections';
import express from 'express';
import flightsRouter from './routers/flightsRouter';
import 'reflect-metadata';
import airportRouter from './routers/airportsRouter';

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
