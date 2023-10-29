import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ThankYouHeader from '../../ui/thank-you-header/thank-you-header';

import './itinerary-confirmation.css';
import FoundFlight from '../../ui/found-flight/found-flight';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ItineraryConfirmation = () => {
  const trip = useSelector((state: any) => state.trip);
  const passengerDetails = useSelector((state: any) => state.passengerDetails);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const convertKeyToLabel = (key: string) => {
    return key
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const finishPurchase = () => {
    dispatch({
      type: 'RESET_STEPS',
    });
    navigate('/');
  };

  return (
    <div className="itinerary-confirmation__container">
      <ThankYouHeader />
      <h2 className="itinerary-confirmation__header">
        Your trip to {trip.departureFlight.arrivalAirport.city}
      </h2>

      <h4>Inbound Flight</h4>
      <div className="itinerary-confirmation__details">
        <FoundFlight
          flight={trip.departureFlight}
          passengers={passengerDetails.passengers}
          showFullAirportName={true}
        />
      </div>

      {trip.returnFlight && (
        <div>
          <h4>Return Flight</h4>
          <div className="itinerary-confirmation__details">
            <FoundFlight
              flight={trip.returnFlight}
              passengers={passengerDetails.passengers}
              showFullAirportName={true}
            />
          </div>
        </div>
      )}

      <h4>Contact Details</h4>
      <div className="itinerary-confirmation__details">
        <div className="itinerary-confirmation__contact-details">
          {Object.keys(passengerDetails.contactDetails).map((key) => {
            return (
              <div className="contact-details__container">
                <div className="contact-details__column">
                  <p className="contact-details__text contact-details__text-key">
                    {convertKeyToLabel(key)}
                  </p>
                </div>
                <div className="contact-details__column">
                  <p className="contact-details__text">
                    {passengerDetails.contactDetails[key]}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        <Button
          onClick={finishPurchase}
          className="button"
          variant="contained"
          color="error"
        >
          Come back to the main page
        </Button>
      </div>
    </div>
  );
};

export default ItineraryConfirmation;
