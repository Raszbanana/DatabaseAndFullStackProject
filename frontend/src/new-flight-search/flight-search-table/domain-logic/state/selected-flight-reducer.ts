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
    payload?: IFlight;
  }
) {
  switch (action.type) {
    case 'UPDATE_TRIP_DEPARTURE_FLIGHT': {
      return {
        departureFlight: action.payload,
        returnFlight: state.returnFlight,
      };
    }
    case 'UPDATE_TRIP_RETURN_FLIGHT': {
      return {
        departureFlight: state.departureFlight,
        returnFlight: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}
