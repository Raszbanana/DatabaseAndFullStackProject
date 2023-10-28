import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { IFlight } from '../../utils/common';
import './flight-search-table.css';
import { searchFlights } from '../domain-logic/flight-search-api.service';
import DatePicker from '../../../ui/date-picker/date-picker';

const NewFlightSearchTable: React.FC = () => {
  const [selectedFlightId, setSelectedFlightId] = useState<number | null>(null);
  const [flightsToDisplay, setFlightsToDisplay] = useState(10);
  const [flights, setFlights] = useState<IFlight[]>([]);
  const totalFlights = flights.length;

  // Assuming you want to get the flightSearchParams from the Redux store.
  const flightSearchParams = useSelector(
    (state: any) => state.flightSearchParams
  );

  const dispatch = useDispatch(); // Add Redux dispatch

  useEffect(() => {
    searchFlights(flightSearchParams).then((flights) => {
      setFlights(flights);
    });
  }, [flightSearchParams]);

  const handleFlightSelect = (flightId: number) => {
    setSelectedFlightId(flightId);
  };

  const handleDateSelection = (date: Date) => {
    const newFlightSearchParams = {
      ...flightSearchParams,
      departureDate: date.toISOString(),
    };
    dispatch({
      type: 'UPDATE_FLIGHTS_SEARCH_PARAMS',
      payload: newFlightSearchParams,
    });
    searchFlights(newFlightSearchParams).then((flights) => {
      setFlights(flights);
    });
  };

  const handleScroll = (e: any) => {
    const { scrollTop, clientHeight, scrollHeight } = e.target;
    if (scrollTop + clientHeight >= scrollHeight) {
      const newFlightsToDisplay = flightsToDisplay + 10;
      setFlightsToDisplay(
        newFlightsToDisplay > totalFlights ? totalFlights : newFlightsToDisplay
      );
    }
  };

  return (
    <div>
      <h2 className="flight-search-header">Choose departure from Copenhagen</h2>
      <DatePicker />
    </div>
  );
};

export default FlightSearchTable;
