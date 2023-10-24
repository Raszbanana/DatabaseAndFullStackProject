import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import './flight-booking.css'

import { IFlightBooking } from '../utils/common/flight-booking.interface';


const FlightBooking: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [passportNumber, setPassportNumber] = useState('');
  const [nationality, setNationality] = useState('');

  const { id } = useParams();
  const flightId =id;



  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(flightId){    

      const flightBookingData: IFlightBooking = {
      firstName,
      lastName,
      passportNumber,
      nationality,
      flightId: parseInt(flightId)
    };

    alert('Flight booked successfully!');
    console.log(flightBookingData);
    }

  }

  return (
    <div className="flight-booking__container">
      <h2>Flight Booking</h2>
      <form className="flight-booking__form" onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input
          className="flight-booking__input"
            type="text"
            name="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
           className="flight-booking__input"
            type="text"
            name="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div>
          <label>Passport Number:</label>
          <input
           className="flight-booking__input"
            type="text"
            name="passportNumber"
            value={passportNumber}
            onChange={(e) => setPassportNumber(e.target.value)}
          />
        </div>
        <div>
          <label>Nationality:</label>
          <input
           className="flight-booking__input"
            type="text"
            name="nationality"
            value={nationality}
            onChange={(e) => setNationality(e.target.value)}
          />
        </div>
        <button className="flight-booking__button" type="submit">Submit</button>
      </form>
    </div>
  );
};

export default FlightBooking;
