"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const flights_service_1 = require("../flights/flights.service");
const flightsRouter = (0, express_1.Router)();
const flightsService = new flights_service_1.FlightsService();
flightsRouter.get('/', (req, res) => {
    flightsService
        .getAllFlights()
        .then((flights) => {
        res.send(flights).status(200);
    })
        .catch((error) => {
        res.send(error.message).status(400);
    });
});
exports.default = flightsRouter;
