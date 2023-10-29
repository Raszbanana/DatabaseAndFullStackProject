import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Button,
  SelectChangeEvent,
} from '@mui/material';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import dayjs from 'dayjs';

import './passenger-info.css';
import { IPassenger } from '../../utils/common/passenger.interface';

const PassengerInfo: React.FC = () => {
  const [passengers, setPassengers] = useState<IPassenger[]>([]);
  const [contactDetails, setContactDetails] = useState({
    email: '',
    phoneNumber: '',
    country: '',
    street: '',
    city: '',
    zip_code: '',
  });

  const numberOfPassengers = useSelector(
    (state: any) => state.trip.numberOfPassengers
  );

  const yesterday = dayjs().subtract(1, 'day').toDate();

  const dispatch = useDispatch();

  const disableDate = (day: Date, dateToDisable: Date) => {
    let check = new Date(dateToDisable).valueOf();
    return day.valueOf() < check ? true : false;
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const { name, value } = event.target;
    const updatedPassengers = [...passengers];
    updatedPassengers[index] = {
      ...updatedPassengers[index],
      [name]: value,
    };
    setPassengers(updatedPassengers);
  };

  const comeBack = () => {
    dispatch({
      type: 'GO_TO_PREVIOUS_STEP',
    });
  };

  const handleSelectChange = (
    event: SelectChangeEvent<string>,
    index: number
  ) => {
    const { name, value } = event.target;
    const updatedPassengers = [...passengers];
    updatedPassengers[index] = {
      ...updatedPassengers[index],
      [name]: value,
    };
    setPassengers(updatedPassengers);
  };

  const handleExpirationDateChange = (
    date: Date | null | undefined,
    index: number
  ) => {
    if (date) {
      const updatedPassengers = [...passengers];
      updatedPassengers[index] = {
        ...updatedPassengers[index],
        expirationDate: date,
      };
      setPassengers(updatedPassengers);
    }
  };

  const handleContactChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setContactDetails({
      ...contactDetails,
      [name]: value,
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('contactDetails', contactDetails);
    dispatch({
      type: 'UPDATE_PASSENGERS_DETAILS',
      payload: {
        passengers: passengers,
        contactDetails: contactDetails,
      },
    });
    dispatch({
      type: 'GO_TO_NEXT_STEP',
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="passenger-info__container">
        <div className="passenger-info__details">
          <h4 className="passenger-info__header">Enter passengers data</h4>
          <div className="passenger-info__form">
            {Array.from({ length: numberOfPassengers }).map((_, index) => (
              <div key={index}>
                <h5>Passenger {index + 1}</h5>
                <FormControl fullWidth className="passenger-info__input">
                  <InputLabel id={`select-gender-${index}`}>Gender</InputLabel>
                  <Select
                    labelId={`select-gender-${index}`}
                    name="gender"
                    value={passengers[index]?.gender}
                    label="Gender"
                    required
                    onChange={(event) => handleSelectChange(event, index)}
                  >
                    <MenuItem value="Mr">Mr.</MenuItem>
                    <MenuItem value="Mrs">Mrs.</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  fullWidth
                  required
                  name="nameAndMiddleName"
                  label="Name & Middle Name"
                  variant="outlined"
                  value={passengers[index]?.nameAndMiddleName}
                  onChange={(event) => handleChange(event, index)}
                  className="passenger-info__input"
                />
                <TextField
                  fullWidth
                  required
                  name="surname"
                  label="Surname"
                  variant="outlined"
                  value={passengers[index]?.surname}
                  onChange={(event) => handleChange(event, index)}
                  className="passenger-info__input"
                />
                <TextField
                  fullWidth
                  required
                  name="nationality"
                  label="Nationality"
                  variant="outlined"
                  value={passengers[index]?.nationality}
                  onChange={(event) => handleChange(event, index)}
                  className="passenger-info__input"
                />
                <TextField
                  fullWidth
                  required
                  name="passportNumber"
                  label="Passport number"
                  variant="outlined"
                  value={passengers[index]?.passportNumber}
                  onChange={(event) => handleChange(event, index)}
                  className="passenger-info__input"
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDatePicker
                    sx={{ width: 1 }}
                    className="passenger-info__input"
                    format="DD-MM-YYYY"
                    shouldDisableDate={(day) => disableDate(day, yesterday)}
                    label="Expiration Date"
                    value={passengers[index]?.expirationDate}
                    onChange={(event) =>
                      handleExpirationDateChange(event, index)
                    }
                  />
                </LocalizationProvider>
              </div>
            ))}
          </div>
        </div>
        <div className="passenger-info__contact">
          <h4 className="passenger-info__header">Enter contact details</h4>
          <div className="passenger-info__form">
            <h5>General contact details</h5>
            <TextField
              fullWidth
              required
              type="email"
              name="email"
              label="Email"
              variant="outlined"
              value={contactDetails.email}
              onChange={handleContactChange}
              className="passenger-info__input"
            />
            <TextField
              fullWidth
              required
              type="tel"
              name="phoneNumber"
              label="Phone Number"
              variant="outlined"
              value={contactDetails.phoneNumber}
              onChange={handleContactChange}
              className="passenger-info__input"
            />
            <TextField
              fullWidth
              required
              type="text"
              name="country"
              label="Country"
              variant="outlined"
              value={contactDetails.country}
              onChange={handleContactChange}
              className="passenger-info__input"
            />
            <TextField
              fullWidth
              required
              type="text"
              name="street"
              label="Street"
              variant="outlined"
              value={contactDetails.street}
              onChange={handleContactChange}
              className="passenger-info__input"
            />
            <TextField
              fullWidth
              required
              type="text"
              name="city"
              label="City"
              variant="outlined"
              value={contactDetails.city}
              onChange={handleContactChange}
              className="passenger-info__input"
            />
            <TextField
              fullWidth
              required
              type="text"
              name="zip_code"
              label="Zip code"
              variant="outlined"
              value={contactDetails.zip_code}
              onChange={handleContactChange}
              className="passenger-info__input"
            />
          </div>
        </div>
      </div>
      <div className="buttons">
        <Button
          onClick={comeBack}
          className="button__back"
          variant="contained"
          color="error"
        >
          {' < '} Back
        </Button>
        <br />
        <Button
          className="button__continue"
          type="submit"
          variant="contained"
          color="error"
        >
          Continue &gt;
        </Button>
      </div>
    </form>
  );
};

export default PassengerInfo;
