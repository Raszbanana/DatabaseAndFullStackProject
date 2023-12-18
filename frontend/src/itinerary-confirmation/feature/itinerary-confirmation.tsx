import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from 'react-query';
import { postBooking } from '../domain-logic/itinerary-confirmation.api';
import { IFlightBookingParams } from '../../utils/common/flight-booking-params.interface';

import ThankYouHeader from '../../ui/thank-you-header/thank-you-header';

import './itinerary-confirmation.css';
import FoundFlight from '../../ui/found-flight/found-flight';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LoadingAnimation from '../../ui/loading-animation/loading-animation';

const ItineraryConfirmation = () => {
  const trip = useSelector((state: any) => state.trip);
  const passengerDetails = useSelector((state: any) => state.passengerDetails);
  const seats = useSelector((state: any) => state.seats);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const finishPurchase = () => {
    dispatch({
      type: 'RESET_STEPS',
    });
    navigate('/');
  };

  const bookingParams: IFlightBookingParams = {
    firstName: passengerDetails.passengers[0].nameAndMiddleName,
    lastName: passengerDetails.passengers[0].surname,
    passportNumber: passengerDetails.passengers[0].passportNumber,
    nationality: passengerDetails.passengers[0].nationality,
    flightId: trip.departureFlight.id,
  };

  const createBooking = async () => {
    return await postBooking(bookingParams);
  };

  const {
    data: booking,
    error,
    isLoading,
  } = useQuery('booking', createBooking);

  if (isLoading) return <LoadingAnimation />;
  if (error) return <div>An error occurred: {(error as Error).message}</div>;

  return (
    <div>
      {booking && (
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
              seats={seats.departureFlight}
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
                  seats={seats.returnFlight}
                  showFullAirportName={true}
                />
              </div>
            </div>
          )}
          <h4>Contact Details</h4>
          <div className="itinerary-confirmation__details">
            <div className="itinerary-confirmation__contact-details">
              <div className="contact-details__container">
                <div className="contact-details__column">
                  <p className="contact-details__text contact-details__text-key">
                    Email:
                  </p>
                </div>
                <div className="contact-details__column">
                  <p className="contact-details__text">
                    {passengerDetails.contactDetails.email}
                  </p>
                </div>
              </div>
              <div className="contact-details__container">
                <div className="contact-details__column">
                  <p className="contact-details__text contact-details__text-key">
                    Phone:
                  </p>
                </div>
                <div className="contact-details__column">
                  <p className="contact-details__text">
                    {passengerDetails.contactDetails.phone}
                  </p>
                </div>
              </div>
              <div className="contact-details__container">
                <div className="contact-details__column">
                  <p className="contact-details__text contact-details__text-key">
                    Street:
                  </p>
                </div>
                <div className="contact-details__column">
                  <p className="contact-details__text">
                    {passengerDetails.contactDetails.address.street}
                  </p>
                </div>
              </div>
              <div className="contact-details__container">
                <div className="contact-details__column">
                  <p className="contact-details__text contact-details__text-key">
                    City:
                  </p>
                </div>
                <div className="contact-details__column">
                  <p className="contact-details__text">
                    {passengerDetails.contactDetails.address.city}
                  </p>
                </div>
              </div>
              <div className="contact-details__container">
                <div className="contact-details__column">
                  <p className="contact-details__text contact-details__text-key">
                    Country:
                  </p>
                </div>
                <div className="contact-details__column">
                  <p className="contact-details__text">
                    {passengerDetails.contactDetails.address.country}
                  </p>
                </div>
              </div>
              <div className="contact-details__container">
                <div className="contact-details__column">
                  <p className="contact-details__text contact-details__text-key">
                    Zip Code:
                  </p>
                </div>
                <div className="contact-details__column">
                  <p className="contact-details__text">
                    {passengerDetails.contactDetails.address.zip_code}
                  </p>
                </div>
              </div>
            </div>

            <Button
              onClick={finishPurchase}
              className="button itinerary__button"
              variant="contained"
              color="error"
            >
              Come back to the main page
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItineraryConfirmation;
