import React from 'react';

import FlightBooking from '../flight-booking/feature/flight-booking';
import { useLocation } from 'react-router-dom';

const FlightBookingPage = () => {

  const location = useLocation();

if (!location.state?.fromApp) {
  console.log('here');
  window.location.replace('/');
}


  return (
    <FlightBooking />
  )
}

export default FlightBookingPage;
