import { IAirport, IFlight } from '../../../../flight-search/utils/common';

interface ITrip {
  departureFlight?: IFlight;
  returnFlight?: IFlight;
  numberOfPassengers?: number;
}

const initialState: ITrip = {
  departureFlight: undefined,
  returnFlight: undefined,
  numberOfPassengers: 0,
};

export default function tripReducer(
  state = initialState,
  action: {
    type: string;
    payload?: { flight: IFlight; numberOfPassengers: number };
  }
) {
  switch (action.type) {
    case 'UPDATE_TRIP_DEPARTURE_FLIGHT': {
      return {
        departureFlight: action.payload?.flight,
        returnFlight: state.returnFlight,
        numberOfPassengers: action.payload?.numberOfPassengers,
      };
    }
    case 'UPDATE_TRIP_RETURN_FLIGHT': {
      return {
        departureFlight: state.departureFlight,
        returnFlight: action.payload?.flight,
        numberOfPassengers: action.payload?.numberOfPassengers,
      };
    }
    default: {
      return state;
    }
  }
}
