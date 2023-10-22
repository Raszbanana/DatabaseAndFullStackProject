"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const airports_service_1 = require("../../airports/airports.service");
const airportRouter = (0, express_1.Router)();
const airportsService = new airports_service_1.AirportsService();
airportRouter.get('/', (req, res) => {
    airportsService
        .getAllAirports()
        .then((airports) => {
        res.send(airports).status(200);
    })
        .catch((error) => {
        res.send(error.message).status(400);
    });
});
exports.default = airportRouter;
