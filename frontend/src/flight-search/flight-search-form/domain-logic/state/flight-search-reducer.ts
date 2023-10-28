import { IFlightSearchParams } from '../../../utils/common';

const initialState: IFlightSearchParams = {
  departureAirportCode: '',
  arrivalAirportCode: '',
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
        departureAirportCode: action.payload?.departureAirportCode,
        arrivalAirportCode: action.payload?.arrivalAirportCode,
        departureDate: action.payload?.departureDate,
        returnDate: action.payload?.returnDate,
        numberOfPassengers: action.payload?.numberOfPassengers,
      };
    }
    default: {
      return state;
    }
  }
}
