import { combineReducers } from 'redux';

import flightSearchReducer from '../flight-search/flight-search-form/domain-logic/state/flight-search-reducer';
import tripReducer from '../new-flight-search/flight-search-table/domain-logic/state/selected-flight-reducer';
import stepsReducer from '../steps/steps-reducer';
import passengerInfoReducer from '../passenger-info/domain-logic/state/passenger-info-reducer';

const rootReducer = combineReducers({
  flightSearchParams: flightSearchReducer,
  trip: tripReducer,
  steps: stepsReducer,
  passengerDetails: passengerInfoReducer,
});

export default rootReducer;
