const initialState = {
  departureFlight: [],
  returnFlight: [],
};

export default function seatsReducer(
  state = initialState,
  action: {
    type: string;
    payload?: { seatsNumber: string };
  }
) {
  switch (action.type) {
    case 'ADD_SEAT_FOR_DEPARTURE_FLIGHT':
      console.log(action.payload);
      return {
        ...state,
        departureFlight: [
          ...state.departureFlight,
          action.payload?.seatsNumber,
        ],
      };
    case 'REMOVE_SEAT_FOR_DEPARTURE_FLIGHT':
      return {
        ...state,
        departureFlight: [...state.departureFlight].filter(
          (seat) => seat !== action.payload?.seatsNumber
        ),
      };
    case 'ADD_SEAT_FOR_RETURN_FLIGHT':
      return {
        ...state,
        returnFlight: [...state.returnFlight, action.payload?.seatsNumber],
      };
    case 'REMOVE_SEAT_FOR_RETURN_FLIGHT':
      return {
        ...state,
        returnFlight: [...state.returnFlight].filter(
          (seat) => seat !== action.payload?.seatsNumber
        ),
      };
    case 'CLEAR_SEATS':
      return initialState;
    default:
      return state;
  }
}
