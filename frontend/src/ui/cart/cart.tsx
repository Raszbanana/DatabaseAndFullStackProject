import React from 'react';
import './cart.css';
import { useSelector } from 'react-redux';
import FlightIcon from '@mui/icons-material/Flight';

const Cart: React.FC = () => {
  const trip = useSelector((state: any) => state.trip);

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
      <div className="flight-time flight-time--departure">
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
      </div>

      {trip.returnFlight && (
        <div className="flight-time flight-time--arrival">
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
              {trip.returnFlight.arrivalTime.split(' ')[1]}
            </h4>
            <h4 className="cart-section-header">
              {trip.returnFlight.arrivalAirport.city}
            </h4>
            <h4>[{trip.returnFlight.arrivalAirport.airportCode}]</h4>
          </div>
        </div>
      )}

      <div className="cart-price">
        <p className="cart-text">Price: {trip.departureFlight.price} DKK</p>
      </div>
    </div>
  );
};

export default Cart;
