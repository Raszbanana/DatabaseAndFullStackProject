import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import FoundFlight from '../../../ui/found-flight/found-flight';

import { IFlight } from '../../../flight-search/utils/common/flight.interface';
import './flight-search-table.css';
import { searchFlights } from '../domain-logic/flight-search-api.service';
import FlightIcon from '@mui/icons-material/Flight';
import DatePicker from '../../../ui/date-picker/date-picker';
import Cart from '../../../ui/cart/cart';
import { useQuery } from 'react-query';
import LoadingAnimation from '../../../ui/loading-animation/loading-animation';

const FlightSearchTable: React.FC = () => {
  const flightSearchParams = useSelector(
    (state: any) => state.flightSearchParams
  );

  const numberOfPassengers = useSelector(
    (state: any) => state.flightSearchParams.numberOfPassengers
  );

  const dispatch = useDispatch();

  const selectDepartureFlight = (flight: IFlight) => {
    dispatch({
      type: 'UPDATE_TRIP_DEPARTURE_FLIGHT',
      payload: { flight, numberOfPassengers },
    });
  };

  const selectReturnFlight = (flight: IFlight) => {
    dispatch({
      type: 'UPDATE_TRIP_RETURN_FLIGHT',
      payload: { flight, numberOfPassengers },
    });
  };

  const fetchFlights = async () => {
    return await searchFlights(flightSearchParams);
  };

  const { data: flights, error, isLoading } = useQuery('flights', fetchFlights);

  if (isLoading) return <LoadingAnimation />;
  if (error) return <div>An error occurred: {(error as Error).message}</div>;

  const updateFlights = () => {
    console.log('flights!');
  };

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
        <DatePicker
          date={flightSearchParams.departureDate}
          onChangeDateEvent={updateFlights}
        />

        {flights && flights.departureFlights?.length > 0 ? (
          <div>
            {flights?.departureFlights.map((flight, index) => (
              <FoundFlight
                onClickEvent={() => selectDepartureFlight(flight)}
                key={index}
                flight={flight}
                isWithPriceButton={true}
              />
            ))}
          </div>
        ) : (
          <div className="flight-search__empty">
            There were no flights in the selected date
          </div>
        )}

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
            <DatePicker
              date={flightSearchParams.returnDate}
              onChangeDateEvent={updateFlights}
            />
            {flights && flights.returnFlights?.length > 0 ? (
              <div>
                {flights.returnFlights.map((flight, index) => (
                  <FoundFlight
                    onClickEvent={() => selectReturnFlight(flight)}
                    key={index}
                    flight={flight}
                    isWithPriceButton={true}
                  />
                ))}
              </div>
            ) : (
              <div>There were no flights in the selected date</div>
            )}
          </div>
        )}
      </div>
      <div className="cart">
        <Cart />
      </div>
    </div>
  );
};

export default FlightSearchTable;
