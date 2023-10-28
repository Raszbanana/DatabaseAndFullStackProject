import React, { useState } from 'react';

import { Autocomplete, Grid, TextField } from '@mui/material';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import SwapCallsIcon from '@mui/icons-material/SwapCalls';
import { SelectChangeEvent } from '@mui/material';

import dayjs from 'dayjs';

import { IFlight, IFlightSearchParams } from '../../utils/common';
import FlightButton from '../../../ui/button/flight-button';

import { searchFlights } from '../domain-logic/flight-search-api.service';

import './flight-search-form.css';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

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

  const dispatch = useDispatch();

  const searchParams: IFlightSearchParams = {
    departureAirportCode: departureAirport || '',
    arrivalAirportCode: arrivalAirport || '',
    departureDate: departureDate?.toISOString() || new Date().toISOString(),
    returnDate: isReturnTrip ? returnDate?.toISOString() : '',
    numberOfPassengers,
  };

  const updateFlights = (newFlights: IFlight[]) => {
    setFlights(newFlights);
  };

  const navigate = useNavigate();

  const yesterday = dayjs().subtract(1, 'day').toDate();

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

  const disableDate = (day: Date, dateToDisable: Date) => {
    let check = new Date(dateToDisable).valueOf();
    return day.valueOf() < check ? true : false;
  };

  const handleNumberOfPassengersChange = (event: SelectChangeEvent<number>) => {
    setNumberOfPassengers(event.target.value as number);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const resultFlights = await searchFlights(searchParams);
      updateFlights(resultFlights);
      dispatch({
        type: 'UPDATE_FLIGHTS_SEARCH_PARAMS',
        payload: searchParams,
      });
      navigate('/book-flight', { state: { fromApp: true } });
    } catch (error) {
      console.error(error);
    }
  };

  const errorProps =
    departureDate === null
      ? {
          helperText: 'Input is required',
          error: true,
        }
      : {};

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

  const swapDestinations = () => {
    if (departureAirport && arrivalAirport) {
      const departureAirportValue = departureAirport;
      const arrivalAirportValue = arrivalAirport;

      setDepartureAirport(arrivalAirportValue);
      setArrivalAirport(departureAirportValue);
    }
  };

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
          <Grid
            container
            spacing={3}
            justifyContent="center"
            alignItems="center"
          >
            <Grid item lg={2} md={5} xs={12}>
              <div className="input">
                <Autocomplete
                  disablePortal
                  options={airports}
                  sx={{ minWidth: 180 }}
                  id="departureAirportCode"
                  onChange={(_, value) =>
                    handleAirportChange(value, 'departureAirportCode')
                  }
                  value={
                    airports.find(
                      (option) => option.value === departureAirport
                    ) || null
                  }
                  renderInput={(params) => (
                    <TextField {...params} required label="Departure Airport" />
                  )}
                />
              </div>
            </Grid>
            <Grid item md lg={1}>
              <div className="swapIcon">
                <SwapCallsIcon onClick={swapDestinations} />
              </div>
            </Grid>
            <Grid item lg={2} md={5} xs={12}>
              <div className="input">
                <Autocomplete
                  disablePortal
                  disabled={departureAirport === null}
                  options={arrivalAirportOptions}
                  sx={{ minWidth: 180 }}
                  id="arrivalAirportCode"
                  onChange={(_, value) =>
                    handleAirportChange(value, 'arrivalAirportCode')
                  }
                  value={
                    airports.find(
                      (option) => option.value === arrivalAirport
                    ) || null
                  }
                  renderInput={(params) => (
                    <TextField {...params} required label="Arrival Airport" />
                  )}
                />
              </div>
            </Grid>
            <Grid item lg={2} md={6} xs={12}>
              <div className="input">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDatePicker
                    {...errorProps}
                    format="DD-MM-YYYY"
                    shouldDisableDate={(day) => disableDate(day, yesterday)}
                    className="datePicker"
                    label="Departure Date"
                    value={departureDate}
                    onChange={(selectedDate: Date | null) =>
                      setDepartureDate(selectedDate)
                    }
                  />
                </LocalizationProvider>
              </div>
            </Grid>
            {isReturnTrip && (
              <Grid item lg={2} md={6} xs={12}>
                <div className="input">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                      format="DD-MM-YYYY"
                      shouldDisableDate={(day) =>
                        disableDate(day, departureDate || yesterday)
                      }
                      className="datePicker"
                      label="Return Date"
                      disabled={departureDate === null}
                      value={returnDate}
                      onChange={(selectedDate: Date | null) =>
                        setReturnDate(selectedDate)
                      }
                    />
                  </LocalizationProvider>
                </div>
              </Grid>
            )}

            <Grid item lg md={12} xs={12}>
              <div className="number-of-passengers__input input">
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Number of passengers
                  </InputLabel>
                  <Select
                    required
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
            </Grid>
            <Grid item lg md={12} xs={12}>
              <div className="button">
                <FlightButton type="submit">Search</FlightButton>
              </div>
            </Grid>
          </Grid>
        </form>
      </div>
    </div>
  );
};

export default FlightSearchForm;
