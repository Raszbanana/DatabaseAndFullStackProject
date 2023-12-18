import React, { useEffect, useState } from 'react';

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

import { IAirport, IFlightSearchParams } from '../../utils/common';
import FlightButton from '../../../ui/button/flight-button';

import './flight-search-form.css';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAirports } from '../domain-logic/flight-search-form.api';

interface FlightSearchFormProps {
  isReturnTrip: boolean;
}

const FlightSearchForm: React.FC<FlightSearchFormProps> = ({
  isReturnTrip,
}: FlightSearchFormProps) => {
  const [departureAirport, setDepartureAirport] = useState<IAirport>(
    {} as IAirport
  );
  const [arrivalAirport, setArrivalAirport] = useState<IAirport>(
    {} as IAirport
  );
  const [departureDate, setDepartureDate] = useState<string>('');
  const [returnDate, setReturnDate] = useState<string>('');
  const [numberOfPassengers, setNumberOfPassengers] = useState<number>(1);

  const [airports, setAirports] = useState<IAirport[]>([]);

  const convertAndSetDate = (
    chosenDepartureDate: Date | null,
    isReturn?: boolean
  ) => {
    if (dayjs(chosenDepartureDate).isValid()) {
      const year = dayjs(chosenDepartureDate).format('YYYY');
      const month = dayjs(chosenDepartureDate).format('MM');
      const day = dayjs(chosenDepartureDate).format('DD');

      const formattedDate = `${year}${month}${day}`;
      isReturn ? setReturnDate(formattedDate) : setDepartureDate(formattedDate);
    }
  };

  useEffect(() => {
    getAirports().then((airports) => {
      setAirports(airports);
    });
  }, []);

  const dispatch = useDispatch();

  const searchParams: IFlightSearchParams = {
    departureAirport: departureAirport,
    arrivalAirport: arrivalAirport,
    departureDate: departureDate,
    returnDate: isReturnTrip ? returnDate : undefined,
    numberOfPassengers,
  };

  const navigate = useNavigate();

  const yesterday = dayjs().subtract(1, 'day').toDate();

  const handleAirportChange = (
    value: { label: string; value: IAirport } | null,
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
        setDepartureAirport({} as IAirport);
      } else if (fieldName === 'arrivalAirportCode') {
        setArrivalAirport({} as IAirport);
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

  const handleSubmit = async () => {
    if (arrivalAirport && departureAirport && departureDate) {
      dispatch({
        type: 'UPDATE_FLIGHTS_SEARCH_PARAMS',
        payload: searchParams,
      });
      navigate('/book-flight', { state: { fromApp: true } });
    }
  };

  const errorProps =
    departureDate === null
      ? {
          helperText: 'Input is required',
          error: true,
        }
      : {};

  const airportsLabels = airports.map((airport) => ({
    label: `${airport.city} [${airport.airportCode}]`,
    value: airport,
  }));

  const arrivalAirportOptions = airportsLabels.filter(
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
        <form className="flight-search-form">
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
                  options={airportsLabels}
                  sx={{ minWidth: 180 }}
                  id="departureAirportCode"
                  onChange={(_, value) =>
                    handleAirportChange(value, 'departureAirportCode')
                  }
                  value={
                    airportsLabels.find(
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
                    airportsLabels.find(
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
                    value={dayjs(departureDate).toDate()}
                    onChange={(selectedDate: Date | null) =>
                      convertAndSetDate(selectedDate)
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
                        disableDate(
                          day,
                          dayjs(departureDate).toDate() || yesterday
                        )
                      }
                      className="datePicker"
                      label="Return Date"
                      disabled={departureDate === null}
                      value={dayjs(returnDate).toDate()}
                      onChange={(selectedDate: Date | null) =>
                        convertAndSetDate(selectedDate, true)
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
                <FlightButton onClick={handleSubmit}>Search</FlightButton>
              </div>
            </Grid>
          </Grid>
        </form>
      </div>
    </div>
  );
};

export default FlightSearchForm;
