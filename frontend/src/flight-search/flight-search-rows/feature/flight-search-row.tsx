import React from 'react';

import './flight-search-row.css'
import { IFlight } from '../../utils/common';

interface FlightSearchRowProps {
  flight: IFlight;
}

const FlightSearchRow: React.FC<FlightSearchRowProps> = ({ flight }) => {
  return (
    <tr className="flight-search-row__text">
      <td>{flight.flightNumber}</td>
      <td>{flight.departureTime}</td>
      <td>{flight.arrivalTime}</td>
      <td>${flight.price}</td>
    </tr>
  );
};

export default FlightSearchRow;