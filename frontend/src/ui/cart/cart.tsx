import React from 'react';
import './cart.css';
import { useDispatch, useSelector } from 'react-redux';
import FlightIcon from '@mui/icons-material/Flight';
import GroupIcon from '@mui/icons-material/Group';
import Button from '@mui/material/Button';

const Cart: React.FC = () => {
  const dispatch = useDispatch();

  const bookTheTrip = () => {
    dispatch({
      type: 'GO_TO_NEXT_STEP',
    });
  };

  const trip = useSelector((state: any) => state.trip);

  const numberOfPassengers = useSelector(
    (state: any) => state.flightSearchParams.numberOfPassengers
  );

  const departurePrice = trip.departureFlight
    ? trip.departureFlight.price * numberOfPassengers
    : 0;

  const returnPrice = trip.returnFlight
    ? trip.returnFlight.price * numberOfPassengers
    : 0;

  const totalPrice = departurePrice + returnPrice;

  if (!trip.departureFlight) {
    return (
      <div className="cart-item">
        <h3 className="cart-text cart-header">
          Your cart is empty. Select a flight
        </h3>
      </div>
    );
  }

  return (
    <div className="cart-item">
      <h3 className="cart-text cart-header">Trip summary</h3>
      <div className="flight-time cart-flight--departure">
        <div className="departure">
          <FlightIcon className="plane--departure " />{' '}
          <h4 className="cart-section-header">
            {trip.departureFlight.departureTime.split(' ')[0]}
          </h4>
        </div>
        <div className="departure__time">
          <h4 className="cart-section-header">
            {trip.departureFlight.departureTime.split(' ')[1]}
          </h4>
          <h4 className="cart-section-header">
            {trip.departureFlight.departureAirport.city}
          </h4>
          <h4>[{trip.departureFlight.departureAirport.airportCode}]</h4>
        </div>
        <div className="arrival__time">
          <h4 className="cart-section-header">
            {trip.departureFlight.arrivalTime.split(' ')[1]}
          </h4>
          <h4 className="cart-section-header">
            {trip.departureFlight.arrivalAirport.city}
          </h4>
          <h4>[{trip.departureFlight.arrivalAirport.airportCode}]</h4>
        </div>

        <div className="arrival__time">
          <GroupIcon className="icon" />
          <h4 className="cart-section-header">
            {trip.numberOfPassengers} x {trip.departureFlight.price} DKK
          </h4>
          <h4 className="cart-section-header">{departurePrice} DKK</h4>
        </div>
      </div>

      {trip.returnFlight && (
        <div className="flight-time cart-flight--arrival">
          <div className="departure">
            <FlightIcon className="plane--departure " />{' '}
            <h4 className="cart-section-header">
              {trip.returnFlight.departureTime.split(' ')[0]}
            </h4>
          </div>
          <div className="departure__time">
            <h4 className="cart-section-header">
              {trip.returnFlight.departureTime.split(' ')[1]}
            </h4>
            <h4 className="cart-section-header">
              {trip.returnFlight.departureAirport.city}
            </h4>
            <h4>[{trip.returnFlight.departureAirport.airportCode}]</h4>
          </div>
          <div className="arrival__time">
            <h4 className="cart-section-header">
              {trip.returnFlight.arrivalTime.split(' ')[1]}
            </h4>
            <h4 className="cart-section-header">
              {trip.returnFlight.arrivalAirport.city}
            </h4>
            <h4>[{trip.returnFlight.arrivalAirport.airportCode}]</h4>
          </div>
          <div className="arrival__time">
            <GroupIcon className="icon" />
            <h4 className="cart-section-header">
              {trip.numberOfPassengers} x {trip.returnFlight.price} DKK
            </h4>
            <h4 className="cart-section-header">{returnPrice} DKK</h4>
          </div>
        </div>
      )}

      <div className="cart-price">
        <p className="cart-text total-text">Total: {totalPrice} DKK</p>
        <Button
          onClick={bookTheTrip}
          sx={{ width: 1 }}
          variant="contained"
          color="error"
        >
          Book the trip
        </Button>
      </div>
    </div>
  );
};

export default Cart;
