import { IPassenger } from '../../../utils/common/passenger.interface';
interface PassengerInfoState {
  passengers: IPassenger[];
  contactDetails: ContactDetails;
}

interface PassengerInfoAction {
  type: string;
  payload: Partial<PassengerInfoState>;
}

interface ContactDetails {
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    country: string;
    zip_code: string;
  };
}

const initialState: PassengerInfoState = {
  passengers: [],
  contactDetails: {
    email: '',
    phone: '',
    address: {
      street: '',
      city: '',
      country: '',
      zip_code: '',
    },
  },
};

function passengerInfoReducer(
  state: PassengerInfoState = initialState,
  action: PassengerInfoAction
): PassengerInfoState {
  switch (action.type) {
    case 'UPDATE_PASSENGERS_DETAILS': {
      return {
        passengers: action.payload.passengers!,
        contactDetails: action.payload.contactDetails!,
      };
    }
    default:
      return state;
  }
}

export default passengerInfoReducer;
