"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connections_1 = __importDefault(require("../../db/connections"));
const flight_model_1 = __importDefault(require("../../flights/entities/models/flight.model"));
class AirportModel extends sequelize_1.Model {
    airportId;
    airportCode;
    city;
    country;
    static associate(models) {
        AirportModel.belongsTo(flight_model_1.default, {
            foreignKey: 'departureAirportId',
            as: 'departureAirport',
        });
        AirportModel.belongsTo(flight_model_1.default, {
            foreignKey: 'arrivalAirportId',
            as: 'arrivalAirport',
        });
    }
}
AirportModel.init({
    airportId: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    airportCode: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    city: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    country: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: connections_1.default,
    modelName: 'Airport',
    tableName: 'airports',
    timestamps: false, // Include timestamps (createdAt and updatedAt)
});
exports.default = AirportModel;
