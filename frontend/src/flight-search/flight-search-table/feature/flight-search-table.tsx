import React, { useState } from 'react';

import FlightSearchRow from '../../flight-search-rows/feature/flight-search-row'
import { IFlight } from '../../utils/common';
import './flight-search-table.css'

interface FlightSearchResultsProps {
  flights: IFlight[];
}

const FlightSearchTable: React.FC<FlightSearchResultsProps> = ({ flights }) => {
  const [selectedFlightId, setSelectedFlightId] = useState<number | null>(null);

  if (flights.length === 0) {
    return <p>No flights found.</p>;
  }

  const handleFlightSelect = (flightId: number) => {
    setSelectedFlightId(flightId);
  };

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
            <FlightSearchRow key={flight.id} flight={flight} onSelect={handleFlightSelect} />
          ))}
        </tbody>
      </table>
      {selectedFlightId && <p>Selected Flight ID: {selectedFlightId}</p>}
    </div>
  );
};

export default FlightSearchTable;
