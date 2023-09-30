import React from 'react';
import { IFlight } from '../../utils/common';

interface FlightSearchResultsProps {
  flights: IFlight[];
}

const FlightSearchResults: React.FC<FlightSearchResultsProps> = ({ flights }) => {
  if (flights.length === 0) {
    return <p>No flights found.</p>;
  }

  return (
    <div>
      <h2>Flight Search Results</h2>
      <table>
        <thead>
          <tr>
            <th>Flight Number</th>
            <th>Departure Time</th>
            <th>Arrival Time</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {flights.map((flight) => (
            <tr key={flight.id}>
              <td>{flight.flightNumber}</td>
              <td>{flight.departureTime}</td>
              <td>{flight.arrivalTime}</td>
              <td>${flight.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FlightSearchResults;
