import React from 'react';

import './flight-search-row.css'
import { IFlight } from '../../utils/common';
import FlightButton from '../../../ui/button/flight-button';

interface FlightSearchRowProps {
  flight: IFlight;
  onSelect: (flightId: number) => void;
}

const FlightSearchRow: React.FC<FlightSearchRowProps> = ({ flight, onSelect }) => {
  const handleSelect = () => {
    onSelect(flight.id); // Pass the flight id to the onSelect function
  };

  return (
    <tr className="flight-search-row__text">
      <td className="flight-search-row__flight-number-text">{flight.flightNumber}</td>
      <td className="flight-search-row__flight-time-text">{flight.departureTime}</td>
      <td className="flight-search-row__flight-time-text">{flight.arrivalTime}</td>
      <td className="flight-search-row__flight-price-text">${flight.price}</td>
      <td valign="middle">
        <FlightButton onClick={handleSelect}>Select</FlightButton>
      </td>
    </tr>
  );
};

export default FlightSearchRow;