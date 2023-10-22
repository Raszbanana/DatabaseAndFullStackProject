import React from 'react';

import './flight-search-row.css'
import { IFlight } from '../../utils/common';

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
      <td>{flight.flightNumber}</td>
      <td>{flight.departureTime}</td>
      <td>{flight.arrivalTime}</td>
      <td>${flight.price}</td>
      <td valign="middle">
        <button className="flight-search-row__button" onClick={handleSelect}>Select</button>
      </td>
    </tr>
  );
};

export default FlightSearchRow;