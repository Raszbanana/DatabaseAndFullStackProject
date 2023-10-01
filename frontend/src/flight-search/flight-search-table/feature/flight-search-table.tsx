import React from 'react';

import FlightSearchRow from '../../flight-search-rows/feature/flight-search-row'
import { IFlight } from '../../utils/common';
import './flight-search-table.css'

interface FlightSearchResultsProps {
  flights: IFlight[];
}

const FlightSearchTable: React.FC<FlightSearchResultsProps> = ({ flights }) => {
  if (flights.length === 0) {
    return <p>No flights found.</p>;
  }

  return (
    <div>
      <h2>Flight Search Results</h2>
      <table
      cellSpacing="20"
      >
        <thead>
          <tr className="flight-search-table__column-title">
            <th>Flight Number</th>
            <th>Departure Time</th>
            <th>Arrival Time</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {flights.map((flight) => (
            <FlightSearchRow key={flight.id} flight={flight} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FlightSearchTable;
