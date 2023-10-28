import React from 'react';
import './flight-price-button.css';

const FlightPriceButton = ({ flightClass, price }) => {
  return (
    <div className="flight-price-button__container">
      <div className="flight-price__class">
        <p>{flightClass}</p>
      </div>
      <p className="flight-price__total">{price} DKK</p>
    </div>
  );
};

export default FlightPriceButton;
