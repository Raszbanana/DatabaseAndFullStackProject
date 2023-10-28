import React from 'react';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import { IFlight } from '../../flight-search/utils/common/flight.interface';
import FlightPriceButton from '../../ui/flight-price-button/flight-price-button';

import './found-flight.css';
import { Grid } from '@mui/material';

const FoundFlight: React.FC<{ onClickEvent: () => void; flight: IFlight }> = ({
  flight,
  onClickEvent,
}) => {
  return (
    <div className="flight" onClick={onClickEvent}>
      <div className="flight-content">
        <Grid container spacing={3} justifyContent="center" alignItems="center">
          <Grid item xs={12} md={12} lg={12}>
            <div className="flight-destination">
              <p className="flight-airports">
                {flight.departureAirport?.airportCode}
              </p>
              <p className="flight-airports">
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
        </Grid>
      </div>
      <div className="flight-price">
        <FlightPriceButton flightClass={'Economy'} price={flight.price} />
      </div>
    </div>
  );
};

export default FoundFlight;
