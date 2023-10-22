"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlightModel = void 0;
const typeorm_1 = require("typeorm");
const airport_model_1 = require("./airport.model");
let FlightModel = class FlightModel {
    flightId;
    flightNumber;
    departureAirport;
    arrivalAirport;
    departureDateTime;
    arrivalDateTime;
    availableSeats;
};
exports.FlightModel = FlightModel;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], FlightModel.prototype, "flightId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], FlightModel.prototype, "flightNumber", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => airport_model_1.AirportModel, { eager: true }),
    (0, typeorm_1.JoinColumn)({ name: 'departureAirportId' }) // Specify the foreign key column name
    ,
    __metadata("design:type", airport_model_1.AirportModel)
], FlightModel.prototype, "departureAirport", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => airport_model_1.AirportModel, { eager: true }),
    (0, typeorm_1.JoinColumn)({ name: 'arrivalAirportId' }) // Specify the foreign key column name
    ,
    __metadata("design:type", airport_model_1.AirportModel)
], FlightModel.prototype, "arrivalAirport", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], FlightModel.prototype, "departureDateTime", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], FlightModel.prototype, "arrivalDateTime", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], FlightModel.prototype, "availableSeats", void 0);
exports.FlightModel = FlightModel = __decorate([
    (0, typeorm_1.Entity)('flights')
], FlightModel);
