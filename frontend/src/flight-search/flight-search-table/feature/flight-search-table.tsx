import React, { useState } from 'react';

import FlightSearchRow from '../../flight-search-rows/feature/flight-search-row';
import { IFlight } from '../../utils/common';
import './flight-search-table.css';

interface FlightSearchResultsProps {
  flights: IFlight[];
}

const FlightSearchTable: React.FC<FlightSearchResultsProps> = ({ flights }) => {
  const [selectedFlightId, setSelectedFlightId] = useState<number | null>(null);
  const [flightsToDisplay, setFlightsToDisplay] = useState(10);
  const totalFlights = flights.length;

  if (flights.length === 0) {
    return <p>No flights found.</p>;
  }

  const handleFlightSelect = (flightId: number) => {
    setSelectedFlightId(flightId);
  };

  const handleScroll = (e: any) => {
    const { scrollTop, clientHeight, scrollHeight } = e.target;
    if (scrollTop + clientHeight >= scrollHeight) {
      const newFlightsToDisplay = flightsToDisplay + 10; 
      setFlightsToDisplay(newFlightsToDisplay > totalFlights ? totalFlights : newFlightsToDisplay);
    }
  };

  return (
    <div>
      <h2>Flight Search Results</h2>
      <div 
      className='flight-search-table'
      onScroll={handleScroll}>
        <table cellSpacing='20' cellPadding={30}>
          <thead>
            <tr className='flight-search-table__column-title'>
              <th>Flight Number</th>
              <th>Departure Time</th>
              <th>Arrival Time</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {flights.slice(0, flightsToDisplay).map((flight) => (
              <FlightSearchRow
                key={flight.id}
                flight={flight}
                onSelect={handleFlightSelect}
              />
            ))}
          </tbody>
        </table>
      </div>
      {selectedFlightId && <p>Selected Flight ID: {selectedFlightId}</p>}
    </div>
  );
};

export default FlightSearchTable;
