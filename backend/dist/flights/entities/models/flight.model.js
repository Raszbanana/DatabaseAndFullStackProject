"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connections_1 = __importDefault(require("../../../db/connections"));
class FlightModel extends sequelize_1.Model {
    flightId;
    flightNumber;
    departureDateTime;
    departureAirportId;
    arrivalAirportId;
    arrivalDateTime;
}
FlightModel.init({
    flightId: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    flightNumber: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    departureAirportId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    arrivalAirportId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    departureDateTime: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    arrivalDateTime: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
}, {
    sequelize: connections_1.default,
    modelName: 'Flight',
    tableName: 'flights',
    timestamps: false, // Include timestamps (createdAt and updatedAt)
});
exports.default = FlightModel;
