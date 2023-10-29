import { IAirport, IFlight } from '../../flight-search/utils/common';
import { IContactDetails } from './contactDetails.interface';
import { IPassenger } from './passenger.interface';

export interface IState {
  flightSearchParams: {
    departureAirport: IAirport;
    arrivalAirport: IAirport;
    numberOfPassengers: number;
  };
  trip: {
    departureFlight: IFlight;
    returnFlight?: IFlight;
    numberOfPassengers: number;
  };
  steps: {
    currentStep: number;
  };
  passengerDetails: {
    passengers: IPassenger[];
    contactDetails: IContactDetails;
  };
  seats: {
    departureFlight: String[];
    returnFlight: String[];
  };
}
