import React, { useState } from 'react';
import './choose-seat.css';
import SeatSelector from '../../ui/seat-selector/seat-selector';
import { IState } from '../../utils/common/state.interface';

import FlightIcon from '@mui/icons-material/Flight';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';

const ChooseSeat = () => {
  const [showReturnSelector, setShowReturnSelector] = useState(false);

  const trip = useSelector((state: IState) => state.trip);

  const numberOfPassengers = trip.numberOfPassengers;

  const dispatch = useDispatch();

  const seats = useSelector((state: any) => state.seats);

  const isStepCompleted = trip.returnFlight
    ? seats.returnFlight.length === numberOfPassengers
    : seats.departureFlight.length === numberOfPassengers;

  const comeBack = () => {
    dispatch({
      type: 'GO_TO_PREVIOUS_STEP',
    });
  };

  const proceedWithTheBooking = () => {
    dispatch({
      type: 'GO_TO_NEXT_STEP',
    });
  };

  const passengerDetails = useSelector((state: any) => state.passengerDetails);

  return (
    <div>
      <h1>Choose the seat for your trip</h1>
      <div className="choose-seat__container">
        <div className="choose-seat__confirmation">
          <div>
            <div className="choose-seat__header">
              <FlightIcon className="choose-seat__icon" />
              <h2 className="choose-seat__flight">
                {' '}
                {trip.departureFlight.departureAirport?.city} [
                {trip.departureFlight.departureAirport?.airportCode}] -{' '}
                {trip.departureFlight.arrivalAirport?.city} [
                {trip.departureFlight.arrivalAirport?.airportCode}]
              </h2>
            </div>
            {passengerDetails.passengers.map((passenger, index) => (
              <h4 key={index} className="choose-seat__details">
                {passenger.nameAndMiddleName} {passenger.surname}:{' '}
                {seats.departureFlight[index]}
              </h4>
            ))}
          </div>
          {trip.returnFlight && (
            <div>
              <div className="choose-seat__header">
                <FlightIcon className="choose-seat__icon" />
                <h2 className="choose-seat__flight">
                  {' '}
                  {trip.returnFlight.departureAirport?.city} [
                  {trip.returnFlight.departureAirport?.airportCode}] -{' '}
                  {trip.returnFlight.arrivalAirport?.city} [
                  {trip.returnFlight.arrivalAirport?.airportCode}]{' '}
                </h2>
              </div>
              {passengerDetails.passengers.map((passenger, index) => (
                <h4 key={index} className="choose-seat__details">
                  {passenger.nameAndMiddleName} {passenger.surname}:{' '}
                  {seats.returnFlight[index]}
                </h4>
              ))}
              <div className="choose-seat__buttons-steps">
                {showReturnSelector ? (
                  <div>
                    <Button
                      onClick={() => setShowReturnSelector(false)}
                      className="choose-seat__button choose-seat__button--previous"
                      variant="contained"
                    >
                      Show previous step
                    </Button>
                  </div>
                ) : (
                  <Button
                    onClick={() => setShowReturnSelector(true)}
                    className="button"
                    variant="contained"
                  >
                    Show next step
                  </Button>
                )}
                {isStepCompleted && (
                  <Button
                    className="choose-seat__button"
                    onClick={proceedWithTheBooking}
                    variant="contained"
                    color="error"
                  >
                    Proceed with the booking
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="choose-seat__seat-map">
          {showReturnSelector && trip.returnFlight ? (
            <SeatSelector
              flightRoute={`${trip.returnFlight.departureAirport?.airportCode} - ${trip.returnFlight.arrivalAirport?.airportCode}`}
              isReturn={true}
              numberOfPassengers={numberOfPassengers}
            />
          ) : (
            <SeatSelector
              flightRoute={`${trip.departureFlight.departureAirport?.airportCode} - ${trip.departureFlight.arrivalAirport?.airportCode}`}
              numberOfPassengers={numberOfPassengers}
            />
          )}
        </div>
      </div>
      <div className="buttons">
        <Button
          onClick={comeBack}
          className="button__back"
          variant="contained"
          color="error"
        >
          {' < '} Back
        </Button>
        <br />
      </div>
    </div>
  );
};
export default ChooseSeat;
