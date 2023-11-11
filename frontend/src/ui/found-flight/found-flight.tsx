import React from 'react';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import { IFlight } from '../../flight-search/utils/common/flight.interface';
import FlightPriceButton from '../flight-price-button/flight-price-button';

import { IPassenger } from '../../utils/common/passenger.interface';

import './found-flight.css';
import { Grid } from '@mui/material';

const FoundFlight: React.FC<{
  onClickEvent?: () => void;
  flight: IFlight;
  isWithPriceButton?: boolean;
  seats?: string[];
  showFullAirportName?: boolean;
  passengers?: IPassenger[];
}> = ({
  flight,
  onClickEvent,
  isWithPriceButton,
  showFullAirportName,
  seats,
  passengers,
}) => {
  return (
    <div className="flight" onClick={onClickEvent}>
      <div
        className={
          isWithPriceButton ? 'flight-content' : 'flight-content--fullWidth'
        }
      >
        <Grid container spacing={3} justifyContent="center" alignItems="center">
          <Grid item xs={12} md={12} lg={12}>
            <div className="flight-destination">
              <p className="flight-airports">
                {showFullAirportName ? flight.departureAirport?.city : null}{' '}
                {flight.departureAirport?.airportCode}
              </p>
              <p className="flight-airports">
                {showFullAirportName ? flight.arrivalAirport?.city : null}{' '}
                {flight.arrivalAirport?.airportCode}
              </p>
            </div>
          </Grid>
          <Grid item lg={2} md={2} xs={2}>
            <div className="flight-time flight-time--departure">
              <div className="departure">
                <FlightTakeoffIcon className="icon" /> {flight.departureTime}
              </div>
            </div>
          </Grid>
          <Grid item lg md xs>
            <div className="arrow-with-line">
              <div className="line"></div>
              <div className="arrow-head"></div>
            </div>
          </Grid>
          <Grid item lg={2} md={2} xs={2}>
            <div className="flight-time flight-time--arrival">
              <div className="arrival">
                <FlightLandIcon className="icon" /> {flight.arrivalTime}
              </div>
            </div>
          </Grid>
          {passengers && (
            <Grid item xs={12} md={12} lg={12}>
              <div className="flight-passengers">
                <p className="flight-passengers-text">Passengers:</p>
                {passengers.map((passenger, index) => (
                  <div key={index} className="flight-passenger__name">
                    {passenger.gender} {passenger.nameAndMiddleName}{' '}
                    {passenger.surname} {seats && seats[index]}
                  </div>
                ))}
              </div>
            </Grid>
          )}
        </Grid>
      </div>
      {isWithPriceButton && (
        <div className="flight-price">
          <FlightPriceButton flightClass={'Economy'} price={flight.price} />
        </div>
      )}
    </div>
  );
};

export default FoundFlight;
