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
  const passengerDetails = useSelector((state: any) => state.passengerDetails);

  const [passengers, setPassengers] = useState<IPassenger[]>(
    passengerDetails.passengers
  );

  const [contactDetails, setContactDetails] = useState(
    passengerDetails.contactDetails
  );

  const [address, setAddress] = useState(
    passengerDetails.contactDetails.address
  );

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

  const handleAddressChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setAddress({
      ...address,
      [name]: value,
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const updatedContactDetails = {
      ...contactDetails,
      address: { ...address },
    };
    dispatch({
      type: 'UPDATE_PASSENGERS_DETAILS',
      payload: {
        passengers: passengers,
        contactDetails: updatedContactDetails,
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
              value={address.country}
              onChange={handleAddressChange}
              className="passenger-info__input"
            />
            <TextField
              fullWidth
              required
              type="text"
              name="street"
              label="Street"
              variant="outlined"
              value={address.street}
              onChange={handleAddressChange}
              className="passenger-info__input"
            />
            <TextField
              fullWidth
              required
              type="text"
              name="city"
              label="City"
              variant="outlined"
              value={address.city}
              onChange={handleAddressChange}
              className="passenger-info__input"
            />
            <TextField
              fullWidth
              required
              type="text"
              name="zip_code"
              label="Zip code"
              variant="outlined"
              value={address.zip_code}
              onChange={handleAddressChange}
              className="passenger-info__input"
            />
          </div>
        </div>
      </div>
      <div className="passenger-info__buttons">
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
