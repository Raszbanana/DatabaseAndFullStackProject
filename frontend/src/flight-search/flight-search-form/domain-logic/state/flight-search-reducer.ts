import { IAirport, IFlightSearchParams } from '../../../utils/common';

const initialState: IFlightSearchParams = {
  departureAirport: {} as IAirport,
  arrivalAirport: {} as IAirport,
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
        departureAirport: action.payload?.departureAirport,
        arrivalAirport: action.payload?.arrivalAirport,
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
