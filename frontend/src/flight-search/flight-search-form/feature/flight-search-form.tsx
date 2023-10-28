import React, { useState } from 'react';

import { searchFlights } from '../domain-logic/flight-search-api.service';

import { IFlight, IFlightSearchParams } from '../../utils/common';

import FlightSearchTable from '../../flight-search-table/feature/flight-search-table';

import './flight-search-form.css';
import FlightButton from '../../../ui/button/flight-button';

interface FlightSearchFormProps {
  isReturnTrip: boolean;
}

const FlightSearchForm: React.FC<FlightSearchFormProps> = ({
  isReturnTrip,
}: FlightSearchFormProps) => {
  const [searchParams, setSearchParams] = useState<IFlightSearchParams>({
    departureAirportCode: '',
    arrivalAirportCode: '',
    departureDate: '',
    returnDate: '',
    numberOfPassengers: 1,
  });
  // Define state for flights <3
  const [flights, setFlights] = useState<IFlight[]>([]);

  // Define function to change the state uwu
  const updateFlights = (newFlights: IFlight[]) => {
    setFlights(newFlights);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setSearchParams({
      ...searchParams,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const flights = await searchFlights(searchParams);

      updateFlights(flights);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="flight-search-form_container">
        <form className="flight-search-form" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="departureAirportCode">Departure Airport Code</label>
            <input
              type="text"
              id="departureAirportCode"
              name="departureAirportCode"
              value={searchParams.departureAirportCode}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="arrivalAirportCode">Arrival Airport Code</label>
            <input
              type="text"
              id="arrivalAirportCode"
              name="arrivalAirportCode"
              value={searchParams.arrivalAirportCode}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="departureDate">Departure Date</label>
            <input
              type="date"
              id="departureDate"
              name="departureDate"
              value={searchParams.departureDate}
              onChange={handleInputChange}
              required
            />
          </div>
          {isReturnTrip ? (
            <div>
              <label htmlFor="returnDate">Return Date</label>
              <input
                type="date"
                id="returnDate"
                name="returnDate"
                value={searchParams.returnDate}
                onChange={handleInputChange}
              />
            </div>
          ) : null}
          <div>
            <label htmlFor="numberOfPassengers">Number of Passengers</label>
            <input
              type="number"
              id="numberOfPassengers"
              name="numberOfPassengers"
              value={searchParams.numberOfPassengers}
              onChange={handleInputChange}
              min="1"
              max="10"
            />
          </div>
          <FlightButton type="submit">Search</FlightButton>
        </form>
      </div>
    </div>
  );
};

export default FlightSearchForm;
