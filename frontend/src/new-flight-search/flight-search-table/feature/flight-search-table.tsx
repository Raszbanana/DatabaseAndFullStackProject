import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import FoundFlight from '../../found-flight/found-flight';

import { IFlight } from '../../../flight-search/utils/common/flight.interface';
import './flight-search-table.css';
import { searchFlights } from '../domain-logic/flight-search-api.service';
import FlightIcon from '@mui/icons-material/Flight';
import DatePicker from '../../../ui/date-picker/date-picker';
import Cart from '../../../ui/cart/cart';

const NewFlightSearchTable: React.FC = () => {
  const [flights, setFlights] = useState<IFlight[]>([]);
  const [selectedDepartureFlight, setSelectedDepartureFlight] =
    useState<IFlight | null>(null);
  const [selectedReturnFlight, setSelectedReturnFlight] =
    useState<IFlight | null>(null);

  // Assuming you want to get the flightSearchParams from the Redux store.
  const flightSearchParams = useSelector(
    (state: any) => state.flightSearchParams
  );

  const dispatch = useDispatch();

  const selectDepartureFlight = (flight: IFlight) => {
    setSelectedDepartureFlight(flight);
    dispatch({
      type: 'UPDATE_TRIP_DEPARTURE_FLIGHT',
      payload: flight,
    });
  };

  const selectReturnFlight = (flight: IFlight) => {
    setSelectedReturnFlight(flight);
    dispatch({
      type: 'UPDATE_TRIP_RETURN_FLIGHT',
      payload: flight,
    });
  };

  useEffect(() => {
    searchFlights(flightSearchParams).then((flights) => {
      setFlights(flights);
    });
  }, [flightSearchParams]);

  return (
    <div className="flight-search">
      <div className="flight-search__table">
        <div className="flight-search__details-header">
          <FlightIcon fontSize="large" className="plane--departure" />
          <h1 className="flight-search__text">
            {flightSearchParams.departureAirport.city} [
            {flightSearchParams.departureAirport.airportCode}] -{' '}
            {flightSearchParams.arrivalAirport.city} [
            {flightSearchParams.arrivalAirport.airportCode}]
          </h1>
        </div>
        <DatePicker date={flightSearchParams.departureDate} />
        {flights.map((flight, index) => (
          <FoundFlight
            onClickEvent={() => selectDepartureFlight(flight)}
            flight={flight}
          />
        ))}

        {flightSearchParams.returnDate && (
          <div>
            <div className="flight-search__details-header">
              <FlightIcon className="plane--return" />
              <h2 className="flight-search__text">
                {flightSearchParams.arrivalAirport.city} [
                {flightSearchParams.arrivalAirport.airportCode}] -{' '}
                {flightSearchParams.departureAirport.city} [
                {flightSearchParams.departureAirport.airportCode}]
              </h2>
            </div>
            <DatePicker date={flightSearchParams.returnDate} />
            {flights.map((flight, index) => (
              <FoundFlight
                onClickEvent={() => selectReturnFlight(flight)}
                key={index}
                flight={flight}
              />
            ))}
          </div>
        )}
      </div>
      <div className="cart">
        <Cart />
      </div>
    </div>
  );
};

export default NewFlightSearchTable;
