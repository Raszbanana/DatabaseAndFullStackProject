import React, { useState } from 'react';

import { Autocomplete, TextField } from '@mui/material';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { SelectChangeEvent } from '@mui/material';

import { IFlight, IFlightSearchParams } from '../../utils/common';
import FlightButton from '../../../ui/button/flight-button';

import { searchFlights } from '../domain-logic/flight-search-api.service';

import './flight-search-form.css';

interface FlightSearchFormProps {
  isReturnTrip: boolean;
}

const FlightSearchForm: React.FC<FlightSearchFormProps> = ({
  isReturnTrip,
}: FlightSearchFormProps) => {
  const [departureAirport, setDepartureAirport] = useState<string | null>(null);
  const [arrivalAirport, setArrivalAirport] = useState<string | null>(null);
  const [departureDate, setDepartureDate] = useState<Date | null>(null);
  const [returnDate, setReturnDate] = useState<Date | null>(null);
  const [numberOfPassengers, setNumberOfPassengers] = useState<number>(1);

  const [flights, setFlights] = useState<IFlight[]>([]);

  const searchParams: IFlightSearchParams = {
    departureAirportCode: departureAirport || '',
    arrivalAirportCode: arrivalAirport || '',
    departureDate: departureDate || new Date(),
    returnDate: isReturnTrip ? returnDate || new Date() : undefined,
    numberOfPassengers,
  };

  const updateFlights = (newFlights: IFlight[]) => {
    setFlights(newFlights);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'numberOfPassengers') {
      setNumberOfPassengers(Number(value) || 1);
    }
  };

  const handleAirportChange = (
    value: { label: string; value: string } | null,
    fieldName: string
  ) => {
    if (value) {
      if (fieldName === 'departureAirportCode') {
        setDepartureAirport(value.value);
      } else if (fieldName === 'arrivalAirportCode') {
        setArrivalAirport(value.value);
      }
    } else {
      if (fieldName === 'departureAirportCode') {
        setDepartureAirport(null);
      } else if (fieldName === 'arrivalAirportCode') {
        setArrivalAirport(null);
      }
    }
  };

  const handleNumberOfPassengersChange = (event: SelectChangeEvent<number>) => {
    setNumberOfPassengers(event.target.value as number);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const resultFlights = await searchFlights(searchParams);
      updateFlights(resultFlights);
    } catch (error) {
      console.error(error);
    }
  };

  const airports = [
    { label: 'Copenhagen [CPH]', value: 'CPH' },
    { label: 'Warsaw [WAW]', value: 'WAW' },
    { label: 'Paris [CDG]', value: 'CDG' },
    { label: 'New York [JFK]', value: 'JFK' },
    { label: 'Barcelona [BCN]', value: 'BCN' },
    { label: 'Tokyo [NRT]', value: 'NRT' },
    { label: 'Frankfurt [FRA]', value: 'FRA' },
    { label: 'Munich [MUC]', value: 'MUC' },
    { label: 'Madrid [MAD]', value: 'MAD' },
    { label: 'London  [LHR]', value: 'LHR' },
    { label: 'Lisbon [LIS]', value: 'LIS' },
    { label: 'Porto [OPO]', value: 'OPO' },
  ];

  const arrivalAirportOptions = airports.filter(
    (airport) => airport.value !== departureAirport
  );

  const numberOfPassengersOptions = [];

  for (let i = 1; i <= 10; i++) {
    numberOfPassengersOptions.push(
      <MenuItem key={i} value={i}>
        {i}
      </MenuItem>
    );
  }

  return (
    <div>
      <div className="flight-search-form_container">
        <form className="flight-search-form" onSubmit={handleSubmit}>
          <div className="input">
            <Autocomplete
              disablePortal
              options={airports}
              sx={{ width: 300 }}
              id="departureAirportCode"
              onChange={(_, value) =>
                handleAirportChange(value, 'departureAirportCode')
              }
              value={
                airports.find((option) => option.value === departureAirport) ||
                null
              }
              renderInput={(params) => (
                <TextField {...params} label="Departure Airport" />
              )}
            />
          </div>
          <div className="input">
            <Autocomplete
              disablePortal
              disabled={departureAirport === null}
              options={arrivalAirportOptions}
              sx={{ width: 300 }}
              id="arrivalAirportCode"
              onChange={(_, value) =>
                handleAirportChange(value, 'arrivalAirportCode')
              }
              value={
                airports.find((option) => option.value === arrivalAirport) ||
                null
              }
              renderInput={(params) => (
                <TextField {...params} label="Arrival Airport" />
              )}
            />
          </div>
          <div className="input">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                label="Departure Date"
                value={departureDate}
                onChange={(selectedDate: Date | null) =>
                  setDepartureDate(selectedDate)
                }
              />
            </LocalizationProvider>
          </div>
          {isReturnTrip && (
            <div className="input">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  label="Return Date"
                  value={returnDate}
                  onChange={(selectedDate: Date | null) =>
                    setReturnDate(selectedDate)
                  }
                />
              </LocalizationProvider>
            </div>
          )}
          <div className="number-of-passengers__input input">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Number of passengers
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={numberOfPassengers}
                label="Number of passengers"
                onChange={handleNumberOfPassengersChange}
              >
                {numberOfPassengersOptions}
              </Select>
            </FormControl>
          </div>

          <div className="button">
            <FlightButton type="submit">Search</FlightButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FlightSearchForm;
