import { IFlightSearchParams } from '../../../utils/common';

const initialState: IFlightSearchParams = {
  departureAirportId: 1,
  arrivalAirportId: 1,
  departureDate: '',
  returnDate: '',
  numberOfPassengers: 1,
};

export default function flightSearchParamsReducer(
  state = initialState,
  action: { type: string; payload?: IFlightSearchParams }
) {
  switch (action.type) {
    case 'UPDATE_FLIGHTS_SEARCH_PARAMS': {
      console.log('payload', action.payload);
      return {
        departureAirport: action.payload?.departureAirportId,
        arrivalAirport: action.payload?.arrivalAirportId,
        departureDate: action.payload?.departureDate,
        returnDate: action.payload?.returnDate,
        numberOfPassengers: action.payload?.numberOfPassengers,
      };
    }
    case 'CLEAR_FLIGHTS_SEARCH_PARAMS':
      return initialState;
    default: {
      return state;
    }
  }
}
